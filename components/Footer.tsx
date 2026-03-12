'use client';

import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  const socialLinks = [
    {
      label: 'Twitter / X',
      href: '#',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.254 5.622 5.91-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
    },
    {
      label: 'LinkedIn',
      href: '#',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
          <circle cx="4" cy="4" r="2"/>
        </svg>
      ),
    },
    {
      label: 'GitHub',
      href: '#',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
        </svg>
      ),
    },
  ];

  return (
    <footer id="footer" className="relative pt-20 pb-8 px-6 overflow-hidden">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(0,212,255,0.3)] to-transparent" />

      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(0,212,255,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="mb-5">
              <Image
                src="/logo.png"
                alt="CynoIA"
                width={110}
                height={36}
                className="h-8 w-auto object-contain"
              />
            </div>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6 max-w-xs">
              {t.footer.tagline}
            </p>
            {/* Social links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full border border-[var(--glass-border)] flex items-center justify-center text-[var(--text-secondary)] hover:border-[#8A2BE2] hover:text-[#8A2BE2] transition-all duration-300 hover:shadow-[0_0_12px_rgba(138,43,226,0.35)]"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(t.footer.links).map(([key, col]) => (
            <div key={key}>
              <h4 className="font-display font-700 text-sm tracking-[0.12em] uppercase text-white mb-5">
                {col.label}
              </h4>
              <ul className="space-y-3">
                {col.items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm text-[var(--text-secondary)] hover:text-[#8A2BE2] transition-colors duration-300 flex items-center gap-1.5 group"
                    >
                      <span className="w-0 group-hover:w-2 h-px bg-[#8A2BE2] transition-all duration-300" />
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[var(--glass-border)]">
          <p className="text-xs text-[var(--text-secondary)]">
            {t.footer.copyright}
          </p>
          <p className="text-xs text-[var(--text-secondary)]">
            Développé par{' '}
            <span className="font-display font-700" style={{ color: '#8A2BE2' }}>The IT Architect</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
