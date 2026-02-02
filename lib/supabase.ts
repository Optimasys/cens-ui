/**
 * Supabase client initialization and utilities
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Insert a competition submission into Supabase
 */
export async function insertCompetitionSubmission(data: {
  teamName: string;
  competitionType: string;
  teamLeader: {
    fullName: string;
    nim: string;
    phoneNumber: string;
    lineId: string;
    email: string;
    university: string;
    major: string;
  };
  student2: {
    fullName: string;
    nim: string;
    phoneNumber: string;
    lineId: string;
    email: string;
    university: string;
    major: string;
  };
  student3: {
    fullName: string;
    nim: string;
    phoneNumber: string;
    lineId: string;
    email: string;
    university: string;
    major: string;
  };
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
}) {
  try {
    const { data: submission, error } = await supabase
      .from('competition_submissions')
      .insert([
        {
          team_name: data.teamName,
          competition_type: data.competitionType,
          team_leader: data.teamLeader,
          student2: data.student2,
          student3: data.student3,
          file_ids: data.fileIds,
          file_urls: data.fileUrls,
          created_at: new Date().toISOString(),
        },
      ])
      .select();

    if (error) {
      throw new Error(`Database error: ${error.message}`);
    }

    return { success: true, data: submission?.[0] };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return { success: false, error: message };
  }
}

/**
 * Insert an IEC (Innovative Essay Competition) submission into Supabase
 */
export async function insertIecSubmission(data: {
  teamName: string;
  fullName: string;
  nim: string;
  phoneNumber: string;
  lineId: string;
  email: string;
  university: string;
  subtheme: string;
  fileId: string;
  fileUrl: string;
}) {
  try {
    const { data: submission, error } = await supabase
      .from('iec_submissions')
      .insert([
        {
          team_name: data.teamName,
          full_name: data.fullName,
          nim: data.nim,
          phone_number: data.phoneNumber,
          line_id: data.lineId,
          email: data.email,
          university: data.university,
          subtheme: data.subtheme,
          drive_file_id: data.fileId,
          drive_file_url: data.fileUrl,
          created_at: new Date().toISOString(),
        },
      ])
      .select();

    if (error) {
      throw new Error(`Database error: ${error.message}`);
    }

    return { success: true, data: submission?.[0] };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return { success: false, error: message };
  }
}

/**
 * Insert an event submission into Supabase
 */
export async function insertEventSubmission(data: {
  name: string;
  email: string;
  phone: string;
  institution: string;
  eventType: string;
  specialRequirements?: string;
  driveFileId?: string;
  driveFileUrl?: string;
}) {
  try {
    const { data: submission, error } = await supabase
      .from('event_submissions')
      .insert([
        {
          name: data.name,
          email: data.email,
          phone: data.phone,
          institution: data.institution,
          event_type: data.eventType,
          special_requirements: data.specialRequirements || null,
          drive_file_id: data.driveFileId || null,
          drive_file_url: data.driveFileUrl || null,
          created_at: new Date().toISOString(),
        },
      ])
      .select();

    if (error) {
      throw new Error(`Database error: ${error.message}`);
    }

    return { success: true, data: submission?.[0] };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return { success: false, error: message };
  }
}