"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [competitionDropdownOpen, setCompetitionDropdownOpen] = useState(false);
  const [eventDropdownOpen, setEventDropdownOpen] = useState(false);

  return (
    <nav className="w-full sticky top-0 z-50 bg-[linear-gradient(89deg,#219ACC_0%,#A6C6DB_11.43%,#6EAF5F_31.41%,#03695E_100%)] overflow-visible">
      <div className="w-full px-6 lg:px-12">
        <div className="flex items-center justify-between h-28 lg:h-32">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/images/logo.png"
              alt="CENS Logo"
              width={297}
              height={167}
              className="w-28 lg:w-40 h-auto drop-shadow-[0px_4px_4px_rgba(255,255,255,0.25)]"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-6">
            <NavLink href="/" pathname={pathname}>Home</NavLink>
            <NavLink href="/about" pathname={pathname}>About US</NavLink>
            <NavLink href="/timeline" pathname={pathname}>Timeline</NavLink>

            {/* Competition Dropdown */}
            <Dropdown
              label="Competition"
              isOpen={competitionDropdownOpen}
              setIsOpen={setCompetitionDropdownOpen}
              pathname={pathname}
              activePathPrefix="/competitions"
            >
              <DropdownLink href="/competitions/national-tender">
                National Tender Competition
              </DropdownLink>
              <DropdownLink href="/competitions/innovative-essay">
                Innovative Essay Competition
              </DropdownLink>
            </Dropdown>

            {/* Event Dropdown */}
            <Dropdown
              label="Event"
              isOpen={eventDropdownOpen}
              setIsOpen={setEventDropdownOpen}
              pathname={pathname}
              activePathPrefix="/events"
            >
              <DropdownLink href="/events/workshop">Workshop</DropdownLink>
              <DropdownLink href="/events/bootcamp">Bootcamp</DropdownLink>
              <DropdownLink href="/events/national-summit">
                National Summit
              </DropdownLink>
            </Dropdown>

            <NavLink href="/contact" pathname={pathname}>Contact</NavLink>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden pb-6">
            <div className="flex flex-col gap-2">
              <MobileNavLink
                href="/"
                pathname={pathname}
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </MobileNavLink>
              <MobileNavLink
                href="/about"
                pathname={pathname}
                onClick={() => setMobileMenuOpen(false)}
              >
                About US
              </MobileNavLink>
              <MobileNavLink
                href="/timeline"
                pathname={pathname}
                onClick={() => setMobileMenuOpen(false)}
              >
                Timeline
              </MobileNavLink>

              {/* Mobile Competition Dropdown */}
              <MobileDropdown label="Competition" pathname={pathname} activePathPrefix="/competitions">
                <MobileDropdownLink
                  href="/competitions/national-tender"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  National Tender Competition
                </MobileDropdownLink>
                <MobileDropdownLink
                  href="/competitions/innovative-essay"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Innovative Essay Competition
                </MobileDropdownLink>
              </MobileDropdown>

              {/* Mobile Event Dropdown */}
              <MobileDropdown label="Event" pathname={pathname} activePathPrefix="/events">
                <MobileDropdownLink
                  href="/events/workshop"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Workshop
                </MobileDropdownLink>
                <MobileDropdownLink
                  href="/events/bootcamp"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Bootcamp
                </MobileDropdownLink>
                <MobileDropdownLink
                  href="/events/national-summit"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  National Summit
                </MobileDropdownLink>
              </MobileDropdown>

              <MobileNavLink
                href="/contact"
                pathname={pathname}
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </MobileNavLink>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

function NavLink({
  href,
  children,
  pathname,
}: {
  href: string;
  children: React.ReactNode;
  pathname: string;
}) {
  const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <Link
      href={href}
      className={`relative inline-block px-4 py-2 text-white text-base lg:text-lg xl:text-xl font-medium font-[var(--font-made-tommy)] transition-all group ${
        isActive ? "" : "hover:opacity-80"
      }`}
      style={isActive ? { textShadow: "0 0 10px #F4E5A2" } : {}}
    >
      {children}
      {/* Underline for both active and hover - matches text width */}
      <span
        className={`absolute bottom-1 left-1/2 -translate-x-1/2 h-1 rounded-full transition-all ${
          isActive
            ? "opacity-100 bg-gradient-to-r from-[#F4E5A2] via-[#6EAF5F] to-[#F4E5A2]"
            : "opacity-0 group-hover:opacity-100 bg-gradient-to-r from-[#F4E5A2] via-[#6EAF5F] to-[#F4E5A2]"
        }`}
        style={
          isActive || true
            ? { width: "calc(100% - 2rem)" }
            : { width: "calc(100% - 2rem)" }
        }
      />
    </Link>
  );
}

