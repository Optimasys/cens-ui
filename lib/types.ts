/**
 * Type definitions for CENS UI application
 */

// Competition types
export type CompetitionType = 'innovative-essay' | 'national-tender';

// Student information
export interface StudentInfo {
  fullName: string;
  nim: string;
  phoneNumber: string;
  lineId: string;
  email: string;
  university: string;
  major: string;
}

// Team Leader extends Student Info
export interface TeamLeader extends StudentInfo {}

// Competition Form Data - Multi-step form
export interface CompetitionFormData {
  // Step 1: Team Name and Team Leader
  teamName: string;
  teamLeader: TeamLeader;

  // Step 2: Student 2
  student2: StudentInfo;

  // Step 3: Student 3
  student3: StudentInfo;

  // Step 4: File uploads
  studentIdsScan: File;
  paymentProof: File;
  twibbonProof: File;

  competitionType: CompetitionType;
  submittedAt?: Date;
}

// Event types
export type EventType = 'workshop' | 'student-discussion-forum' | 'national-summit';

export interface EventFormData {
  // Events form is empty for now - to be filled later
  submittedAt?: Date;
}

// Supabase response types
export interface SupabaseResponse<T = any> {
  data: T | null;
  error: PostgrestError | null;
}

export interface PostgrestError {
  message: string;
  details: string;
  hint: string;
  code: string;
}

// Google Drive upload response
export interface GoogleDriveUploadResponse {
  id: string;
  name: string;
  mimeType: string;
  webViewLink: string;
}

// API response types
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export interface CompetitionSubmissionResponse {
  submissionId: string;
  fileIds: {
    studentIdsScan: string;
    paymentProof: string;
    twibbonProof: string;
  };
  fileUrls: {
    studentIdsScan: string;
    paymentProof: string;
    twibbonProof: string;
  };
  sheetsUpdated: boolean;
}

export interface EventSubmissionResponse {
  submissionId: string;
  sheetsUpdated: boolean;
}
