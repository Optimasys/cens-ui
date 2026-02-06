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
  file_id: string;
  file_url: string;
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
