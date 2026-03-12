'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '@/context/LanguageContext';

export default function FeaturesSection() {
  const { t } = useLanguage();
  const sectionRef   = useRef<HTMLElement>(null);
  const titleRef     = useRef<HTMLDivElement>(null);
  const gridRef      = useRef<HTMLDivElement>(null);

  /* ── Section card / title animations (language-dependent) ─────── */
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

      const cards = gridRef.current?.querySelectorAll('.feature-card');
      if (cards) {
        gsap.fromTo(cards,
          { opacity: 0, y: 60, scale: 0.92 },
          {
            opacity: 1, y: 0, scale: 1,
            duration: 0.7, ease: 'power3.out', stagger: 0.1,
            scrollTrigger: { trigger: gridRef.current, start: 'top 80%' },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [t]);


  const iconColors = ['#8A2BE2', '#B44FFF', '#00D4FF', '#33DDFF', '#8A2BE2', '#B44FFF'];

  return (
    <section ref={sectionRef} id="features" className="relative py-32 px-6">

      {/* Section glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #8A2BE2, transparent)' }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div ref={titleRef} className="text-center mb-20 opacity-0">
          <p className="text-xs tracking-[0.25em] uppercase font-display font-600 text-[#8A2BE2] mb-4">
            — Features —
          </p>
          <h2 className="section-title text-[clamp(2rem,5vw,3.5rem)] text-white mb-5">
            {t.features.title}
          </h2>
          <p className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto leading-relaxed">
            {t.features.subtitle}
          </p>
        </div>

        {/* Cards grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {t.features.items.map((item, i) => (
            <div
              key={i}
              className="feature-card glass-card rounded-2xl p-8 group cursor-default opacity-0"
            >
              {/* Icon */}
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-6 transition-transform duration-300 group-hover:scale-110"
                style={{
                  background: `linear-gradient(135deg, ${iconColors[i]}22, ${iconColors[i]}08)`,
                  border: `1px solid ${iconColors[i]}30`,
                }}
              >
                {item.icon}
              </div>

              {/* Content */}
              <h3
                className="font-display font-700 text-lg text-white mb-3 group-hover:transition-colors"
                style={{ '--hover-color': iconColors[i] } as React.CSSProperties}
              >
                {item.title}
              </h3>
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                {item.description}
              </p>

              {/* Bottom accent bar */}
              <div
                className="mt-6 h-px w-0 group-hover:w-full transition-all duration-500 rounded-full"
                style={{ background: `linear-gradient(to right, ${iconColors[i]}, transparent)` }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
