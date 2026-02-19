/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { competitionFormSchema, type CompetitionFormInput } from '@/lib/validations';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface CompetitionFormProps {
  competitionType: 'innovative-essay' | 'national-tender';
}

type FormStep = 1 | 2 | 3 | 4;

// ─── Upload helper ────────────────────────────────────────────────────────────

type FileType = 'studentIdsScan' | 'paymentProof' | 'twibbonProof';

interface UploadResult {
  driveId: string;
  driveUrl: string;
}

async function uploadSingleFile(
  file: File,
  fileType: FileType,
  teamName: string
): Promise<UploadResult> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('fileType', fileType);
  formData.append('teamName', teamName);

  const response = await fetch('/api/upload-file', {
    method: 'POST',
    body: formData,
  });

  // ← Tambahkan ini untuk debug
  const text = await response.text();
  console.log(`[upload-file response] status: ${response.status}, body: ${text}`);

  if (!text) {
    throw new Error(`Server returned empty response for ${fileType} (status: ${response.status})`);
  }

  let result;
  try {
    result = JSON.parse(text);
  } catch {
    throw new Error(`Server returned invalid JSON for ${fileType}: ${text}`);
  }

  if (!response.ok || !result.success) {
    throw new Error(result.message || `Failed to upload ${fileType}`);
  }

  return {
    driveId: result.data.driveId,
    driveUrl: result.data.driveUrl,
  };
}

// ─── Component ────────────────────────────────────────────────────────────────

