'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '@/context/LanguageContext';

export default function StatsSection() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const itemsRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const items = itemsRef.current?.querySelectorAll('.stat-item');
      if (items) {
        gsap.fromTo(items,
          { opacity: 0, y: 40, scale: 0.9 },
          {
            opacity: 1, y: 0, scale: 1,
            duration: 0.7, ease: 'back.out(1.5)', stagger: 0.12,
            scrollTrigger: { trigger: itemsRef.current, start: 'top 85%' },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [t]);

  const colors = ['#8A2BE2', '#B44FFF', '#00D4FF', '#33DDFF'];

  return (
    <section ref={sectionRef} className="relative py-20 px-6 overflow-hidden">
      {/* Glowing strip bg */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, rgba(0,212,255,0.03) 0%, rgba(123,47,190,0.05) 50%, rgba(245,166,35,0.03) 100%)',
          borderTop: '1px solid rgba(0,212,255,0.08)',
          borderBottom: '1px solid rgba(0,212,255,0.08)',
        }}
      />

      <div className="max-w-6xl mx-auto">
        <div
          ref={itemsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 md:divide-x md:divide-[rgba(0,212,255,0.1)]"
        >
          {t.stats.items.map((item, i) => (
            <div key={i} className="stat-item text-center px-6 opacity-0">
              <div
                className="font-display font-800 text-[clamp(2.4rem,5vw,3.5rem)] leading-none mb-2"
                style={{
                  background: `linear-gradient(135deg, ${colors[i]}, ${colors[i]}aa)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  filter: `drop-shadow(0 0 16px ${colors[i]}50)`,
                }}
              >
                {item.value}
              </div>
              <p className="text-sm text-[var(--text-secondary)] font-medium tracking-wide">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
