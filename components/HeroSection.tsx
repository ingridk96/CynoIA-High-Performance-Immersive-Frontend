'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useLanguage } from '@/context/LanguageContext';


export default function HeroSection() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const badgeRef     = useRef<HTMLDivElement>(null);
  const cynoiaRef    = useRef<HTMLDivElement>(null);
  const subtitleRef  = useRef<HTMLParagraphElement>(null);
  const btnsRef      = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl    = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl
        /* 1 – Badge slides down */
        .fromTo(
          badgeRef.current,
          { opacity: 0, y: -24, scale: 0.85 },
          { opacity: 1, y: 0, scale: 1, duration: 0.55 }
        )
        /* 2 – CynoIA brand word: dramatic scale + blur reveal */
        .fromTo(
          cynoiaRef.current,
          { opacity: 0, scale: 0.78, filter: 'blur(28px)', y: 20 },
          { opacity: 1, scale: 1, filter: 'blur(0px)', y: 0, duration: 1.0, ease: 'expo.out' },
          '-=0.15'
        )
        /* 3 – Subtitle */
        .fromTo(
          subtitleRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.55 },
          '-=0.3'
        )
        /* 6 – Buttons */
        .fromTo(
          btnsRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5 },
          '-=0.3'
        )
;
    }, containerRef);

    return () => ctx.revert();
  }, [t]);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Subtle grid overlay */}
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />

      {/* Deep violet radial glow behind knot */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-[900px] h-[900px] rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(138,43,226,0.10) 0%, rgba(138,43,226,0.04) 45%, transparent 70%)',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-32 pb-24">

        {/* Glass backdrop — dark in dark mode, frosted-lavender in light mode */}
        <div className="hero-backdrop absolute inset-x-0 top-24 bottom-0 rounded-3xl pointer-events-none" />

        {/* ── Badge ───────────────────────────────────────────────── */}
        <div ref={badgeRef} className="inline-flex items-center gap-2 mb-6 opacity-0">
          <div className="animated-border-card px-5 py-2 rounded-full flex items-center gap-2.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-70" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D4AF37]" />
            </span>
            <span className="font-display text-[11px] font-700 tracking-[0.22em] uppercase"
                  style={{ color: '#D4AF37' }}>
              {t.hero.badge}
            </span>
          </div>
        </div>

        {/* ── Title block ─────────────────────────────────────────── */}
        <div className="mb-8">

          {/* Line 1 — CynoIA (giant shimmer brand word) */}
          <div ref={cynoiaRef} className="opacity-0 mb-2">
            <h1
              className="font-display hero-brand-text select-none"
              style={{ fontSize: 'clamp(5rem, 14vw, 11rem)', fontWeight: 800 }}
            >
              {t.hero.title1}
            </h1>
          </div>

        </div>

        {/* ── Subtitle ────────────────────────────────────────────── */}
        <p
          ref={subtitleRef}
          className="opacity-0 max-w-xl mx-auto leading-relaxed mb-10"
          style={{
            fontSize: 'clamp(0.95rem, 1.8vw, 1.1rem)',
            color: 'var(--text-secondary)',
            letterSpacing: '0.01em',
          }}
        >
          {t.hero.subtitle}
        </p>

        {/* ── Buttons ─────────────────────────────────────────────── */}
        <div
          ref={btnsRef}
          className="opacity-0 flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
        >
          <a
            href="#cta"
            className="cyno-btn-primary px-9 py-4 rounded-full font-display font-700 text-[0.95rem] tracking-wide w-full sm:w-auto text-center"
          >
            {t.hero.cta_primary}
            <span className="ml-2.5 text-[#D4AF37]">→</span>
          </a>
          <a
            href="#features"
            className="cyno-btn-secondary px-9 py-4 rounded-full font-display font-600 text-[0.95rem] w-full sm:w-auto text-center flex items-center justify-center gap-2.5"
          >
            <span
              className="w-7 h-7 rounded-full flex items-center justify-center text-[11px]"
              style={{ border: '1px solid rgba(180,79,255,0.5)' }}
            >
              ▶
            </span>
            {t.hero.cta_secondary}
          </a>
        </div>

      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
        style={{ background: 'linear-gradient(to top, var(--bg-primary) 0%, transparent 100%)' }}
      />

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce opacity-60">
        <span className="text-[10px] tracking-[0.25em] uppercase" style={{ color: 'var(--text-secondary)', opacity: 0.6 }}>
          Scroll
        </span>
        <div className="w-px h-8" style={{ background: 'linear-gradient(to bottom, #D4AF37, transparent)' }} />
      </div>
    </section>
  );
}
