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
// app/api/submit-iecsubmission/route.ts

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    // Terima JSON bukan FormData
    const body = await request.json();

    const { teamName, fullName, nim, phoneNumber, lineId,
            email, university, subtheme, fileId, fileUrl, fileName } = body;

    // Validation
    const missing: string[] = [];
    if (!teamName) missing.push('teamName');
    if (!fullName) missing.push('fullName');
    if (!nim) missing.push('nim');
    if (!phoneNumber) missing.push('phoneNumber');
    if (!lineId) missing.push('lineId');
    if (!email) missing.push('email');
    if (!university) missing.push('university');
    if (!subtheme) missing.push('subtheme');
    if (!fileId) missing.push('fileId');

    if (missing.length) {
      return NextResponse.json(
        { success: false, message: `Missing: ${missing.join(', ')}` },
        { status: 400 }
      );
    }

    // Save to Supabase (file sudah di Drive, tinggal simpan metadata)
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
        file_id: fileId,
        file_url: fileUrl,
      })
      .select()
      .single();

    if (error) throw error;

    // Google Sheets
    if (process.env.GOOGLE_SHEETS_WEBHOOK_URL_IEC_SUBMISSIONS) {
      const payload = formatDataForSheets('iec-submission', {
        teamName, fullName, nim, phoneNumber, lineId,
        email, university, subtheme, fileUrl,
      });
      await triggerSheetsUpdate(
        process.env.GOOGLE_SHEETS_WEBHOOK_URL_IEC_SUBMISSIONS,
        payload
      );
    }

    return NextResponse.json({
      success: true,
      message: 'IEC submission successful',
      data: { id: data.id, submittedAt: data.created_at },
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