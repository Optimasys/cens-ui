/**
 * Google Drive API utilities for file uploads
 *
 * Note: This is for backend use. Configure OAuth 2.0 credentials in Google Cloud Console.
 * Set up a service account for server-side uploads, or use OAuth 2.0 flow for user uploads.
 */

import { google, Auth } from 'googleapis';
import { GoogleDriveUploadResponse } from './types';

let drive: ReturnType<typeof google.drive>;

/**
 * Initialize Google Drive API client
 * Uses service account credentials from environment variables
 */
export function initializeDriveClient() {
  const serviceAccountKey = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;

  if (!serviceAccountKey) {
    throw new Error('GOOGLE_SERVICE_ACCOUNT_KEY environment variable is not set');
  }

  try {
    const credentials = JSON.parse(serviceAccountKey);
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/drive.file'],
    });

    drive = google.drive({ version: 'v3', auth });
    return drive;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    throw new Error(`Failed to initialize Google Drive client: ${message}`);
  }
}

/**
 * Upload a file to Google Drive
 */
export async function uploadFileToDrive(
  fileBuffer: Buffer,
  fileName: string,
  mimeType: string,
  folderId?: string
): Promise<GoogleDriveUploadResponse> {
  try {
    if (!drive) {
      initializeDriveClient();
    }

    const fileMetadata: any = {
      name: fileName,
      mimeType,
    };

    if (folderId) {
      fileMetadata.parents = [folderId];
    }

    const response = await drive.files.create({
      requestBody: fileMetadata,
      media: {
        mimeType,
        body: require('stream').Readable.from(fileBuffer),
      },
      fields: 'id,name,mimeType,webViewLink',
    });

    const fileId = response.data.id;
    const fileName_ = response.data.name;
    const mimeType_ = response.data.mimeType;
    const webViewLink = response.data.webViewLink;

    if (!fileId || !webViewLink) {
      throw new Error('Failed to get upload response data');
    }

    return {
      id: fileId,
      name: fileName_,
      mimeType: mimeType_,
      webViewLink,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    throw new Error(`Google Drive upload failed: ${message}`);
  }
}

/**
 * Create a folder in Google Drive
 */
export async function createFolderInDrive(folderName: string): Promise<string> {
  try {
    if (!drive) {
      initializeDriveClient();
    }

    const fileMetadata = {
      name: folderName,
      mimeType: 'application/vnd.google-apps.folder',
    };

    const response = await drive.files.create({
      requestBody: fileMetadata,
      fields: 'id',
    });

    const folderId = response.data.id;

    if (!folderId) {
      throw new Error('Failed to create folder');
    }

    return folderId;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    throw new Error(`Failed to create Google Drive folder: ${message}`);
  }
}

/**
 * Share a file in Google Drive with specific permissions
 */
export async function shareFileInDrive(
  fileId: string,
  email: string,
  role: 'reader' | 'commenter' | 'writer' = 'reader'
): Promise<void> {
  try {
    if (!drive) {
      initializeDriveClient();
    }

    await drive.permissions.create({
      fileId,
      requestBody: {
        role,
        type: 'user',
        emailAddress: email,
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    throw new Error(`Failed to share Google Drive file: ${message}`);
  }
}
