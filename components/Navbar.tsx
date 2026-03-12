'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useLanguage } from '@/context/LanguageContext';

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: t.nav.features, href: '#features' },
    { label: t.nav.solutions, href: '#value' },
    { label: t.nav.about, href: '#footer' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'glass border-b border-[rgba(138,43,226,0.15)] py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center group">
          <div className="relative flex items-center justify-center h-10 px-3 py-1 rounded-xl transition-all duration-300 group-hover:drop-shadow-[0_0_14px_rgba(138,43,226,0.7)] dark:bg-white">
            <Image
              src="/logo.png"
              alt="CynoIA"
              width={120}
              height={32}
              className="h-8 w-auto object-contain"
              priority
            />
          </div>
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-[var(--text-secondary)] hover:text-[#8A2BE2] transition-colors duration-300 relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#8A2BE2] group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3">
          {/* Language Toggle */}
          <button
            onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold font-display tracking-widest border border-[rgba(138,43,226,0.25)] text-[var(--text-secondary)] hover:border-[rgba(138,43,226,0.6)] hover:text-[#8A2BE2] transition-all duration-300"
            aria-label="Toggle language"
          >
            <span className={language === 'fr' ? 'text-[#8A2BE2]' : 'text-[var(--text-secondary)]'}>FR</span>
            <span className="text-[rgba(138,43,226,0.35)]">|</span>
            <span className={language === 'en' ? 'text-[#8A2BE2]' : 'text-[var(--text-secondary)]'}>EN</span>
          </button>

          {/* Theme Toggle */}
          {mounted && (
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="w-9 h-9 rounded-full border border-[rgba(138,43,226,0.25)] flex items-center justify-center text-[var(--text-secondary)] hover:border-[rgba(138,43,226,0.6)] hover:text-[#8A2BE2] transition-all duration-300"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="5"/>
                  <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
              )}
            </button>
          )}

          {/* CTA Button */}
          <a
            href="#cta"
            className="hidden sm:inline-flex cyno-btn-primary px-5 py-2 rounded-full text-sm cursor-pointer"
          >
            {t.nav.cta}
          </a>

          {/* Mobile menu button */}
          <button
            className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span className={`block w-5 h-0.5 bg-[#8A2BE2] transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-5 h-0.5 bg-[#8A2BE2] transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-0.5 bg-[#8A2BE2] transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-500 overflow-hidden ${
          menuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="glass border-t border-[rgba(138,43,226,0.15)] px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-sm font-medium text-[var(--text-secondary)] hover:text-[#8A2BE2] transition-colors py-1"
            >
              {link.label}
            </a>
          ))}
          <div className="flex items-center gap-3 pt-2 border-t border-[rgba(138,43,226,0.15)]">
            <button
              onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')}
              className="text-xs font-semibold font-display tracking-widest text-[#8A2BE2]"
            >
              {language === 'fr' ? 'FR → EN' : 'EN → FR'}
            </button>
            <a href="#cta" className="cyno-btn-primary px-4 py-1.5 rounded-full text-sm ml-auto">
              {t.nav.cta}
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
