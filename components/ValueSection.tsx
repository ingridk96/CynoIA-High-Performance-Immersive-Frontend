'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '@/context/LanguageContext';

export default function ValueSection() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef   = useRef<HTMLDivElement>(null);
  const cardsRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: titleRef.current, start: 'top 85%' },
        }
      );

      const cards = cardsRef.current?.querySelectorAll('.value-card');
      if (cards) {
        gsap.fromTo(cards,
          { opacity: 0, y: 80, rotateX: 15 },
          {
            opacity: 1, y: 0, rotateX: 0,
            duration: 0.9, ease: 'power3.out', stagger: 0.15,
            scrollTrigger: { trigger: cardsRef.current, start: 'top 80%' },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [t]);

  return (
    <section ref={sectionRef} id="value" className="relative py-32 px-6 overflow-hidden">
      {/* Background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% 50%, rgba(123,47,190,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div ref={titleRef} className="text-center mb-20 opacity-0">
          <p className="text-xs tracking-[0.25em] uppercase font-display font-600 text-[#A855F7] mb-4">
            — Valeur —
          </p>
          <h2 className="section-title text-[clamp(2rem,5vw,3.5rem)] text-white mb-5">
            {t.value.title}
          </h2>
          <p className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto leading-relaxed">
            {t.value.subtitle}
          </p>
        </div>

        {/* Cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          style={{ perspective: '1200px' }}
        >
          {t.value.cards.map((card, i) => (
            <div
              key={i}
              className="value-card animated-border-card rounded-2xl p-8 group cursor-default opacity-0 hover:-translate-y-2 transition-transform duration-400"
              style={{ borderRadius: '1rem' }}
            >
              {/* Big stat number */}
              <div className="mb-6">
                <span
                  className="font-display font-800 text-[clamp(3rem,6vw,4.5rem)] leading-none"
                  style={{
                    background: `linear-gradient(135deg, ${card.color}, ${card.color}88)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    filter: `drop-shadow(0 0 20px ${card.color}60)`,
                  }}
                >
                  {card.stat}
                </span>
                <p
                  className="text-xs tracking-[0.2em] uppercase font-display font-600 mt-1"
                  style={{ color: card.color }}
                >
                  {card.statLabel}
                </p>
              </div>

              {/* Divider */}
              <div
                className="w-12 h-px mb-6 transition-all duration-500 group-hover:w-20"
                style={{ background: `linear-gradient(to right, ${card.color}, transparent)` }}
              />

              {/* Text */}
              <h3 className="font-display font-700 text-white text-xl mb-3">
                {card.title}
              </h3>
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                {card.description}
              </p>

              {/* Corner glow */}
              <div
                className="absolute top-0 right-0 w-24 h-24 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(circle at top right, ${card.color}18, transparent)` }}
              />
            </div>
          ))}
        </div>

        {/* Horizontal line separator */}
        <div className="mt-24 flex items-center gap-6">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[rgba(0,212,255,0.2)] to-transparent" />
          <div className="w-2 h-2 rounded-full bg-[#8A2BE2] animate-pulse" />
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[rgba(0,212,255,0.2)] to-transparent" />
        </div>
      </div>
    </section>
  );
}
