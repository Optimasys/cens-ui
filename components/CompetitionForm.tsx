'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { competitionFormSchema, type CompetitionFormInput } from '@/lib/validations';

interface CompetitionFormProps {
  competitionType: 'innovative-essay' | 'national-tender';
}

type FormStep = 1 | 2 | 3 | 4;

export function CompetitionForm({ competitionType }: CompetitionFormProps) {
  const [currentStep, setCurrentStep] = useState<FormStep>(1);
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CompetitionFormInput>({
    resolver: zodResolver(competitionFormSchema),
    mode: 'onBlur',
    defaultValues: {
      competitionType,
    },
  });

  const onSubmit = async (data: CompetitionFormInput) => {
    setIsLoading(true);
    setSubmitStatus(null);

    try {
      const formData = new FormData();

      // Add team info
      formData.append('teamName', data.teamName);
      formData.append('competitionType', data.competitionType);

      // Add team leader
      formData.append('teamLeader.fullName', data.teamLeader.fullName);
      formData.append('teamLeader.nim', data.teamLeader.nim);
      formData.append('teamLeader.phoneNumber', data.teamLeader.phoneNumber);
      formData.append('teamLeader.lineId', data.teamLeader.lineId);
      formData.append('teamLeader.email', data.teamLeader.email);
      formData.append('teamLeader.university', data.teamLeader.university);
      formData.append('teamLeader.major', data.teamLeader.major);

      // Add student 2
      formData.append('student2.fullName', data.student2.fullName);
      formData.append('student2.nim', data.student2.nim);
      formData.append('student2.phoneNumber', data.student2.phoneNumber);
      formData.append('student2.lineId', data.student2.lineId);
      formData.append('student2.email', data.student2.email);
      formData.append('student2.university', data.student2.university);
      formData.append('student2.major', data.student2.major);

      // Add student 3
      formData.append('student3.fullName', data.student3.fullName);
      formData.append('student3.nim', data.student3.nim);
      formData.append('student3.phoneNumber', data.student3.phoneNumber);
      formData.append('student3.lineId', data.student3.lineId);
      formData.append('student3.email', data.student3.email);
      formData.append('student3.university', data.student3.university);
      formData.append('student3.major', data.student3.major);

      // Add files
      formData.append('studentIdsScan', data.studentIdsScan);
      formData.append('paymentProof', data.paymentProof);
      formData.append('twibbonProof', data.twibbonProof);

      const response = await fetch('/api/submit-competition', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to submit form');
      }

      setSubmitStatus({
        type: 'success',
        message: 'Your registration has been submitted successfully!',
      });
      setCurrentStep(1);
      reset();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An error occurred';
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

  const handleNextStep = async () => {
    if (currentStep < 4) {
      setCurrentStep((currentStep + 1) as FormStep);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-2">Register for Competition</h2>
      <p className="text-gray-600 mb-6">Step {currentStep} of 4</p>

      {submitStatus && (
        <div
          className={`mb-6 p-4 rounded-md ${
            submitStatus.type === 'success'
              ? 'bg-green-50 text-green-800 border border-green-200'
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}
        >
          {submitStatus.message}
        </div>
      )}

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex items-center flex-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold transition-colors ${
                  step <= currentStep
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-300 text-gray-700'
                }`}
              >
                {step}
              </div>
              {step < 4 && <div className="flex-1 h-1 mx-2 bg-gray-300" />}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>Team & Leader</span>
          <span>Student 2</span>
          <span>Student 3</span>
          <span>Documents</span>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* STEP 1: Team Name and Team Leader */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold mb-4">Step 1: Team Name & Team Leader</h3>

            {/* Team Name */}
            <div>
              <label htmlFor="teamName" className="block text-sm font-medium text-gray-700 mb-2">
                Team Name *
              </label>
              <input
                id="teamName"
                type="text"
                {...register('teamName')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Enter your team name"
              />
              {errors.teamName && (
                <p className="text-red-500 text-sm mt-1">{errors.teamName.message}</p>
              )}
            </div>

            <div className="border-t pt-6">
              <h4 className="text-lg font-semibold mb-4">Team Leader Information</h4>

              <StudentInfoFields register={register} errors={errors} prefix="teamLeader" />
            </div>
          </div>
        )}

        {/* STEP 2: Student 2 */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold mb-4">Step 2: Student 2</h3>
            <StudentInfoFields register={register} errors={errors} prefix="student2" />
          </div>
        )}

        {/* STEP 3: Student 3 */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold mb-4">Step 3: Student 3</h3>
            <StudentInfoFields register={register} errors={errors} prefix="student3" />
          </div>
        )}

        {/* STEP 4: File Uploads */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold mb-4">Step 4: Document Uploads</h3>

            {/* Student IDs Scan */}
            <div>
              <label htmlFor="studentIdsScan" className="block text-sm font-medium text-gray-700 mb-2">
                Compiled Scan of Student's IDs (PDF) *
              </label>
              <input
                id="studentIdsScan"
                type="file"
                accept=".pdf"
                {...register('studentIdsScan')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
              <p className="text-gray-500 text-sm mt-1">Scan all 3 student IDs into one PDF (max 10MB)</p>
              {errors.studentIdsScan && (
                <p className="text-red-500 text-sm mt-1">{errors.studentIdsScan.message}</p>
              )}
            </div>

            {/* Payment Proof */}
            <div>
              <label htmlFor="paymentProof" className="block text-sm font-medium text-gray-700 mb-2">
                Scanned Proof of Payment (PDF) *
              </label>
              <input
                id="paymentProof"
                type="file"
                accept=".pdf"
                {...register('paymentProof')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
              <p className="text-gray-500 text-sm mt-1">Max 10MB</p>
              {errors.paymentProof && (
                <p className="text-red-500 text-sm mt-1">{errors.paymentProof.message}</p>
              )}
            </div>

            {/* Twibbon Upload Proof */}
            <div>
              <label htmlFor="twibbonProof" className="block text-sm font-medium text-gray-700 mb-2">
                Twibbon Upload Proof (PDF) *
              </label>
              <input
                id="twibbonProof"
                type="file"
                accept=".pdf"
                {...register('twibbonProof')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
              <p className="text-gray-500 text-sm mt-1">Max 10MB</p>
              {errors.twibbonProof && (
                <p className="text-red-500 text-sm mt-1">{errors.twibbonProof.message}</p>
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
              className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-gray-600 transition"
            >
              Previous Step
            </button>
          )}

          {currentStep < 4 && (
            <button
              type="button"
              onClick={handleNextStep}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Next Step
            </button>
          )}

          {currentStep === 4 && (
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Submitting...' : 'Submit Registration'}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

// Reusable Student Info Fields Component
interface StudentInfoFieldsProps {
  register: any;
  errors: any;
  prefix: 'teamLeader' | 'student2' | 'student3';
}

function StudentInfoFields({ register, errors, prefix }: StudentInfoFieldsProps) {
  return (
    <div className="space-y-4">
      {/* Full Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Full Name *
        </label>
        <input
          type="text"
          {...register(`${prefix}.fullName`)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          placeholder="Enter full name"
        />
        {errors[prefix]?.fullName && (
          <p className="text-red-500 text-sm mt-1">{errors[prefix].fullName.message}</p>
        )}
      </div>

      {/* NIM/NPM */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Students Number (NIM/NPM) *
        </label>
        <input
          type="text"
          {...register(`${prefix}.nim`)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          placeholder="Enter NIM/NPM"
        />
        {errors[prefix]?.nim && (
          <p className="text-red-500 text-sm mt-1">{errors[prefix].nim.message}</p>
        )}
      </div>

      {/* Phone Number */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Phone Number (WhatsApp) *
        </label>
        <input
          type="tel"
          {...register(`${prefix}.phoneNumber`)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          placeholder="Enter phone number"
        />
        {errors[prefix]?.phoneNumber && (
          <p className="text-red-500 text-sm mt-1">{errors[prefix].phoneNumber.message}</p>
        )}
      </div>

      {/* Line ID */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Line ID *
        </label>
        <input
          type="text"
          {...register(`${prefix}.lineId`)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          placeholder="Enter Line ID"
        />
        {errors[prefix]?.lineId && (
          <p className="text-red-500 text-sm mt-1">{errors[prefix].lineId.message}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Email *
        </label>
        <input
          type="email"
          {...register(`${prefix}.email`)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          placeholder="Enter email"
        />
        {errors[prefix]?.email && (
          <p className="text-red-500 text-sm mt-1">{errors[prefix].email.message}</p>
        )}
      </div>

      {/* University */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          University *
        </label>
        <input
          type="text"
          {...register(`${prefix}.university`)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          placeholder="Enter university name"
        />
        {errors[prefix]?.university && (
          <p className="text-red-500 text-sm mt-1">{errors[prefix].university.message}</p>
        )}
      </div>

      {/* Major */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Major *
        </label>
        <input
          type="text"
          {...register(`${prefix}.major`)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          placeholder="Enter major"
        />
        {errors[prefix]?.major && (
          <p className="text-red-500 text-sm mt-1">{errors[prefix].major.message}</p>
        )}
      </div>
    </div>
  );
}