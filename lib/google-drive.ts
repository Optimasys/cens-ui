import { google } from 'googleapis';
import { GoogleDriveUploadResponse } from './types';

let drive: ReturnType<typeof google.drive>;

export function initializeDriveClient() {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error(
      'Missing GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET / GOOGLE_REFRESH_TOKEN in env'
    );
  }

  const oauth2Client = new google.auth.OAuth2(
    clientId,
    clientSecret,
    'http://localhost:3000/api/auth/callback'
  );

  oauth2Client.setCredentials({
    refresh_token: refreshToken,
  });

  drive = google.drive({
    version: 'v3',
    auth: oauth2Client,
  });

  return drive;
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
      supportsAllDrives: true,
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
  } catch (error: any) {
    console.error('Google Drive upload error details:', {
      message: error?.message,
      code: error?.code,
      errors: error?.errors,
      response: error?.response?.data,
    });
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
