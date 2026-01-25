import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-bold mb-4">CENS-UI</h3>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/timeline" className="text-gray-400 hover:text-white transition">
                  Timeline
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Competitions */}
          <div>
            <h4 className="text-lg font-bold mb-4">Competitions</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/competitions/innovative-essay"
                  className="text-gray-400 hover:text-white transition"
                >
                  Innovative Essay
                </Link>
              </li>
              <li>
                <Link
                  href="/competitions/national-tender"
                  className="text-gray-400 hover:text-white transition"
                >
                  National Tender
                </Link>
              </li>
            </ul>
          </div>

          {/* Events */}
          <div>
            <h4 className="text-lg font-bold mb-4">Events</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/events/workshop"
                  className="text-gray-400 hover:text-white transition"
                >
                  Workshop
                </Link>
              </li>
              <li>
                <Link
                  href="/events/student-discussion-forum"
                  className="text-gray-400 hover:text-white transition"
                >
                  Discussion Forum
                </Link>
              </li>
              <li>
                <Link
                  href="/events/national-summit"
                  className="text-gray-400 hover:text-white transition"
                >
                  National Summit
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <p className="text-center text-gray-400">
            &copy; 2024 CENS. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