function Dropdown({
  label,
  children,
  isOpen,
  setIsOpen,
  pathname,
  activePathPrefix,
}: {
  label: string;
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  pathname: string;
  activePathPrefix: string;
}) {
  const isActive = pathname.includes(activePathPrefix);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        className={`relative inline-flex items-center gap-2 px-4 py-2 text-white text-base lg:text-lg xl:text-xl font-medium font-[var(--font-made-tommy)] transition-all group ${
          isActive ? "" : "hover:opacity-80"
        }`}
        style={isActive ? { textShadow: "0 0 10px #F4E5A2" } : {}}
      >
        <div className="flex items-center gap-2">
          {label}
          <DropdownArrow />
        </div>
        {/* Underline for both active and hover - matches text width */}
        <span
          className={`absolute bottom-1 left-1/2 -translate-x-1/2 h-1 rounded-full transition-all ${
            isActive
              ? "opacity-100 bg-gradient-to-r from-[#F4E5A2] via-[#6EAF5F] to-[#F4E5A2]"
              : "opacity-0 group-hover:opacity-100 bg-gradient-to-r from-[#F4E5A2] via-[#6EAF5F] to-[#F4E5A2]"
          }`}
          style={{ width: "calc(100% - 2rem)" }}
        />
      </button>
      <div
        className={`absolute left-1/2 -translate-x-1/2 top-full pt-6 w-60 transition-all duration-200 z-50 ${
          isOpen
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible -translate-y-2"
        }`}
      >
        <div className="relative bg-[linear-gradient(21deg,#A6C6DB_8.84%,#6EAF5F_85.21%)] backdrop-blur-[16.2px] rounded-2xl py-4 border border-white/35 shadow-[0_0_32.4px_rgba(0,0,0,0.20)]">
          {/* Arrow */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[16px] border-l-transparent border-r-[16px] border-r-transparent border-b-[20px] border-b-[#6EAF5F] drop-shadow-[0_4px_6px_rgba(0,0,0,0.15)]" />
          {children}
        </div>
      </div>
    </div>
  );
}

function DropdownArrow() {
  return (
    <svg
      className="w-4 h-4 text-white"
      fill="none"
      stroke="currentColor"
      strokeWidth={3}
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

function DropdownLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="block px-6 py-3 text-white text-sm lg:text-base xl:text-lg font-medium font-[var(--font-made-tommy)] text-center hover:bg-white/10 transition-colors"
    >
      {children}
    </Link>
  );
}

function MobileNavLink({
  href,
  children,
  onClick,
  pathname,
}: {
  href: string;
  children: React.ReactNode;
  onClick: () => void;
  pathname: string;
}) {
  const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`px-4 py-3 text-white text-base font-medium font-[var(--font-made-tommy)] rounded-lg transition-colors ${
        isActive
          ? "bg-white/20"
          : "hover:bg-white/10"
      }`}
      style={isActive ? { textShadow: "0 0 10px #F4E5A2" } : {}}
    >
      {children}
    </Link>
  );
}

function MobileDropdown({
  label,
  children,
  pathname,
  activePathPrefix,
}: {
  label: string;
  children: React.ReactNode;
  pathname: string;
  activePathPrefix: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const isActive = pathname.includes(activePathPrefix);

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between px-4 py-3 text-white text-base font-medium font-[var(--font-made-tommy)] rounded-lg transition-colors ${
          isActive
            ? "bg-white/20"
            : "hover:bg-white/10"
        }`}
        style={isActive ? { textShadow: "0 0 10px #F4E5A2" } : {}}
      >
        {label}
        <svg
          className={`w-5 h-5 text-white transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth={3}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {isOpen && <div className="pl-4">{children}</div>}
    </div>
  );
}

function MobileDropdownLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="block px-4 py-2 text-white/90 text-sm font-medium font-[var(--font-made-tommy)] hover:bg-white/10 rounded-lg transition-colors"
    >
      {children}
    </Link>
  );
}