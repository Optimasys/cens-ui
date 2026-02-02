/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Zod validation schemas for form data
 */

import { z } from 'zod';

// ============================================================
// STUDENT INFO SCHEMA (Shared for all students)
// ============================================================
const studentInfoSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: 'Full name must be at least 2 characters' })
    .max(100, { message: 'Full name must be at most 100 characters' }),
  nim: z
    .string()
    .min(5, { message: 'NIM/NPM must be at least 5 characters' })
    .max(20, { message: 'NIM/NPM must be at most 20 characters' }),
  phoneNumber: z
    .string()
    .regex(/^[0-9\-\+\(\)\s]+$/, { message: 'Invalid phone number' })
    .min(10, { message: 'Phone number must be at least 10 digits' }),
  lineId: z
    .string()
    .min(1, { message: 'Line ID is required' })
    .max(100, { message: 'Line ID must be at most 100 characters' }),
  email: z.string().email({ message: 'Invalid email address' }),
  university: z
    .string()
    .min(2, { message: 'University name is required' })
    .max(200, { message: 'University name must be at most 200 characters' }),
  major: z
    .string()
    .min(2, { message: 'Major is required' })
    .max(200, { message: 'Major must be at most 200 characters' }),
});

// ============================================================
// COMPETITION FORM VALIDATION SCHEMA (Multi-step form)
// NOTE: File validation is done manually in component, not in Zod
// ============================================================
export const competitionFormSchema = z.object({
  // Step 1: Team Name and Team Leader
  teamName: z
    .string()
    .min(2, { message: 'Team name must be at least 2 characters' })
    .max(100, { message: 'Team name must be at most 100 characters' }),
  teamLeader: studentInfoSchema,

  // Step 2: Student 2
  student2: studentInfoSchema,

  // Step 3: Student 3
  student3: studentInfoSchema,

  // Step 4: File uploads (type: any, validation done manually in component)
  studentIdsScan: z.any(),
  paymentProof: z.any(),
  twibbonProof: z.any(),

  competitionType: z.enum(['innovative-essay', 'national-tender'], {
    message: 'Please select a valid competition type',
  }),
});

export type CompetitionFormInput = z.infer<typeof competitionFormSchema>;

// ============================================================
// EVENT FORM VALIDATION SCHEMA (Empty for now)
// ============================================================
export const eventFormSchema = z.object({
  // Events form is empty for now - to be filled later
});

export type EventFormInput = z.infer<typeof eventFormSchema>;

// ============================================================
// MANUAL FILE VALIDATION HELPER (Use in component)
// ============================================================
export function validateFile(file: any): { valid: boolean; error?: string } {
  if (!file) {
    return { valid: false, error: 'File is required' };
  }

  if (!(file instanceof File)) {
    return { valid: false, error: 'Invalid file object' };
  }

  if (file.size > 10 * 1024 * 1024) {
    return { valid: false, error: 'File size must be less than 10MB' };
  }

  if (file.type !== 'application/pdf') {
    return { valid: false, error: 'File must be a PDF' };
  }

  return { valid: true };
}

export const iecSubmissionFormSchema = z.object({
  teamName:     z.string().min(1, 'Team name is required'),
  fullName:     z.string().min(1, 'Full name is required'),
  nim:          z.string().min(1, 'NIM/NPM is required'),
  phoneNumber:  z.string().min(1, 'Phone number is required'),
  lineId:       z.string().min(1, 'Line ID is required'),
  email:        z.string().email('Invalid email address'),
  university:   z.string().min(1, 'University is required'),
  subtheme:     z.string().min(1, 'Subtheme is required'),
  essayPdf:     z.any(),
});

export type IecSubmissionFormInput = z.infer<typeof iecSubmissionFormSchema>;