export function NTCRegisterForm({ competitionType }: CompetitionFormProps) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<FormStep>(1);
  const [isLoading, setIsLoading] = useState(false);

  // Upload progress state
  const [uploadProgress, setUploadProgress] = useState<{
    studentIdsScan: 'idle' | 'uploading' | 'done' | 'error';
    paymentProof: 'idle' | 'uploading' | 'done' | 'error';
    twibbonProof: 'idle' | 'uploading' | 'done' | 'error';
  }>({
    studentIdsScan: 'idle',
    paymentProof: 'idle',
    twibbonProof: 'idle',
  });

  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  // Track selected files for display
  const [selectedFiles, setSelectedFiles] = useState<{
    studentIdsScan: File | null;
    paymentProof: File | null;
    twibbonProof: File | null;
  }>({
    studentIdsScan: null,
    paymentProof: null,
    twibbonProof: null,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    getValues,
  } = useForm<CompetitionFormInput>({
    resolver: zodResolver(competitionFormSchema),
    mode: 'onChange',
    defaultValues: {
      competitionType,
    },
  });

  const onSubmit = async (data: CompetitionFormInput) => {
    setIsLoading(true);
    setSubmitStatus(null);

    try {
      // ── Step 1: Validate files ──────────────────────────────────────────────
      const filesToUpload: { file: File; type: FileType }[] = [
        { file: data.studentIdsScan as File, type: 'studentIdsScan' },
        { file: data.paymentProof as File, type: 'paymentProof' },
        { file: data.twibbonProof as File, type: 'twibbonProof' },
      ];

      for (const { file, type } of filesToUpload) {
        if (!file || !(file instanceof File)) {
          throw new Error(`${type} is required`);
        }
        if (file.type !== 'application/pdf') {
          throw new Error(`${type} must be a PDF file`);
        }
        if (file.size > 20 * 1024 * 1024) {
          throw new Error(`${type} must be less than 20MB`);
        }
      }

      // ── Step 2: Upload files one by one to /api/upload-file ────────────────
      const teamName = data.teamName;
      const uploadResults: Record<FileType, UploadResult> = {} as Record<FileType, UploadResult>;

      for (const { file, type } of filesToUpload) {
        // Show per-file uploading status
        setUploadProgress(prev => ({ ...prev, [type]: 'uploading' }));

        try {
          uploadResults[type] = await uploadSingleFile(file, type, teamName);
          setUploadProgress(prev => ({ ...prev, [type]: 'done' }));
        } catch (err) {
          setUploadProgress(prev => ({ ...prev, [type]: 'error' }));
          throw err;
        }
      }

      // ── Step 3: Submit form data as JSON (no files) ────────────────────────
      const response = await fetch('/api/submit-ntcregis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          teamName: data.teamName,
          competitionType: data.competitionType,
          teamLeader: data.teamLeader,
          student2: data.student2,
          student3: data.student3,
          fileIds: {
            studentIdsScan: uploadResults.studentIdsScan.driveId,
            paymentProof: uploadResults.paymentProof.driveId,
            twibbonProof: uploadResults.twibbonProof.driveId,
          },
          fileUrls: {
            studentIdsScan: uploadResults.studentIdsScan.driveUrl,
            paymentProof: uploadResults.paymentProof.driveUrl,
            twibbonProof: uploadResults.twibbonProof.driveUrl,
          },
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Failed to submit form');
      }

      // ── Step 4: Success ────────────────────────────────────────────────────
      reset();
      setSelectedFiles({ studentIdsScan: null, paymentProof: null, twibbonProof: null });
      setUploadProgress({ studentIdsScan: 'idle', paymentProof: 'idle', twibbonProof: 'idle' });
      router.push('/registration-ntc-success');

    } catch (error) {
      const message = error instanceof Error ? error.message : 'An error occurred';
      console.error('Submit error:', message);
      setSubmitStatus({ type: 'error', message });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) setCurrentStep((currentStep - 1) as FormStep);
  };

  const handleNextStep = () => {
    if (currentStep < 4) setCurrentStep((currentStep + 1) as FormStep);
  };

  // Helper: upload progress label
  const progressLabel: Record<string, string> = {
    idle: '',
    uploading: '⏳ Uploading...',
    done: '✓ Uploaded',
    error: '✗ Upload failed',
  };

  const progressColor: Record<string, string> = {
    idle: '',
    uploading: 'text-yellow-600',
    done: 'text-green-600',
    error: 'text-red-600',
  };

  return (
    <div
      className="min-h-screen py-8 px-4 bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: 'url(/images/bg-register.png)' }}
    >
      {/* Background overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#219ACC] via-[#F4E5A2] to-[#219ACC] opacity-80 pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="relative">
          <div className="bg-[#E6E9D8] rounded-3xl shadow-2xl overflow-hidden">
            <div className="flex">
              {/* Form Content */}
              <div className="flex-1 p-8 lg:p-12">

                {/* Header */}
                <div className="mb-8">
                  <h2 className="text-[28px] lg:text-[32px] font-bold text-[#0D6B6B] mb-1 font-[var(--font-gretaros)]">
                    Registration Form
                  </h2>
                  <p className="text-[16px] lg:text-[18px] text-[#0D6B6B] font-[var(--font-gretaros)]">
                    National Tender Competition (NTC)
                  </p>
                </div>

                {submitStatus && (
                  <div
                    className={`mb-6 p-4 rounded-xl ${
                      submitStatus.type === 'success'
                        ? 'bg-green-50 text-green-800 border-2 border-green-200'
                        : 'bg-red-50 text-red-800 border-2 border-red-200'
                    }`}
                  >
                    {submitStatus.message}
                  </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)}>

                  {/* STEP 1: Team Name and Team Leader */}
                  {currentStep === 1 && (
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="teamName" className="block text-[14px] font-semibold text-[#0D6B6B] mb-1.5">
                          Team Name<span className="text-red-500">*</span>
                        </label>
                        <input
                          id="teamName"
                          type="text"
                          {...register('teamName')}
                          className="w-full px-4 py-2.5 border-2 border-[#0D6B6B] rounded-lg bg-white focus:outline-none focus:border-[#5BA8A6] transition-colors text-gray-800 text-[14px]"
                        />
                        {errors.teamName && (
                          <p className="text-red-500 text-xs mt-1">{errors.teamName.message}</p>
                        )}
                      </div>
                      <div className="pt-3">
                        <h4 className="text-[16px] font-bold text-[#0D6B6B] mb-4 font-[var(--font-gretaros)]">
                          Team Leader
                        </h4>
                        <StudentInfoFields register={register} errors={errors} prefix="teamLeader" />
                      </div>
                    </div>
                  )}

                  {/* STEP 2: Student 2 */}
                  {currentStep === 2 && (
                    <div className="space-y-4">
                      <h3 className="text-[16px] font-bold text-[#0D6B6B] mb-4 font-[var(--font-gretaros)]">
                        Student 2
                      </h3>
                      <StudentInfoFields register={register} errors={errors} prefix="student2" />
                    </div>
                  )}

                  {/* STEP 3: Student 3 */}
                  {currentStep === 3 && (
                    <div className="space-y-4">
                      <h3 className="text-[16px] font-bold text-[#0D6B6B] mb-4 font-[var(--font-gretaros)]">
                        Student 3
                      </h3>
                      <StudentInfoFields register={register} errors={errors} prefix="student3" />
                    </div>
                  )}

                  {/* STEP 4: File Uploads */}
                  {currentStep === 4 && (
                    <div className="space-y-4">
                      <h3 className="text-[18px] font-bold text-[#0D6B6B] mb-4 font-[var(--font-gretaros)]">
                        Document Uploads
                      </h3>

                      {/* Upload status banner saat loading */}
                      {isLoading && (
                        <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 text-blue-800 text-[14px] space-y-1">
                          <p className="font-semibold">Uploading your documents, please wait...</p>
                          {(['studentIdsScan', 'paymentProof', 'twibbonProof'] as FileType[]).map((type) => (
                            <p key={type} className={progressColor[uploadProgress[type]]}>
                              {type === 'studentIdsScan' && 'Student IDs Scan'}
                              {type === 'paymentProof' && 'Payment Proof'}
                              {type === 'twibbonProof' && 'Twibbon Proof'}
                              {uploadProgress[type] !== 'idle' && ` — ${progressLabel[uploadProgress[type]]}`}
                            </p>
                          ))}
                        </div>
                      )}

                      {/* Student IDs Scan */}
                      <div>
                        <label htmlFor="studentIdsScan" className="block text-[18px] font-semibold text-[#0D6B6B] mb-1.5">
                          Compiled Scan of Student&apos;s IDs (PDF)<span className="text-red-500">*</span>
                        </label>
                        <input
                          id="studentIdsScan"
                          type="file"
                          accept=".pdf"
                          disabled={isLoading}
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              setValue('studentIdsScan', file);
                              setSelectedFiles(prev => ({ ...prev, studentIdsScan: file }));
                              setUploadProgress(prev => ({ ...prev, studentIdsScan: 'idle' }));
                            }
                          }}
                          className="w-full px-4 py-2.5 border-2 border-[#0D6B6B] rounded-lg bg-white focus:outline-none focus:border-[#5BA8A6] transition-colors text-[14px] file:mr-3 file:py-1.5 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#5BA8A6] file:text-white hover:file:bg-[#4a9694] file:cursor-pointer disabled:opacity-50"
                        />
                        <p className="text-gray-600 text-[14px] mt-1">Format: Team Name_Student ID (Example: Success_Student ID).</p>
                        {selectedFiles.studentIdsScan && (
                          <p className={`text-[14px] mt-1 ${progressColor[uploadProgress.studentIdsScan] || 'text-green-600'}`}>
                            {uploadProgress.studentIdsScan !== 'idle'
                              ? progressLabel[uploadProgress.studentIdsScan]
                              : `✓ Selected: ${selectedFiles.studentIdsScan.name}`}
                          </p>
                        )}
                        {errors.studentIdsScan && (
                          <p className="text-red-500 text-[14px] mt-1">{String(errors.studentIdsScan.message)}</p>
                        )}
                      </div>

                      {/* Payment Proof */}
                      <div>
                        <label htmlFor="paymentProof" className="block text-[18px] font-semibold text-[#0D6B6B] mb-1.5">
                          Scanned Proof of Payment (PDF)<span className="text-red-500">*</span>
                        </label>
                        <input
                          id="paymentProof"
                          type="file"
                          accept=".pdf"
                          disabled={isLoading}
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              setValue('paymentProof', file);
                              setSelectedFiles(prev => ({ ...prev, paymentProof: file }));
                              setUploadProgress(prev => ({ ...prev, paymentProof: 'idle' }));
                            }
                          }}
                          className="w-full px-4 py-2.5 border-2 border-[#0D6B6B] rounded-lg bg-white focus:outline-none focus:border-[#5BA8A6] transition-colors text-[14px] file:mr-3 file:py-1.5 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#5BA8A6] file:text-white hover:file:bg-[#4a9694] file:cursor-pointer disabled:opacity-50"
                        />
                        <p className="text-gray-600 text-[14px] mt-1">Format: Team Name_Payment Proof (Example: Success_Payment Proof).</p>
                        {selectedFiles.paymentProof && (
                          <p className={`text-[14px] mt-1 ${progressColor[uploadProgress.paymentProof] || 'text-green-600'}`}>
                            {uploadProgress.paymentProof !== 'idle'
                              ? progressLabel[uploadProgress.paymentProof]
                              : `✓ Selected: ${selectedFiles.paymentProof.name}`}
                          </p>
                        )}
                        {errors.paymentProof && (
                          <p className="text-red-500 text-[14px] mt-1">{String(errors.paymentProof.message)}</p>
                        )}
                      </div>

                      {/* Twibbon Proof */}
                      <div>
                        <label htmlFor="twibbonProof" className="block text-[18px] font-semibold text-[#0D6B6B] mb-1.5">
                          Twibbon Upload Proof (PDF)<span className="text-red-500">*</span>
                        </label>
                        <input
                          id="twibbonProof"
                          type="file"
                          accept=".pdf"
                          disabled={isLoading}
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              setValue('twibbonProof', file);
                              setSelectedFiles(prev => ({ ...prev, twibbonProof: file }));
                              setUploadProgress(prev => ({ ...prev, twibbonProof: 'idle' }));
                            }
                          }}
                          className="w-full px-4 py-2.5 border-2 border-[#0D6B6B] rounded-lg bg-white focus:outline-none focus:border-[#5BA8A6] transition-colors text-[14px] file:mr-3 file:py-1.5 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#5BA8A6] file:text-white hover:file:bg-[#4a9694] file:cursor-pointer disabled:opacity-50"
                        />
                        <p className="text-gray-600 text-[14px] mt-1">Format: Team Name_Twibbon Proof (Example: Success_Twibbon Proof).</p>
                        {selectedFiles.twibbonProof && (
                          <p className={`text-[14px] mt-1 ${progressColor[uploadProgress.twibbonProof] || 'text-green-600'}`}>
                            {uploadProgress.twibbonProof !== 'idle'
                              ? progressLabel[uploadProgress.twibbonProof]
                              : `✓ Selected: ${selectedFiles.twibbonProof.name}`}
                          </p>
                        )}
                        {errors.twibbonProof && (
                          <p className="text-red-500 text-[14px] mt-1">{String(errors.twibbonProof.message)}</p>
                        )}
                      </div>

                      {/* Note Section */}
                      <div className="mt-6 rounded-lg p-4">
                        <h4 className="text-[18px] font text-[#0D6B6B] mb-2">Note:</h4>
                        <ul className="space-y-2 text-[16px] text-[#0D6B6B]">
                          <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>
                              Each participant must follow the @cens.ui account on Instagram, share an Instagram post using our Twibbon, and post our poster on your Instagram story. The materials can be found at this link:{' '}
                              <a
                                href="https://drive.google.com/drive/folders/1fR7h48vmEUz4ij9lrv5EXOPB1Iik0598"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#0D6B6B] font-semibold underline hover:text-[#5BA8A6] transition-colors"
                              >
                                <br /> Twibbon Link
                              </a>
                            </span>
                          </li>
                          <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>
                              Submit your proposal document via the following link{' '}
                              <Link
                                href="/competitions/national-tender/submission"
                                className="text-[#0D6B6B] font-semibold underline hover:text-[#5BA8A6] transition-colors"
                              >
                                Submission Form
                              </Link>
                              . The deadline for proposal document submission is{' '}
                              <span className="font-bold">April 13th, 2026</span>.
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex gap-4 mt-8">
                    {currentStep > 1 && (
                      <button
                        type="button"
                        onClick={handlePreviousStep}
                        disabled={isLoading}
                        className="ml-147 px-8 py-2.5 text-[#0D6B6B] underline hover:text-[#5BA8A6] transition-colors text-[18px] disabled:opacity-50"
                      >
                        Previous
                      </button>
                    )}

                    {currentStep < 4 && (
                      <button
                        type="button"
                        onClick={handleNextStep}
                        className="ml-auto px-10 py-2.5 bg-gradient-to-l from-[#6EAF5F] to-[#03695E] text-white rounded-full font-semibold hover:bg-gray-500 hover:text-[#5BA8A6] transition-colors duration-500 shadow-lg text-[14px]"
                      >
                        Next
                      </button>
                    )}

                    {currentStep === 4 && (
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="ml-auto px-10 py-2.5 bg-gradient-to-r from-[#03695E] to-[#6EAF5F] text-white rounded-full font-semibold hover:text-[#5BA8A6] transition-colors duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed text-[14px]"
                      >
                        {isLoading ? 'Uploading & Submitting...' : 'Submit'}
                      </button>
                    )}
                  </div>
                </form>
              </div>

              {/* Step Indicator - Right edge */}
              <div className="hidden lg:flex flex-col border-2 border-[#000000] w-[80px] rounded-r-3xl overflow-hidden">
                {[
                  { step: 1, label: 'Step 1' },
                  { step: 2, label: 'Step 2' },
                  { step: 3, label: 'Step 3' },
                  { step: 4, label: 'Step 4' },
                ].map((item, index) => (
                  <div
                    key={item.step}
                    className={`
                      flex-1 flex items-center justify-center
                      font-bold text-[35px] transition-all duration-300 cursor-pointer
                      ${index !== 3 ? 'border-b-2 border-[#000000]' : ''}
                      ${index === 0 ? 'rounded-tr-3xl' : ''}
                      ${index === 3 ? 'rounded-br-3xl' : ''}
                      ${
                        currentStep === item.step
                          ? 'bg-[#E6E9D8] text-[#0D6B6B]'
                          : 'bg-[#E6E9D8] text-black opacity-15 shadow hover:bg-[#E6E9D8] hover:opacity-30'
                      }
                    `}
                    style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
                    onClick={() => {
                      if (item.step <= currentStep && !isLoading) {
                        setCurrentStep(item.step as FormStep);
                      }
                    }}
                  >
                    {item.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Step Indicator */}
        <div className="lg:hidden fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm rounded-full px-6 py-3 shadow-xl flex gap-3 z-50">
          {[1, 2, 3, 4].map((step) => (
            <div
              key={step}
              className={`
                w-10 h-10 rounded-full flex items-center justify-center
                font-bold text-sm transition-all duration-300
                ${
                  currentStep === step
                    ? 'bg-[#B8D6D4] text-[#0D6B6B] scale-110'
                    : 'bg-[#B8D6D4] text-gray-shadow'
                }
              `}
            >
              {step}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Reusable Student Info Fields ─────────────────────────────────────────────

interface StudentInfoFieldsProps {
  register: any;
  errors: any;
  prefix: 'teamLeader' | 'student2' | 'student3';
}

function StudentInfoFields({ register, errors, prefix }: StudentInfoFieldsProps) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-[14px] font-semibold text-[#0D6B6B] mb-1.5">
          Full Name<span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          {...register(`${prefix}.fullName`)}
          className="w-full px-4 py-2.5 border-2 border-[#0D6B6B] rounded-lg bg-white focus:outline-none focus:border-[#5BA8A6] transition-colors text-gray-800 text-[14px]"
        />
        {errors[prefix]?.fullName && (
          <p className="text-red-500 text-xs mt-1">{errors[prefix].fullName.message}</p>
        )}
      </div>

      <div>
        <label className="block text-[14px] font-semibold text-[#0D6B6B] mb-1.5">
          Students&apos; Number (NIM/NPM)<span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          {...register(`${prefix}.nim`)}
          className="w-full px-4 py-2.5 border-2 border-[#0D6B6B] rounded-lg bg-white focus:outline-none focus:border-[#5BA8A6] transition-colors text-gray-800 text-[14px]"
        />
        {errors[prefix]?.nim && (
          <p className="text-red-500 text-xs mt-1">{errors[prefix].nim.message}</p>
        )}
      </div>

      <div>
        <label className="block text-[14px] font-semibold text-[#0D6B6B] mb-1.5">
          Phone Number (Whatsapp)<span className="text-red-500">*</span>
        </label>
        <input
          type="tel"
          {...register(`${prefix}.phoneNumber`)}
          className="w-full px-4 py-2.5 border-2 border-[#0D6B6B] rounded-lg bg-white focus:outline-none focus:border-[#5BA8A6] transition-colors text-gray-800 text-[14px]"
        />
        {errors[prefix]?.phoneNumber && (
          <p className="text-red-500 text-xs mt-1">{errors[prefix].phoneNumber.message}</p>
        )}
      </div>

      <div>
        <label className="block text-[14px] font-semibold text-[#0D6B6B] mb-1.5">
          Line ID<span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          {...register(`${prefix}.lineId`)}
          className="w-full px-4 py-2.5 border-2 border-[#0D6B6B] rounded-lg bg-white focus:outline-none focus:border-[#5BA8A6] transition-colors text-gray-800 text-[14px]"
        />
        {errors[prefix]?.lineId && (
          <p className="text-red-500 text-xs mt-1">{errors[prefix].lineId.message}</p>
        )}
      </div>

      <div>
        <label className="block text-[14px] font-semibold text-[#0D6B6B] mb-1.5">
          Email<span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          {...register(`${prefix}.email`)}
          className="w-full px-4 py-2.5 border-2 border-[#0D6B6B] rounded-lg bg-white focus:outline-none focus:border-[#5BA8A6] transition-colors text-gray-800 text-[14px]"
        />
        {errors[prefix]?.email && (
          <p className="text-red-500 text-xs mt-1">{errors[prefix].email.message}</p>
        )}
      </div>

      <div>
        <label className="block text-[14px] font-semibold text-[#0D6B6B] mb-1.5">
          University<span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          {...register(`${prefix}.university`)}
          className="w-full px-4 py-2.5 border-2 border-[#0D6B6B] rounded-lg bg-white focus:outline-none focus:border-[#5BA8A6] transition-colors text-gray-800 text-[14px]"
        />
        {errors[prefix]?.university && (
          <p className="text-red-500 text-xs mt-1">{errors[prefix].university.message}</p>
        )}
      </div>

      <div>
        <label className="block text-[14px] font-semibold text-[#0D6B6B] mb-1.5">
          Major<span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          {...register(`${prefix}.major`)}
          className="w-full px-4 py-2.5 border-2 border-[#0D6B6B] rounded-lg bg-white focus:outline-none focus:border-[#5BA8A6] transition-colors text-gray-800 text-[14px]"
        />
        {errors[prefix]?.major && (
          <p className="text-red-500 text-xs mt-1">{errors[prefix].major.message}</p>
        )}
      </div>
    </div>
  );
}