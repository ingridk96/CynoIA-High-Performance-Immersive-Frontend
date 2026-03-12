'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '@/context/LanguageContext';

export default function CTASection() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const innerRef   = useRef<HTMLDivElement>(null);
  const btnRef     = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(innerRef.current,
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: innerRef.current, start: 'top 85%' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="cta" className="relative py-32 px-6 overflow-hidden">
      {/* Background nebula */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(0,212,255,0.07) 0%, rgba(123,47,190,0.06) 40%, transparent 70%)',
        }}
      />

      {/* Floating orbs */}
      <div
        className="absolute w-72 h-72 rounded-full top-10 -left-16 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(0,212,255,0.08), transparent 70%)',
          animation: 'float 8s ease-in-out infinite',
        }}
      />
      <div
        className="absolute w-48 h-48 rounded-full bottom-10 -right-10 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(245,166,35,0.08), transparent 70%)',
          animation: 'float 10s ease-in-out infinite 3s',
        }}
      />

      <div className="max-w-4xl mx-auto">
        <div
          ref={innerRef}
          className="animated-border-card rounded-3xl p-12 md:p-20 text-center opacity-0"
          style={{ borderRadius: '1.5rem' }}
        >
          {/* Title */}
          <h2 className="section-title text-[clamp(2rem,5vw,3.2rem)] text-white mb-6 leading-tight">
            {t.cta.title}
          </h2>
          <p className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto mb-12 leading-relaxed">
            {t.cta.subtitle}
          </p>

          {/* Main CTA button */}
          <div className="flex flex-col items-center gap-5">
            <a
              ref={btnRef}
              href="#"
              className="cyno-btn-primary px-10 py-5 rounded-full text-lg inline-flex items-center gap-3"
            >
              <span>{t.cta.button}</span>
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/15 text-sm">
                →
              </span>
            </a>

            <p className="text-sm text-[var(--text-secondary)] flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#00FF88]">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              {t.cta.note}
            </p>

            {/* Social proof avatars + rating */}
            <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 pt-8 border-t border-[rgba(0,212,255,0.1)] w-full justify-center">
              <div className="flex -space-x-2">
                {['A', 'K', 'M', 'S', 'O'].map((l, i) => (
                  <div
                    key={i}
                    className="w-9 h-9 rounded-full border-2 border-[var(--bg-primary)] flex items-center justify-center text-xs font-bold text-white"
                    style={{
                      background: ['#8A2BE2', '#B44FFF', '#00D4FF', '#33DDFF', '#5B21B6'][i],
                    }}
                  >
                    {l}
                  </div>
                ))}
              </div>
              <div className="text-sm text-[var(--text-secondary)]">
                <span className="text-white font-semibold">500+</span>{' '}
                {t.hero.trusted.replace('Déjà adopté par +500', '').replace('Already trusted by 500+', '')}
              </div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#F5A623">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                ))}
                <span className="text-sm text-[var(--text-secondary)] ml-1">5.0</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
