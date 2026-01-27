/**
 * POST /api/submit-competition
 *
 * Handles competition form submissions with multi-step form:
 * 1. Parse multipart form data (team info + 3 students + 3 files)
 * 2. Validate form data with Zod
 * 3. Upload PDFs to Google Drive
 * 4. Save submission to Supabase
 * 5. Trigger Google Sheets webhook
 */

import { NextRequest, NextResponse } from 'next/server';
import { fileToBuffer, generateUniqueFileName } from '@/lib/file-utils';
import { competitionFormSchema } from '@/lib/validations';
import { insertCompetitionSubmission } from '@/lib/supabase';
import { uploadFileToDrive } from '@/lib/google-drive';
import { triggerSheetsUpdate, formatDataForSheets } from '@/lib/google-sheets-webhook';
import { getErrorMessage, getErrorStatusCode } from '@/lib/errors';

interface StudentData {
  fullName: string;
  nim: string;
  phoneNumber: string;
  lineId: string;
  email: string;
  university: string;
  major: string;
}

export async function POST(request: NextRequest) {
  try {
    // Parse multipart form data
    const formData = await request.formData();

    // Extract files
    const studentIdsScanFile = formData.get('studentIdsScan') as File | null;
    const paymentProofFile = formData.get('paymentProof') as File | null;
    const twibbonProofFile = formData.get('twibbonProof') as File | null;

    if (!studentIdsScanFile || !paymentProofFile || !twibbonProofFile) {
      return NextResponse.json(
        { success: false, message: 'All three PDF files are required' },
        { status: 400 }
      );
    }

    // Helper function to get nested form data
    const getNestedFormData = (prefix: string): StudentData => ({
      fullName: formData.get(`${prefix}.fullName`) as string,
      nim: formData.get(`${prefix}.nim`) as string,
      phoneNumber: formData.get(`${prefix}.phoneNumber`) as string,
      lineId: formData.get(`${prefix}.lineId`) as string,
      email: formData.get(`${prefix}.email`) as string,
      university: formData.get(`${prefix}.university`) as string,
      major: formData.get(`${prefix}.major`) as string,
    });

    // Extract form fields
    const data = {
      teamName: formData.get('teamName') as string,
      competitionType: formData.get('competitionType') as string,
      teamLeader: getNestedFormData('teamLeader'),
      student2: getNestedFormData('student2'),
      student3: getNestedFormData('student3'),
      studentIdsScan: studentIdsScanFile,
      paymentProof: paymentProofFile,
      twibbonProof: twibbonProofFile,
    };

    // Validate form data with Zod
    const validationResult = competitionFormSchema.safeParse(data);
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

    // Upload files to Google Drive
    const fileUploadPromises = [
      uploadFileToDrive(
        await fileToBuffer(validData.studentIdsScan),
        generateUniqueFileName(validData.studentIdsScan.name, 'student-ids'),
        validData.studentIdsScan.type,
        folderId
      ),
      uploadFileToDrive(
        await fileToBuffer(validData.paymentProof),
        generateUniqueFileName(validData.paymentProof.name, 'payment-proof'),
        validData.paymentProof.type,
        folderId
      ),
      uploadFileToDrive(
        await fileToBuffer(validData.twibbonProof),
        generateUniqueFileName(validData.twibbonProof.name, 'twibbon-proof'),
        validData.twibbonProof.type,
        folderId
      ),
    ];

    let driveResponses;
    try {
      driveResponses = await Promise.all(fileUploadPromises);
    } catch (error) {
      console.error('Google Drive upload error:', error);
      return NextResponse.json(
        {
          success: false,
          message: 'Failed to upload files to Google Drive',
        },
        { status: 500 }
      );
    }

    // Save submission to Supabase
    const supabaseResult = await insertCompetitionSubmission({
      teamName: validData.teamName,
      competitionType: validData.competitionType,
      teamLeader: validData.teamLeader,
      student2: validData.student2,
      student3: validData.student3,
      fileIds: {
        studentIdsScan: driveResponses[0].id,
        paymentProof: driveResponses[1].id,
        twibbonProof: driveResponses[2].id,
      },
      fileUrls: {
        studentIdsScan: driveResponses[0].webViewLink,
        paymentProof: driveResponses[1].webViewLink,
        twibbonProof: driveResponses[2].webViewLink,
      },
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
    const sheetsWebhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
    if (sheetsWebhookUrl) {
      const sheetsData = formatDataForSheets('competition', {
        teamName: validData.teamName,
        competitionType: validData.competitionType,

        teamLeader: validData.teamLeader,
        student2: validData.student2,
        student3: validData.student3,

        fileUrls: {
          studentIdsScan: driveResponses[0].webViewLink,
          paymentProof: driveResponses[1].webViewLink,
          twibbonProof: driveResponses[2].webViewLink,
        },
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
        message: 'Competition submission received successfully',
        data: {
          submissionId: supabaseResult.data?.id,
          fileIds: {
            studentIdsScan: driveResponses[0].id,
            paymentProof: driveResponses[1].id,
            twibbonProof: driveResponses[2].id,
          },
          fileUrls: {
            studentIdsScan: driveResponses[0].webViewLink,
            paymentProof: driveResponses[1].webViewLink,
            twibbonProof: driveResponses[2].webViewLink,
          },
          sheetsUpdated,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    const message = getErrorMessage(error);
    const statusCode = getErrorStatusCode(error);

    console.error('Submit competition error:', message);

    return NextResponse.json(
      {
        success: false,
        message: 'An error occurred while processing your submission',
        error: message,
      },
      { status: statusCode }
    );
  }
}