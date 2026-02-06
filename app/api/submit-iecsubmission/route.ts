import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { uploadFileToDrive } from '@/lib/google-drive';
import {
  formatDataForSheets,
  triggerSheetsUpdate,
} from '@/lib/google-sheets-webhook';

/**
 * GET /api/submit-iecsubmission
 */
export async function GET() {
  return NextResponse.json({
    success: true,
    message: 'IEC Submission API is running',
  });
}

/**
 * POST /api/submit-iecsubmission
 */
export async function POST(request: NextRequest) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const formData = await request.formData();

    // ===== Extract fields (NULL SAFE) =====
    const teamName = String(formData.get('teamName') || '');
    const fullName = String(formData.get('fullName') || '');
    const nim = String(formData.get('nim') || '');
    const phoneNumber = String(formData.get('phoneNumber') || '');
    const lineId = String(formData.get('lineId') || '');
    const email = String(formData.get('email') || '');
    const university = String(formData.get('university') || '');
    const subtheme = String(formData.get('subtheme') || '');
    const essayPDF = formData.get('essayPDF');

    // ===== Validation =====
    const missing: string[] = [];

    if (!teamName) missing.push('teamName');
    if (!fullName) missing.push('fullName');
    if (!nim) missing.push('nim');
    if (!phoneNumber) missing.push('phoneNumber');
    if (!lineId) missing.push('lineId');
    if (!email) missing.push('email');
    if (!university) missing.push('university');
    if (!subtheme) missing.push('subtheme');

    if (missing.length) {
      return NextResponse.json(
        { success: false, message: `Missing: ${missing.join(', ')}` },
        { status: 400 }
      );
    }

    if (!essayPDF || !(essayPDF instanceof File)) {
      return NextResponse.json(
        { success: false, message: 'Essay PDF required' },
        { status: 400 }
      );
    }

    if (essayPDF.type !== 'application/pdf') {
      return NextResponse.json(
        { success: false, message: 'File must be PDF' },
        { status: 400 }
      );
    }

    if (essayPDF.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, message: 'Max file size 10MB' },
        { status: 400 }
      );
    }

    // ===== Upload to Drive =====
    const buffer = Buffer.from(await essayPDF.arrayBuffer());

    const driveResponse = await uploadFileToDrive(
      buffer,
      `iec-${teamName}-${Date.now()}.pdf`,
      'application/pdf',
      process.env.GOOGLE_DRIVE_FOLDER_ID!
    );

    // ===== Save to Supabase =====
    const { data, error } = await supabase
      .from('iec_submission')
      .insert({
        team_name: teamName,
        full_name: fullName,
        nim,
        phone_number: phoneNumber,
        line_id: lineId,
        email,
        university,
        subtheme,
        file_id: driveResponse.id,
        file_url: driveResponse.webViewLink,
      })
      .select()
      .single();

    if (error) throw error;

    // ===== Google Sheets =====
    if (process.env.GOOGLE_SHEETS_WEBHOOK_URL_IEC_SUBMISSIONS) {
      const payload = formatDataForSheets('iec-submission', {
        teamName,
        fullName,
        nim,
        phoneNumber,
        lineId,
        email,
        university,
        subtheme,
        fileUrl: driveResponse.webViewLink,
      });

      await triggerSheetsUpdate(
        process.env.GOOGLE_SHEETS_WEBHOOK_URL_IEC_SUBMISSIONS,
        payload
      );
    }

    return NextResponse.json({
      success: true,
      message: 'IEC submission successful',
      data: {
        id: data.id,
        submittedAt: data.created_at,
      },
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: 'Submission failed',
        error: error instanceof Error ? error.message : 'Unknown',
      },
      { status: 500 }
    );
  }
}
