import Link from 'next/link';

export default function Competitions() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold mb-6">Competitions</h1>
      <p className="text-lg text-gray-600 mb-12">
        Browse our available competitions.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Innovative Essay */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold mb-4">Innovative Essay</h2>
          <p className="text-gray-600 mb-6">
            Competition details coming soon...
          </p>
          <Link
            href="/competitions/innovative-essay"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            View Details & Register
          </Link>
        </div>

        {/* National Tender */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold mb-4">National Tender</h2>
          <p className="text-gray-600 mb-6">
            Competition details coming soon...
          </p>
          <Link
            href="/competitions/national-tender"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            View Details & Register
          </Link>
        </div>
      </div>
    </div>
  );
}
