'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`sticky top-0 z-50 bg-white shadow-sm transition-all duration-300 ${scrolled ? 'shadow-md py-2' : 'py-4'}`}>
      <div className="container">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src="/horecabrigida-logo.png"
              alt="Horeca Brigida Logo"
              width={200}
              height={50}
              className={`h-12 w-auto transition-all duration-300 ${scrolled ? 'h-10' : 'h-12'}`}
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className={`text-foreground hover:text-[var(--primary)] font-medium transition-colors relative ${
                pathname === '/' ? 'text-[var(--primary)]' : ''
              }`}
            >
              <span>Home</span>
              {pathname === '/' && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[var(--primary)] mt-0.5"></span>
              )}
            </Link>
            <Link 
              href="/catalog" 
              className={`text-foreground hover:text-[var(--primary)] font-medium transition-colors relative ${
                pathname === '/catalog' ? 'text-[var(--primary)]' : ''
              }`}
            >
              <span>Catalogus</span>
              {pathname === '/catalog' && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[var(--primary)] mt-0.5"></span>
              )}
            </Link>
            <Link 
              href="/contact" 
              className={`text-foreground hover:text-[var(--primary)] font-medium transition-colors relative ${
                pathname === '/contact' ? 'text-[var(--primary)]' : ''
              }`}
            >
              <span>Contact</span>
              {pathname === '/contact' && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[var(--primary)] mt-0.5"></span>
              )}
            </Link>
            <Link 
              href="/catalog" 
              className="btn-primary hover:scale-105 transition-transform"
            >
              Bekijk Producten
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Sluit menu' : 'Open menu'}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 space-y-4 flex flex-col slide-in-right">
            <Link 
              href="/" 
              className={`text-foreground hover:text-[var(--primary)] font-medium transition-colors px-2 py-2 rounded-md hover:bg-gray-100 ${
                pathname === '/' ? 'text-[var(--primary)] bg-gray-50' : ''
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/catalog" 
              className={`text-foreground hover:text-[var(--primary)] font-medium transition-colors px-2 py-2 rounded-md hover:bg-gray-100 ${
                pathname === '/catalog' ? 'text-[var(--primary)] bg-gray-50' : ''
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Catalogus
            </Link>
            <Link 
              href="/contact" 
              className={`text-foreground hover:text-[var(--primary)] font-medium transition-colors px-2 py-2 rounded-md hover:bg-gray-100 ${
                pathname === '/contact' ? 'text-[var(--primary)] bg-gray-50' : ''
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <Link 
              href="/catalog" 
              className="btn-primary text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Bekijk Producten
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
} 