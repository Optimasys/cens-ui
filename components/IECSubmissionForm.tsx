/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { iecSubmissionFormSchema, type IecSubmissionFormInput } from '@/lib/validations';
import { useRouter } from 'next/navigation';

type FormStep = 1 | 2;

export function IECSubmissionForm() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<FormStep>(1);
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<IecSubmissionFormInput>({
    resolver: zodResolver(iecSubmissionFormSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: IecSubmissionFormInput) => {
    setIsLoading(true);
    setSubmitStatus(null);

    try {
      // Manual file validation
      if (!data.essayPdf) {
        throw new Error('Essay PDF is required');
      }
      if (!(data.essayPdf instanceof File)) {
        throw new Error('Essay PDF is not a valid file');
      }
      if (data.essayPdf.size > 10 * 1024 * 1024) {
        throw new Error('Essay PDF size must be less than 10MB');
      }
      if (data.essayPdf.type !== 'application/pdf') {
        throw new Error('Essay must be a PDF file');
      }

      const formData = new FormData();

      // Add fields
      formData.append('teamName', data.teamName);
      formData.append('fullName', data.fullName);
      formData.append('nim', data.nim);
      formData.append('phoneNumber', data.phoneNumber);
      formData.append('lineId', data.lineId);
      formData.append('email', data.email);
      formData.append('university', data.university);
      formData.append('subtheme', data.subtheme);

      // Add file
      formData.append('essayPdf', data.essayPdf);

      const response = await fetch('/api/submit-iecsubmission', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to submit form');
      }

      // Reset form
      reset();
      setSelectedFile(null);

      // Redirect to success page
      router.push('/submission-iec-success');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An error occurred';
      console.error('Submit error:', message);
      setSubmitStatus({
        type: 'error',
        message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep((currentStep - 1) as FormStep);
    }
  };

  const handleNextStep = () => {
    if (currentStep < 2) {
      setCurrentStep((currentStep + 1) as FormStep);
    }
  };

  return (
    <div
      className="min-h-screen py-8 px-4 bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: 'url(/images/bg-register.png)',
      }}
    >
      {/* Background overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#219ACC] via-[#F4E5A2] to-[#219ACC] opacity-80 pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="relative">
          {/* Main Form Container */}
          <div className="bg-[#E6E9D8] rounded-3xl shadow-2xl overflow-hidden">
            <div className="flex">
              {/* Form Content */}
              <div className="flex-1 p-8 lg:p-12">

                {/* Header */}
                <div className="mb-8">
                  <h2 className="text-[28px] lg:text-[32px] font-bold text-[#0D6B6B] mb-1 font-[var(--font-gretaros)]">
                    Submission Form
                  </h2>
                  <p className="text-[16px] lg:text-[18px] text-[#0D6B6B] font-[var(--font-gretaros)]">
                    Innovative Essay Competition (IEC)
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
                  {/* STEP 1: Team Name + Team Leader Info */}
                  {currentStep === 1 && (
                    <div className="space-y-4">
                      {/* Team Name */}
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

                      {/* Team Leader section header */}
                      <div className="pt-3">
                        <h4 className="text-[16px] font-bold text-[#0D6B6B] mb-4 font-[var(--font-gretaros)]">
                          Team Leader
                        </h4>

                        {/* Full Name */}
                        <div className="space-y-4">
                          <div>
                            <label className="block text-[14px] font-semibold text-[#0D6B6B] mb-1.5">
                              Full Name<span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              {...register('fullName')}
                              className="w-full px-4 py-2.5 border-2 border-[#0D6B6B] rounded-lg bg-white focus:outline-none focus:border-[#5BA8A6] transition-colors text-gray-800 text-[14px]"
                            />
                            {errors.fullName && (
                              <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>
                            )}
                          </div>

                          {/* NIM/NPM */}
                          <div>
                            <label className="block text-[14px] font-semibold text-[#0D6B6B] mb-1.5">
                              Students&apos; Number (NIM/NPM)<span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              {...register('nim')}
                              className="w-full px-4 py-2.5 border-2 border-[#0D6B6B] rounded-lg bg-white focus:outline-none focus:border-[#5BA8A6] transition-colors text-gray-800 text-[14px]"
                            />
                            {errors.nim && (
                              <p className="text-red-500 text-xs mt-1">{errors.nim.message}</p>
                            )}
                          </div>

                          {/* Phone Number */}
                          <div>
                            <label className="block text-[14px] font-semibold text-[#0D6B6B] mb-1.5">
                              Phone Number (Whatsapp)<span className="text-red-500">*</span>
                            </label>
                            <input
                              type="tel"
                              {...register('phoneNumber')}
                              className="w-full px-4 py-2.5 border-2 border-[#0D6B6B] rounded-lg bg-white focus:outline-none focus:border-[#5BA8A6] transition-colors text-gray-800 text-[14px]"
                            />
                            {errors.phoneNumber && (
                              <p className="text-red-500 text-xs mt-1">{errors.phoneNumber.message}</p>
                            )}
                          </div>

                          {/* Line ID */}
                          <div>
                            <label className="block text-[14px] font-semibold text-[#0D6B6B] mb-1.5">
                              Line ID<span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              {...register('lineId')}
                              className="w-full px-4 py-2.5 border-2 border-[#0D6B6B] rounded-lg bg-white focus:outline-none focus:border-[#5BA8A6] transition-colors text-gray-800 text-[14px]"
                            />
                            {errors.lineId && (
                              <p className="text-red-500 text-xs mt-1">{errors.lineId.message}</p>
                            )}
                          </div>

                          {/* Email */}
                          <div>
                            <label className="block text-[14px] font-semibold text-[#0D6B6B] mb-1.5">
                              Email<span className="text-red-500">*</span>
                            </label>
                            <input
                              type="email"
                              {...register('email')}
                              className="w-full px-4 py-2.5 border-2 border-[#0D6B6B] rounded-lg bg-white focus:outline-none focus:border-[#5BA8A6] transition-colors text-gray-800 text-[14px]"
                            />
                            {errors.email && (
                              <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                            )}
                          </div>

                          {/* University */}
                          <div>
                            <label className="block text-[14px] font-semibold text-[#0D6B6B] mb-1.5">
                              University<span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              {...register('university')}
                              className="w-full px-4 py-2.5 border-2 border-[#0D6B6B] rounded-lg bg-white focus:outline-none focus:border-[#5BA8A6] transition-colors text-gray-800 text-[14px]"
                            />
                            {errors.university && (
                              <p className="text-red-500 text-xs mt-1">{errors.university.message}</p>
                            )}
                          </div>

                          {/* Subtheme */}
                          <div>
                            <label className="block text-[14px] font-semibold text-[#0D6B6B] mb-1.5">
                              Subtheme<span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              {...register('subtheme')}
                              className="w-full px-4 py-2.5 border-2 border-[#0D6B6B] rounded-lg bg-white focus:outline-none focus:border-[#5BA8A6] transition-colors text-gray-800 text-[14px]"
                            />
                            {errors.subtheme && (
                              <p className="text-red-500 text-xs mt-1">{errors.subtheme.message}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 2: Essay PDF Upload */}
                  {currentStep === 2 && (
                    <div className="space-y-4">
                      {/* Essay PDF */}
                      <div>
                        <label htmlFor="essayPdf" className="block text-[18px] font-semibold text-[#0D6B6B] mb-1.5">
                        Final Essay Submission (PDF)
                        </label>
                        <input
                          id="essayPdf"
                          type="file"
                          accept=".pdf"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              setValue('essayPdf', file);
                              setSelectedFile(file);
                            }
                          }}
                          className="w-full px-4 py-2.5 border-2 border-[#0D6B6B] rounded-lg bg-white focus:outline-none focus:border-[#5BA8A6] transition-colors text-[14px] file:mr-3 file:py-1.5 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#5BA8A6] file:text-white hover:file:bg-[#4a9694] file:cursor-pointer"
                        />
                        <p className="text-gray-600 text-[14px] mt-1">File name for the essay must be written as:</p>
                        <p className="text-gray-600 text-[14px] mt-1">IEC(No. Of Sub-Theme)_Team Name_University (max 10MB)</p>
                        <p className="text-gray-600 text-[14px] mt-1">Example: IEC1_Cens_UI or IEC2_Cens_UI</p>

                        {selectedFile && (
                          <p className="text-green-600 text-[14px] mt-1">
                            ✓ Selected: {selectedFile.name}
                          </p>
                        )}
                        {errors.essayPdf && (
                          <p className="text-red-500 text-[14px] mt-1">{String(errors.essayPdf.message)}</p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex gap-4 mt-8">
                    {currentStep > 1 && (
                      <button
                        type="button"
                        onClick={handlePreviousStep}
                        className="ml-162 px-8 py-2.5 text-[#0D6B6B] underline hover:text-[#5BA8A6] transition-colors text-[18px] font-bold"
                      >
                        Previous
                      </button>
                    )}

                    {currentStep < 2 && (
                      <button
                        type="button"
                        onClick={handleNextStep}
                        className="ml-auto px-10 py-2.5 bg-gradient-to-l from-[#6EAF5F] to-[#03695E] text-white rounded-full font-semibold hover:bg-gray-500 hover:text-[#5BA8A6] transition-colors duration-500 shadow-lg text-[14px]"
                      >
                        Next
                      </button>
                    )}

                    {currentStep === 2 && (
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="ml-auto px-10 py-2.5 bg-gradient-to-r from-[#03695E] to-[#6EAF5F] text-white rounded-full font-semibold hover:text-[#5BA8A6] transition-colors duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed text-[14px]"
                      >
                        {isLoading ? 'Submitting...' : 'Submit'}
                      </button>
                    )}
                  </div>
                </form>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}