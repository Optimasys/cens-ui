/**
 * POST /api/submit-ntcregis
 *
 * Handles competition form submissions.
 * Files are already uploaded to Google Drive via /api/upload-file.
 * This endpoint only receives text data + Drive file IDs/URLs.
 *
 * Request: application/json
 * {
 *   teamName: string,
 *   competitionType: string,
 *   teamLeader: StudentData,
 *   student2: StudentData,
 *   student3: StudentData,
 *   fileIds: { studentIdsScan, paymentProof, twibbonProof },
 *   fileUrls: { studentIdsScan, paymentProof, twibbonProof },
 * }
 */

import { NextRequest, NextResponse } from 'next/server';
import { competitionFormSchema } from '@/lib/validations';
import { insertCompetitionSubmission } from '@/lib/supabase';
import { triggerSheetsUpdate, formatDataForSheets } from '@/lib/google-sheets-webhook';
import { getErrorMessage, getErrorStatusCode } from '@/lib/errors';
import { z } from 'zod';

// ─── Schema for file references (replacing file uploads) ─────────────────────

const fileRefsSchema = z.object({
  studentIdsScan: z.string().min(1, 'studentIdsScan drive ID is required'),
  paymentProof: z.string().min(1, 'paymentProof drive ID is required'),
  twibbonProof: z.string().min(1, 'twibbonProof drive ID is required'),
});

const submitBodySchema = z.object({
  teamName: z.string().min(1, 'Team name is required'),
  competitionType: z.string().min(1, 'Competition type is required'),
  teamLeader: z.object({
    fullName: z.string().min(1),
    nim: z.string().min(1),
    phoneNumber: z.string().min(1),
    lineId: z.string().min(1),
    email: z.string().email(),
    university: z.string().min(1),
    major: z.string().min(1),
  }),
  student2: z.object({
    fullName: z.string().min(1),
    nim: z.string().min(1),
    phoneNumber: z.string().min(1),
    lineId: z.string().min(1),
    email: z.string().email(),
    university: z.string().min(1),
    major: z.string().min(1),
  }),
  student3: z.object({
    fullName: z.string().min(1),
    nim: z.string().min(1),
    phoneNumber: z.string().min(1),
    lineId: z.string().min(1),
    email: z.string().email(),
    university: z.string().min(1),
    major: z.string().min(1),
  }),
  fileIds: fileRefsSchema,
  fileUrls: fileRefsSchema,
});

// ─── Handler ──────────────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  try {
    // Parse JSON body
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, message: 'Invalid JSON body.' },
        { status: 400 }
      );
    }

    // Validate body
    const validationResult = submitBodySchema.safeParse(body);
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

    // Save submission to Supabase
    const supabaseResult = await insertCompetitionSubmission({
      teamName: validData.teamName,
      competitionType: validData.competitionType,
      teamLeader: validData.teamLeader,
      student2: validData.student2,
      student3: validData.student3,
      fileIds: validData.fileIds,
      fileUrls: validData.fileUrls,
    });

    if (!supabaseResult.success) {
      console.error('Supabase error:', supabaseResult.error);
      return NextResponse.json(
        { success: false, message: 'Failed to save submission to database.' },
        { status: 500 }
      );
    }

    // Trigger Google Sheets webhook (non-blocking)
    let sheetsUpdated = false;
    const sheetsWebhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL_NTC_REGISTER;
    if (sheetsWebhookUrl) {
      const sheetsData = formatDataForSheets('ntc-regis', {
        teamName: validData.teamName,
        competitionType: validData.competitionType,
        teamLeader: validData.teamLeader,
        student2: validData.student2,
        student3: validData.student3,
        fileUrls: validData.fileUrls,
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
          fileIds: validData.fileIds,
          fileUrls: validData.fileUrls,
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