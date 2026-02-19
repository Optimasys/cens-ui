/**
 * POST /api/upload-file
 *
 * Handles single file upload to Google Drive.
 * Designed to be called separately per file to avoid Vercel's 4.5MB payload limit.
 *
 * Request: multipart/form-data
 *   - file: File (PDF)
 *   - fileType: 'studentIdsScan' | 'paymentProof' | 'twibbonProof'
 *   - teamName: string (used for naming the file)
 *
 * Response:
 *   - { success: true, driveId: string, driveUrl: string, fileName: string }
 */

import { NextRequest, NextResponse } from 'next/server';
import { uploadFileToDrive } from '@/lib/google-drive';
import { fileToBuffer, generateUniqueFileName } from '@/lib/file-utils';

// Allowed file types for validation
const ALLOWED_FILE_TYPES = ['studentIdsScan', 'paymentProof', 'twibbonProof'] as const;
type FileType = (typeof ALLOWED_FILE_TYPES)[number];

// File name suffix per type
const FILE_SUFFIX: Record<FileType, string> = {
  studentIdsScan: 'student-ids',
  paymentProof: 'payment-proof',
  twibbonProof: 'twibbon-proof',
};

// Max file size: 20MB (adjust as needed)
const MAX_FILE_SIZE_BYTES = 20 * 1024 * 1024;

export async function POST(request: NextRequest) {
  try {
    // Parse multipart form data
    let formData: FormData;
    try {
      formData = await request.formData();
    } catch {
      return NextResponse.json(
        { success: false, message: 'Invalid form data. Make sure you are sending multipart/form-data.' },
        { status: 400 }
      );
    }

    // Extract fields
    const file = formData.get('file') as File | null;
    const fileType = formData.get('fileType') as string | null;
    const teamName = formData.get('teamName') as string | null;

    // --- Validation ---

    if (!file) {
      return NextResponse.json(
        { success: false, message: 'No file provided. Include a "file" field in the form data.' },
        { status: 400 }
      );
    }

    if (!fileType || !ALLOWED_FILE_TYPES.includes(fileType as FileType)) {
      return NextResponse.json(
        {
          success: false,
          message: `Invalid fileType. Must be one of: ${ALLOWED_FILE_TYPES.join(', ')}`,
        },
        { status: 400 }
      );
    }

    if (!teamName || teamName.trim() === '') {
      return NextResponse.json(
        { success: false, message: 'teamName is required for file naming.' },
        { status: 400 }
      );
    }

    // Validate MIME type (only PDF allowed)
    if (file.type !== 'application/pdf') {
      return NextResponse.json(
        { success: false, message: 'Only PDF files are accepted.' },
        { status: 400 }
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE_BYTES) {
      return NextResponse.json(
        {
          success: false,
          message: `File too large. Maximum allowed size is ${MAX_FILE_SIZE_BYTES / 1024 / 1024}MB.`,
        },
        { status: 400 }
      );
    }

    // --- Google Drive Upload ---

    const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;
    if (!folderId) {
      console.error('GOOGLE_DRIVE_FOLDER_ID is not set');
      return NextResponse.json(
        { success: false, message: 'Server configuration error: Google Drive folder not configured.' },
        { status: 500 }
      );
    }

    // Build a readable file name: TeamName_student-ids_<timestamp>.pdf
    const sanitizedTeamName = teamName.trim().replace(/\s+/g, '_');
    const suffix = FILE_SUFFIX[fileType as FileType];
    const originalNameWithPrefix = `${sanitizedTeamName}_${suffix}.pdf`;

    const uniqueFileName = generateUniqueFileName(originalNameWithPrefix, suffix);
    const fileBuffer = await fileToBuffer(file);

    let driveResponse;
    try {
      driveResponse = await uploadFileToDrive(fileBuffer, uniqueFileName, file.type, folderId);
    } catch (error) {
      console.error('Google Drive upload error:', error);
      return NextResponse.json(
        { success: false, message: 'Failed to upload file to Google Drive. Please try again.' },
        { status: 500 }
      );
    }

    // --- Success ---
    return NextResponse.json(
      {
        success: true,
        message: 'File uploaded successfully.',
        data: {
          driveId: driveResponse.id,
          driveUrl: driveResponse.webViewLink,
          fileName: uniqueFileName,
          fileType,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Unexpected error in /api/upload-file:', error);
    return NextResponse.json(
      { success: false, message: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}