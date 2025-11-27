'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Shield, Menu, X, UserCircle } from 'lucide-react';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/join', label: 'Join Us' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <nav className="shadow-lg sticky top-0 z-50" style={{ backgroundColor: '#1c3059' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition">
            <Shield className="w-8 h-8 text-white" />
            <span className="font-bold text-xl text-white hidden sm:block">
              Party Membership
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-white font-medium transition ${
                  isActive(link.href)
                    ? ' text-black bg-opacity-20'
                    : 'hover:bg-white hover:text-black text-black hover:bg-opacity-10'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <SignedOut>
              <SignInButton mode="modal">
                <button 
                  className="px-4 py-2 rounded-lg font-semibold text-white transition hover:opacity-90"
                  style={{ backgroundColor: '#e80611' }}
                >
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <Link
                href="/dashboard"
                className="px-4 py-2 rounded-lg font-semibold transition hover:opacity-90"
                style={{ 
                  backgroundColor: '#1a917f',
                  color: '#ffffff'
                }}
              >
                Dashboard
              </Link>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-white hover:bg-opacity-10 transition"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <Menu className="w-6 h-6 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-white border-opacity-20">
          <div className="px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-4 py-2 rounded-lg text-white font-medium transition ${
                  isActive(link.href)
                    ? 'bg-white bg-opacity-20'
                    : 'hover:bg-white hover:bg-opacity-10'
                }`}
              >
                {link.label}
              </Link>
            ))}
            
            <div className="pt-4 border-t border-white border-opacity-20">
              <SignedOut>
                <SignInButton mode="modal">
                  <button 
                    className="w-full px-4 py-2 rounded-lg font-semibold text-white transition hover:opacity-90"
                    style={{ backgroundColor: '#e80611' }}
                  >
                    Sign In
                  </button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <Link
                  href="/dashboard"
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full px-4 py-2 rounded-lg font-semibold text-center transition hover:opacity-90"
                  style={{ 
                    backgroundColor: '#1a917f',
                    color: '#ffffff'
                  }}
                >
                  Dashboard
                </Link>
                <div className="mt-2 flex justify-center">
                  <UserButton afterSignOutUrl="/" />
                </div>
              </SignedIn>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}