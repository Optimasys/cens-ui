/**
 * POST /api/submit-ntcsubmission
 *
 * Handles NTC (National Tender Competition) form submissions:
 * 1. Parse multipart form data (team info + team leader + 1 PDF)
 * 2. Validate form data with Zod
 * 3. Upload PDF to Google Drive
 * 4. Save submission to Supabase
 * 5. Trigger Google Sheets webhook
 */

import { NextRequest, NextResponse } from 'next/server';
import { fileToBuffer, generateUniqueFileName } from '@/lib/file-utils';
import { ntcSubmissionFormSchema } from '@/lib/validations';
import { insertIecSubmission } from '@/lib/supabase';
import { uploadFileToDrive } from '@/lib/google-drive';
import { triggerSheetsUpdate, formatDataForSheets } from '@/lib/google-sheets-webhook';
import { getErrorMessage, getErrorStatusCode } from '@/lib/errors';

export async function POST(request: NextRequest) {
  try {
    // Parse multipart form data
    const formData = await request.formData();

    // Extract file
    const proposalFile = formData.get('proposalPdf') as File | null;

    if (!proposalFile) {
      return NextResponse.json(
        { success: false, message: 'Proposal Document PDF file is required' },
        { status: 400 }
      );
    }

    // Extract form fields
    const data = {
      teamName: formData.get('teamName') as string,
      fullName: formData.get('fullName') as string,
      nim: formData.get('nim') as string,
      phoneNumber: formData.get('phoneNumber') as string,
      lineId: formData.get('lineId') as string,
      email: formData.get('email') as string,
      university: formData.get('university') as string,
      subtheme: formData.get('subtheme') as string,
      proposalPdf: proposalFile,
    };

    // Validate form data with Zod
    const validationResult = ntcSubmissionFormSchema.safeParse(data);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: 'Validation failed',
          errors: validationResult.error.flatten(),
        },
        { status: 400 }
      );
    }

    const validData = validationResult.data;

    // Get folder ID from environment
    const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;
    if (!folderId) {
      console.error('GOOGLE_DRIVE_FOLDER_ID environment variable is not set');
      return NextResponse.json(
        {
          success: false,
          message: 'Server configuration error: Google Drive folder not configured',
        },
        { status: 500 }
      );
    }

    // Upload proposal document PDF to Google Drive
    let driveResponse;
    try {
      driveResponse = await uploadFileToDrive(
        await fileToBuffer(validData.proposalPdf),
        generateUniqueFileName(validData.proposalPdf.name, `ntc-proposal-${validData.teamName}`),
        validData.proposalPdf.type,
        folderId
      );
    } catch (error) {
      console.error('Google Drive upload error:', error);
      return NextResponse.json(
        {
          success: false,
          message: 'Failed to upload proposal document PDF to Google Drive',
        },
        { status: 500 }
      );
    }

    // Save submission to Supabase
    const supabaseResult = await insertIecSubmission({
      teamName: validData.teamName,
      fullName: validData.fullName,
      nim: validData.nim,
      phoneNumber: validData.phoneNumber,
      lineId: validData.lineId,
      email: validData.email,
      university: validData.university,
      subtheme: validData.subtheme,
      fileId: driveResponse.id,
      fileUrl: driveResponse.webViewLink,
    });

    if (!supabaseResult.success) {
      console.error('Supabase error:', supabaseResult.error);
      return NextResponse.json(
        {
          success: false,
          message: 'Failed to save submission to database',
        },
        { status: 500 }
      );
    }

    // Trigger Google Sheets webhook (non-blocking - don't fail if it fails)
    let sheetsUpdated = false;
    const sheetsWebhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL_NTC_SUBMISSIONS;
    if (sheetsWebhookUrl) {
      const sheetsData = formatDataForSheets('ntc-submission', {
        teamName: validData.teamName,
        fullName: validData.fullName,
        nim: validData.nim,
        phoneNumber: validData.phoneNumber,
        lineId: validData.lineId,
        email: validData.email,
        university: validData.university,
        subtheme: validData.subtheme,
        fileUrl: driveResponse.webViewLink,
      });

      const sheetsResult = await triggerSheetsUpdate(sheetsWebhookUrl, sheetsData);
      sheetsUpdated = sheetsResult.success;

      if (!sheetsUpdated) {
        console.warn('Sheets webhook warning:', sheetsResult.message);
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: 'NTC submission received successfully',
        data: {
          submissionId: supabaseResult.data?.id,
          fileId: driveResponse.id,
          fileUrl: driveResponse.webViewLink,
          sheetsUpdated,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    const message = getErrorMessage(error);
    const statusCode = getErrorStatusCode(error);

    console.error('Submit NTC submission error:', message);

    return NextResponse.json(
      {
        success: false,
        message: 'An error occurred while processing your NTC submission',
        error: message,
      },
      { status: statusCode }
    );
  }
}