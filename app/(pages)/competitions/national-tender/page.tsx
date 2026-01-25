import { CompetitionForm } from '@/components/CompetitionForm';

export default function NationalTender() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold mb-4">National Tender Competition</h1>

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-4">About This Competition</h2>
        <p className="text-gray-600 mb-6">
          Competition description and details coming soon...
        </p>
      </div>

      <CompetitionForm competitionType="national-tender" />
    </div>
  );
}
