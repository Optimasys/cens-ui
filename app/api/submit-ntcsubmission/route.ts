import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { uploadFileToDrive } from '@/lib/google-drive';
import {
  formatDataForSheets,
  triggerSheetsUpdate,
} from '@/lib/google-sheets-webhook';

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

    const formData = await request.formData();

    // =========================
    // TEXT FIELDS
    // =========================
    const teamName = formData.get('teamName') as string;
    const fullName = formData.get('fullName') as string;
    const nim = formData.get('nim') as string;
    const phoneNumber = formData.get('phoneNumber') as string;
    const lineId = formData.get('lineId') as string;
    const email = formData.get('email') as string;
    const university = formData.get('university') as string;

    // =========================
    // FILES
    // =========================
    const proposalPdf = formData.get('proposalPdf');
    const boqFile = formData.get('boqFile');

    // =========================
    // BASIC VALIDATION
    // =========================
    if (!teamName || !fullName || !nim || !phoneNumber || !lineId || !email || !university) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // =========================
    // PDF VALIDATION
    // =========================
    if (!proposalPdf || !(proposalPdf instanceof File)) {
      return NextResponse.json(
        { success: false, message: 'Proposal PDF is required' },
        { status: 400 }
      );
    }

    if (proposalPdf.type !== 'application/pdf') {
      return NextResponse.json(
        { success: false, message: 'Proposal file must be PDF' },
        { status: 400 }
      );
    }

    // =========================
    // BOQ EXCEL VALIDATION
    // =========================
    if (!boqFile || !(boqFile instanceof File)) {
      return NextResponse.json(
        { success: false, message: 'BOQ Excel file is required' },
        { status: 400 }
      );
    }

    const excelMime = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

    if (boqFile.type !== excelMime) {
      return NextResponse.json(
        { success: false, message: 'BOQ file must be .xlsx format' },
        { status: 400 }
      );
    }

    // =========================
    // CONVERT TO BUFFER
    // =========================
    const pdfBuffer = Buffer.from(await proposalPdf.arrayBuffer());
    const boqBuffer = Buffer.from(await boqFile.arrayBuffer());

    // =========================
    // UPLOAD PDF TO DRIVE
    // =========================
    const pdfUpload = await uploadFileToDrive(
      pdfBuffer,
      `${teamName}_NTC_Proposal_${Date.now()}.pdf`,
      'application/pdf',
      process.env.GOOGLE_DRIVE_FOLDER_ID!
    );

    // =========================
    // UPLOAD BOQ EXCEL TO DRIVE
    // =========================
    const boqUpload = await uploadFileToDrive(
      boqBuffer,
      `${teamName}_NTC_BOQ_${Date.now()}.xlsx`,
      excelMime,
      process.env.GOOGLE_DRIVE_FOLDER_ID!
    );

    // =========================
    // SAVE TO DATABASE
    // =========================
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

        // PDF
        proposal_file_id: pdfUpload.id,
        proposal_file_url: pdfUpload.webViewLink,

        // BOQ EXCEL
        boq_file_id: boqUpload.id,
        boq_file_url: boqUpload.webViewLink,

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

    // =========================
    // UPDATE GOOGLE SHEETS
    // =========================
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
          proposalPdfUrl: pdfUpload.webViewLink,
          boqFileUrl: boqUpload.webViewLink,
        });

        await triggerSheetsUpdate(
          process.env.GOOGLE_SHEETS_WEBHOOK_URL_NTC_SUBMISSIONS,
          payload
        );
      } catch (sheetsError) {
        // Log error but don't fail the request
        console.error('Google Sheets update error:', sheetsError);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'NTC submission successful',
      data: { 
        id: data.id,
        proposalPdfUrl: pdfUpload.webViewLink,
        boqFileUrl: boqUpload.webViewLink,
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