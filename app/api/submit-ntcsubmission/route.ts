import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import {
  formatDataForSheets,
  triggerSheetsUpdate,
} from '@/lib/google-sheets-webhook';

export const runtime = 'nodejs';

export async function GET() {
  return NextResponse.json({
    success: true,
    message: 'NTC Submission API is running',
  });
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    // Terima JSON bukan FormData
    const body = await request.json();

    const {
      teamName,
      fullName,
      nim,
      phoneNumber,
      lineId,
      email,
      university,
      proposalFileId,
      proposalFileUrl,
      boqFileId,
      boqFileUrl,
    } = body;

    // Validation
    const missing: string[] = [];
    if (!teamName) missing.push('teamName');
    if (!fullName) missing.push('fullName');
    if (!nim) missing.push('nim');
    if (!phoneNumber) missing.push('phoneNumber');
    if (!lineId) missing.push('lineId');
    if (!email) missing.push('email');
    if (!university) missing.push('university');
    if (!proposalFileId) missing.push('proposalFileId');
    if (!boqFileId) missing.push('boqFileId');

    if (missing.length) {
      return NextResponse.json(
        { success: false, message: `Missing: ${missing.join(', ')}` },
        { status: 400 }
      );
    }

    // Save to Supabase
    const { data, error } = await supabase
      .from('ntc_submission')
      .insert({
        team_name: teamName,
        full_name: fullName,
        nim,
        phone_number: phoneNumber,
        line_id: lineId,
        email,
        university,
        proposal_file_id: proposalFileId,
        proposal_file_url: proposalFileUrl,
        boq_file_id: boqFileId,
        boq_file_url: boqFileUrl,
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { success: false, message: `Database error: ${error.message}` },
        { status: 500 }
      );
    }

    // Google Sheets
    if (process.env.GOOGLE_SHEETS_WEBHOOK_URL_NTC_SUBMISSIONS) {
      try {
        const payload = formatDataForSheets('ntc-submission', {
          teamName,
          fullName,
          nim,
          phoneNumber,
          lineId,
          email,
          university,
          proposalPdfUrl: proposalFileUrl,
          boqFileUrl,
        });

        await triggerSheetsUpdate(
          process.env.GOOGLE_SHEETS_WEBHOOK_URL_NTC_SUBMISSIONS,
          payload
        );
      } catch (sheetsError) {
        console.error('Google Sheets update error:', sheetsError);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'NTC submission successful',
      data: {
        id: data.id,
        submittedAt: data.created_at,
        proposalFileUrl,
        boqFileUrl,
      },
    });

  } catch (err) {
    console.error('NTC submission error:', err);
    return NextResponse.json(
      {
        success: false,
        message: 'Unexpected error occurred',
        error: err instanceof Error ? err.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}