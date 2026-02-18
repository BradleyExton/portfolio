"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const navItems = [
    { label: "About", href: isHomePage ? "#about" : "/about" },
    {
      label: "Experience",
      href: isHomePage ? "#experience" : "/#experience",
    },
    { label: "Services", href: isHomePage ? "#services" : "/services" },
  ];

  const contactHref = isHomePage ? "#contact" : "/contact";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-slate-900">
          <span className="text-emerald-600">B</span>radley{" "}
          <span className="text-emerald-600">E</span>xton
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-8 items-center">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-slate-600 hover:text-emerald-600 transition-colors text-sm font-medium"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href={contactHref}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Get In Touch
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6 text-slate-900"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMenuOpen ? (
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

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-200 px-6 py-4 space-y-4">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="block text-slate-600 hover:text-emerald-600 transition-colors text-sm font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href={contactHref}
            className="block bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors text-center"
            onClick={() => setIsMenuOpen(false)}
          >
            Get In Touch
          </Link>
        </div>
      )}
    </nav>
  );
}
