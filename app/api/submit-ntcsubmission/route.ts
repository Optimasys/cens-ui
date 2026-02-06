import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { uploadFileToDrive } from '@/lib/google-drive';
import {
  formatDataForSheets,
  triggerSheetsUpdate,
} from '@/lib/google-sheets-webhook';

/**
 * GET /api/submit-ntcsubmission
 * Test endpoint to verify route is working
 */
export async function GET() {
  return NextResponse.json({
    success: true,
    message: 'NTC Submission API is running',
    timestamp: new Date().toISOString(),
    environment: {
      hasSupabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      hasSupabaseKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      hasDriveFolder: !!process.env.GOOGLE_DRIVE_FOLDER_ID,
      hasWebhook: !!process.env.GOOGLE_SHEETS_WEBHOOK_URL_NTC_SUBMISSIONS,
    }
  });
}

/**
 * POST /api/submit-ntcsubmission
 * Handles NTC (National Tender Competition) submission
 */
export async function POST(request: NextRequest) {
  console.log('📝 NTC Submission - POST request received');
  
  try {
    // ✅ Initialize Supabase client INSIDE the function
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.error('Missing Supabase environment variables');
      return NextResponse.json(
        {
          success: false,
          message: 'Server configuration error: Database not configured',
        },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Parse multipart form data
    const formData = await request.formData();

    // Extract data dari form
    const teamName = formData.get('teamName') as string;
    const fullName = formData.get('fullName') as string;
    const nim = formData.get('nim') as string;
    const phoneNumber = formData.get('phoneNumber') as string;
    const lineId = formData.get('lineId') as string;
    const email = formData.get('email') as string;
    const university = formData.get('university') as string;
    const proposalPdf = formData.get('proposalPdf');

    console.log('📦 Received form data:', {
      teamName,
      fullName,
      nim,
      phoneNumber,
      lineId,
      email,
      university,
      hasFile: !!proposalPdf
    });

    // Basic validation - Check required fields
    const missingFields: string[] = [];
    if (!teamName) missingFields.push('teamName');
    if (!fullName) missingFields.push('fullName');
    if (!nim) missingFields.push('nim');
    if (!phoneNumber) missingFields.push('phoneNumber');
    if (!lineId) missingFields.push('lineId');
    if (!email) missingFields.push('email');
    if (!university) missingFields.push('university');

    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: `Missing required fields: ${missingFields.join(', ')}`,
        },
        { status: 400 }
      );
    }

    // Validate proposal PDF
    if (!proposalPdf) {
      return NextResponse.json(
        {
          success: false,
          message: 'Proposal PDF file is required',
        },
        { status: 400 }
      );
    }

    if (!(proposalPdf instanceof File)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid file format. Please upload a valid PDF file.',
        },
        { status: 400 }
      );
    }

    // Validate PDF file type
    if (proposalPdf.type !== 'application/pdf') {
      return NextResponse.json(
        {
          success: false,
          message: `File must be a PDF. Received: ${proposalPdf.type}`,
        },
        { status: 400 }
      );
    }

    // Validate PDF file size
    if (proposalPdf.size > 10 * 1024 * 1024) {
      const fileSizeMB = (proposalPdf.size / (1024 * 1024)).toFixed(2);
      return NextResponse.json(
        {
          success: false,
          message: `File size (${fileSizeMB}MB) exceeds maximum limit of 10MB`,
        },
        { status: 400 }
      );
    }

    console.log('✅ Validation passed');
    console.log('📄 File info:', {
      name: proposalPdf.name,
      type: proposalPdf.type,
      size: `${(proposalPdf.size / 1024).toFixed(2)} KB`
    });

    // Check Google Drive configuration
    if (!process.env.GOOGLE_DRIVE_FOLDER_ID) {
      console.error('Google Drive folder ID not configured');
      return NextResponse.json(
        {
          success: false,
          message: 'Server configuration error: File storage not configured',
        },
        { status: 500 }
      );
    }

    // Convert File to buffer for upload
    console.log('🔄 Converting file to buffer...');
    const arrayBuffer = await proposalPdf.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload proposal PDF to Google Drive
    console.log('☁️ Uploading to Google Drive...');
    let driveResponse;
    try {
      driveResponse = await uploadFileToDrive(
        buffer,
        `ntc-proposal-${teamName.replace(/\s+/g, '-')}-${Date.now()}.pdf`,
        'application/pdf',
        process.env.GOOGLE_DRIVE_FOLDER_ID
      );
      console.log('✅ File uploaded to Google Drive');
      console.log('📎 File ID:', driveResponse.id);
      console.log('🔗 View Link:', driveResponse.webViewLink);
    } catch (error) {
      console.error('❌ Google Drive upload error:', error);
      return NextResponse.json(
        {
          success: false,
          message: 'Failed to upload proposal PDF. Please try again.',
          error: error instanceof Error ? error.message : 'Unknown error'
        },
        { status: 500 }
      );
    }

    // Save submission to Supabase
    console.log('💾 Saving to database...');
    const { data: submissionData, error: dbError } = await supabase
      .from('ntc_submission')
      .insert({
        team_name: teamName,
        full_name: fullName,
        nim: nim,
        phone_number: phoneNumber,
        line_id: lineId,
        email: email,
        university: university,
        file_id: driveResponse.id,
        file_url: driveResponse.webViewLink,
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (dbError) {
      console.error('❌ Database error:', dbError);
      return NextResponse.json(
        {
          success: false,
          message: `Database error: ${dbError.message}`,
          details: dbError.hint || dbError.details
        },
        { status: 500 }
      );
    }

    console.log('✅ Data saved to database');
    console.log('🆔 Submission ID:', submissionData?.id);

    // Trigger Google Sheets webhook (optional)
    if (process.env.GOOGLE_SHEETS_WEBHOOK_URL_NTC_SUBMISSIONS) {
      console.log('📊 Triggering Google Sheets update...');
      try {
        const sheetsPayload = formatDataForSheets('ntc-submission', {
          teamName,
          fullName,
          nim,
          phoneNumber,
          lineId,
          email,
          university,
          fileUrl: driveResponse.webViewLink,
        });

        const sheetsResult = await triggerSheetsUpdate(
          process.env.GOOGLE_SHEETS_WEBHOOK_URL_NTC_SUBMISSIONS,
          sheetsPayload
        );

        if (sheetsResult.success) {
          console.log('✅ Google Sheets updated successfully');
        } else {
          console.warn('⚠️ Google Sheets update failed:', sheetsResult.message);
        }
      } catch (error) {
        console.warn('⚠️ Google Sheets webhook error (non-critical):', error);
      }
    }

    console.log('🎉 NTC submission completed successfully');

    return NextResponse.json(
      {
        success: true,
        message: 'NTC submission successful',
        data: {
          id: submissionData?.id,
          teamName: submissionData?.team_name,
          submittedAt: submissionData?.created_at
        }
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('❌ NTC submission error:', error);
    
    // Detailed error logging
    if (error instanceof Error) {
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }

    return NextResponse.json(
      {
        success: false,
        message: 'An unexpected error occurred while processing your submission',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}