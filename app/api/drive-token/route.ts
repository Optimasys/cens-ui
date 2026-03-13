// app/api/drive-token/route.ts

import { NextResponse } from 'next/server';
import { OAuth2Client } from 'google-auth-library';

export const runtime = 'nodejs';

export async function GET() {
  try {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;
    const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;

    if (!clientId || !clientSecret || !refreshToken || !folderId) {
      console.error('Missing env vars:', {
        hasClientId: !!clientId,
        hasClientSecret: !!clientSecret,
        hasRefreshToken: !!refreshToken,
        hasFolderId: !!folderId,
      });
      return NextResponse.json(
        { success: false, message: 'Server misconfiguration: missing credentials' },
        { status: 500 }
      );
    }

    const oauth2Client = new OAuth2Client(clientId, clientSecret);
    oauth2Client.setCredentials({ refresh_token: refreshToken });

    const tokenResponse = await oauth2Client.getAccessToken();

    if (!tokenResponse.token) {
      throw new Error('Failed to retrieve access token');
    }

    return NextResponse.json({
      success: true,
      accessToken: tokenResponse.token,
      folderId,
    });

  } catch (error) {
    console.error('Token error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to get access token' },
      { status: 500 }
    );
  }
}