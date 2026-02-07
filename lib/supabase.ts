import { createClient } from '@supabase/supabase-js';

// ==============================
// INIT CLIENT
// ==============================

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ==============================
// TYPES
// ==============================

export type NTCSubmission = {
  id?: string;
  team_name: string;
  full_name: string;
  nim: string;
  phone_number: string;
  line_id: string;
  email: string;
  university: string;

  // ✅ PDF
  proposal_file_id: string;
  proposal_file_url: string;

  // ✅ EXCEL
  excel_file_id: string;
  excel_file_url: string;

  created_at?: string;
  updated_at?: string;
};

export type IECSubmission = {
  id?: string;
  team_name: string;
  full_name: string;
  nim: string;
  phone_number: string;
  line_id: string;
  email: string;
  university: string;
  subtheme: string;
  file_id: string;
  file_url: string;
  created_at?: string;
  updated_at?: string;
};

// ==============================
// NTC HELPERS
// ==============================

export const insertNTCSubmission = async (
  data: Omit<NTCSubmission, 'id' | 'created_at' | 'updated_at'>
) => {
  const { data: result, error } = await supabase
    .from('ntc_submission')
    .insert({
      ...data,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) throw error;
  return result;
};

export const getNTCSubmissions = async () => {
  return await supabase
    .from('ntc_submission')
    .select('*')
    .order('created_at', { ascending: false });
};

export const getNTCByNIM = async (nim: string) => {
  return await supabase
    .from('ntc_submission')
    .select('*')
    .eq('nim', nim)
    .single();
};

// ==============================
// IEC HELPERS
// ==============================

export const insertIECSubmission = async (
  data: Omit<IECSubmission, 'id' | 'created_at' | 'updated_at'>
) => {
  const { data: result, error } = await supabase
    .from('iec_submission')
    .insert({
      ...data,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) throw error;
  return result;
};

export const getIECSubmissions = async () => {
  return await supabase
    .from('iec_submission')
    .select('*')
    .order('created_at', { ascending: false });
};

export const getIECByNIM = async (nim: string) => {
  return await supabase
    .from('iec_submission')
    .select('*')
    .eq('nim', nim)
    .single();
};

// ==============================
// COMMON UTILITIES
// ==============================

export const checkDuplicateNIM = async (
  table: 'ntc_submission' | 'iec_submission',
  nim: string
) => {
  const { data, error } = await supabase
    .from(table)
    .select('id')
    .eq('nim', nim)
    .maybeSingle();

  if (error) throw error;
  return !!data;
};

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
        },
      ])
      .select()
      .single();

    if (error) {
      throw new Error(`Database error: ${error.message}`);
    }

    return { success: true, data: submission };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return { success: false, error: message };
  }
}