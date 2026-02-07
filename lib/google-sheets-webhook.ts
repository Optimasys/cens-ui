/**
 * Google Sheets webhook utilities
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

/* ================= IEC REGISTRATION ================= */

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

/* ================= IEC SUBMISSION ================= */

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

/* ================= NTC REGISTRATION ================= */

export type NtcCompetitionSheetsPayload = {
  submissionType: 'ntc-regis';
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

/* ================= NTC SUBMISSION (UPDATED) ================= */

export type NtcSubmissionSheetsPayload = {
  submissionType: 'ntc-submission';
  timestamp: string;

  teamName: string;
  fullName: string;
  nim: string;
  phoneNumber: string;
  lineId: string;
  email: string;
  university: string;

  // ✅ NEW
  proposalPdfUrl: string;
  boqFileUrl: string;
};

/* ================= UNION ================= */

export type SheetsPayload =
  | CompetitionSheetsPayload
  | IecSubmissionSheetsPayload
  | NtcCompetitionSheetsPayload
  | NtcSubmissionSheetsPayload;

/* =========================================================
 * Trigger Webhook
 * ======================================================= */

export async function triggerSheetsUpdate(
  webhookUrl: string,
  data: SheetsPayload
): Promise<{ success: boolean; message: string }> {
  try {
    if (!webhookUrl) {
      throw new Error('Webhook URL not configured');
    }

    const response = await axios.post(webhookUrl, data, {
      timeout: 30000,
      headers: { 'Content-Type': 'application/json' },
    });

    return {
      success: response.status === 200,
      message: 'Google Sheets updated',
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Unknown error';

    console.error('Sheets webhook error:', message);

    return {
      success: false,
      message,
    };
  }
}

/* =========================================================
 * Utils
 * ======================================================= */

export function validateWebhookUrl(url: string): boolean {
  try {
    new URL(url);
    return url.startsWith('https://');
  } catch {
    return false;
  }
}

/* =========================================================
 * Format Data
 * ======================================================= */

export function formatDataForSheets<
  T extends SheetsPayload['submissionType']
>(
  submissionType: T,
  data: Omit<
    Extract<SheetsPayload, { submissionType: T }>,
    'submissionType' | 'timestamp'
  >
): Extract<SheetsPayload, { submissionType: T }> {
  return {
    submissionType,
    timestamp: new Date().toISOString(),
    ...data,
  } as Extract<SheetsPayload, { submissionType: T }>;
}
