/**
 * Google Sheets webhook utilities
 *
 * This module handles triggering Google Apps Script webhooks to automatically
 * update Google Sheets when new submissions are made.
 */

import axios from 'axios';

/* =========================================================
 * Payload Types
 * ======================================================= */

export type StudentPayload = {
  fullName: string;
  nim: string;
  phoneNumber: string;
  lineId: string;
  email: string;
  university: string;
  major: string;
};

export type CompetitionSheetsPayload = {
  submissionType: 'iec-regis';
  timestamp: string;

  teamName: string;
  competitionType: string;

  teamLeader: StudentPayload;
  student2: StudentPayload;
  student3: StudentPayload;

  fileUrls: {
    studentIdsScan: string;
    paymentProof: string;
    twibbonProof: string;
  };
};


export type IecSubmissionSheetsPayload = {
  submissionType: 'iec-submission';
  timestamp: string;

  teamName: string;
  fullName: string;
  nim: string;
  phoneNumber: string;
  lineId: string;
  email: string;
  university: string;
  subtheme: string;

  fileUrl: string;
};

// Future extension: add EventSheetsPayload here
export type SheetsPayload = CompetitionSheetsPayload | IecSubmissionSheetsPayload;

/* =========================================================
 * Trigger Google Sheets Webhook
 * ======================================================= */

export async function triggerSheetsUpdate(
  webhookUrl: string,
  data: SheetsPayload
): Promise<{ success: boolean; message: string }> {
  try {
    if (!webhookUrl) {
      throw new Error('Google Sheets webhook URL is not configured');
    }

    const response = await axios.post(webhookUrl, data, {
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status !== 200) {
      throw new Error(`Webhook returned status ${response.status}`);
    }

    return {
      success: true,
      message: 'Google Sheets updated successfully',
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Sheets webhook error:', message);

    // Do not fail the submission if the webhook fails
    return {
      success: false,
      message: `Sheets update failed: ${message}`,
    };
  }
}

/* =========================================================
 * Utils
 * ======================================================= */

/**
 * Validate that the webhook URL is properly configured
 */
export function validateWebhookUrl(url: string): boolean {
  try {
    new URL(url);
    return url.startsWith('https://');
  } catch {
    return false;
  }
}

/**
 * Format submission data for Google Sheets
 */
export function formatDataForSheets(
  submissionType: 'iec-regis',
  data: Omit<CompetitionSheetsPayload, 'submissionType' | 'timestamp'>
): CompetitionSheetsPayload;
export function formatDataForSheets(
  submissionType: 'iec-submission',
  data: Omit<IecSubmissionSheetsPayload, 'submissionType' | 'timestamp'>
): IecSubmissionSheetsPayload;
export function formatDataForSheets(
  submissionType: 'iec-regis' | 'iec-submission',
  data:
    | Omit<CompetitionSheetsPayload, 'submissionType' | 'timestamp'>
    | Omit<IecSubmissionSheetsPayload, 'submissionType' | 'timestamp'>
): SheetsPayload {
  return {
    submissionType,
    timestamp: new Date().toISOString(),
    ...data,
  } as SheetsPayload;
}