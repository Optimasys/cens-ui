import Link from 'next/link';

export default function Events() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold mb-6">Events</h1>
      <p className="text-lg text-gray-600 mb-12">
        Browse our available events.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Workshop */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold mb-4">Workshop</h2>
          <p className="text-gray-600 mb-6">
            Event details coming soon...
          </p>
          <Link
            href="/events/workshop"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            View Details & Register
          </Link>
        </div>

        {/* Student's Discussion Forum */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold mb-4">Student&apos;s Discussion Forum</h2>
          <p className="text-gray-600 mb-6">
            Event details coming soon...
          </p>
          <Link
            href="/events/student-discussion-forum"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            View Details & Register
          </Link>
        </div>

        {/* National Summit */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold mb-4">National Summit</h2>
          <p className="text-gray-600 mb-6">
            Event details coming soon...
          </p>
          <Link
            href="/events/national-summit"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            View Details & Register
          </Link>
        </div>
      </div>
    </div>
  );
}
