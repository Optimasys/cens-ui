'use client';

import Link from 'next/link';

export function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="font-bold text-2xl text-blue-600">
            CENS-UI
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-1">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/about">About Us</NavLink>
            <NavLink href="/timeline">Timeline</NavLink>

            {/* Competitions Dropdown */}
            <Dropdown label="Competitions">
              <DropdownLink href="/competitions/innovative-essay">
                Innovative Essay
              </DropdownLink>
              <DropdownLink href="/competitions/national-tender">
                National Tender
              </DropdownLink>
            </Dropdown>

            {/* Events Dropdown */}
            <Dropdown label="Events">
              <DropdownLink href="/events/workshop">Workshop</DropdownLink>
              <DropdownLink href="/events/student-discussion-forum">
                Student's Discussion Forum
              </DropdownLink>
              <DropdownLink href="/events/national-summit">National Summit</DropdownLink>
            </Dropdown>

            <NavLink href="/contact">Contact</NavLink>
          </div>

          {/* Mobile menu button - placeholder */}
          <button className="md:hidden p-2">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="px-3 py-2 rounded-md text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
    >
      {children}
    </Link>
  );
}

function Dropdown({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="relative group">
      <button className="px-3 py-2 rounded-md text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition">
        {label}
      </button>
      <div className="absolute left-0 mt-0 w-48 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        {children}
      </div>
    </div>
  );
}

function DropdownLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition first:rounded-t-md last:rounded-b-md"
    >
      {children}
    </Link>
  );
}
