/**
 * POST /api/submit-event
 *
 * Handles event form submissions:
 * 1. Parse multipart form data
 * 2. Validate form data with Zod
 * 3. Upload PDF to Google Drive (if provided)
 * 4. Save submission to Supabase
 * 5. Trigger Google Sheets webhook
 */

import { NextRequest, NextResponse } from 'next/server';
import { fileToBuffer, generateUniqueFileName } from '@/lib/file-utils';
import { eventFormSchema } from '@/lib/validations';
import { insertEventSubmission } from '@/lib/supabase';
import { uploadFileToDrive } from '@/lib/google-drive';
import { triggerSheetsUpdate, formatDataForSheets } from '@/lib/google-sheets-webhook';
import { getErrorMessage, getErrorStatusCode } from '@/lib/errors';

export async function POST(request: NextRequest) {
  try {
    // Parse multipart form data
    const formData = await request.formData();
    const pdfFile = formData.get('pdfFile') as File | null;

    // Extract form fields
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      institution: formData.get('institution') as string,
      eventType: formData.get('eventType') as string,
      specialRequirements: formData.get('specialRequirements') as string | undefined,
      pdfFile: pdfFile || undefined,
    };

    // Validate form data with Zod
    const validationResult = eventFormSchema.safeParse(data);
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

    // Upload PDF to Google Drive if provided
    let driveFileId = null;
    let driveFileUrl = null;

    if (validData.pdfFile) {
      try {
        const fileBuffer = await fileToBuffer(validData.pdfFile);
        const fileName = generateUniqueFileName(validData.pdfFile.name, validData.eventType);

        const driveResponse = await uploadFileToDrive(
          fileBuffer,
          fileName,
          validData.pdfFile.type
        );

        driveFileId = driveResponse.id;
        driveFileUrl = driveResponse.webViewLink;
      } catch (error) {
        console.error('Google Drive upload error:', error);
        return NextResponse.json(
          {
            success: false,
            message: 'Failed to upload file to Google Drive',
          },
          { status: 500 }
        );
      }
    }

    // Save submission to Supabase
    const supabaseResult = await insertEventSubmission({
      name: validData.name,
      email: validData.email,
      phone: validData.phone,
      institution: validData.institution,
      eventType: validData.eventType,
      specialRequirements: validData.specialRequirements,
      driveFileId: driveFileId || undefined,
      driveFileUrl: driveFileUrl || undefined,
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
      const sheetsData = formatDataForSheets('event', {
        ...validData,
        driveFileUrl: driveFileUrl || null,
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
        message: 'Event registration received successfully',
        data: {
          submissionId: supabaseResult.data?.id,
          fileId: driveFileId,
          fileUrl: driveFileUrl,
          sheetsUpdated,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    const message = getErrorMessage(error);
    const statusCode = getErrorStatusCode(error);

    console.error('Submit event error:', message);

    return NextResponse.json(
      {
        success: false,
        message: 'An error occurred while processing your registration',
        error: message,
      },
      { status: statusCode }
    );
  }
}