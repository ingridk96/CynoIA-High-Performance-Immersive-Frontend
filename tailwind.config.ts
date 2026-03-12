import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './context/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#03060E',
          900: '#0A0F1E',
          800: '#0D1526',
          700: '#131E35',
          600: '#1A2845',
          500: '#243358',
        },
        cyan: {
          cyno: '#00D4FF',
          dim: '#00A8CC',
          bright: '#33DDFF',
        },
        gold: {
          cyno: '#F5A623',
          dim: '#D48B0A',
          bright: '#FFB845',
        },
        neon: {
          cyno: '#00FF88',
          dim: '#00CC6A',
        },
        violet: {
          cyno: '#8A2BE2',
          light: '#B44FFF',
          bright: '#C084FC',
          deep: '#5B21B6',
        },
      },
      fontFamily: {
        display: ['var(--font-syne)', 'Syne', 'sans-serif'],
        body: ['var(--font-space)', 'Space Grotesk', 'sans-serif'],
      },
      fontWeight: {
        '300': '300',
        '400': '400',
        '500': '500',
        '600': '600',
        '700': '700',
        '800': '800',
        '900': '900',
      },
      animation: {
        'pulse-glow': 'pulse-glow 2.5s ease-in-out infinite',
        'pulse-glow-gold': 'pulse-glow-gold 2.5s ease-in-out infinite 0.8s',
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite 2s',
        'spin-slow': 'spin 10s linear infinite',
        'border-run': 'border-run 3s linear infinite',
        shimmer: 'shimmer 2.5s linear infinite',
        'fade-up': 'fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'grid-pulse': 'grid-pulse 4s ease-in-out infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': {
            boxShadow:
              '0 0 20px rgba(0,212,255,0.4), 0 0 40px rgba(0,212,255,0.2), 0 0 80px rgba(0,212,255,0.1)',
          },
          '50%': {
            boxShadow:
              '0 0 40px rgba(0,212,255,0.8), 0 0 80px rgba(0,212,255,0.4), 0 0 120px rgba(0,212,255,0.2)',
          },
        },
        'pulse-glow-gold': {
          '0%, 100%': {
            boxShadow: '0 0 20px rgba(245,166,35,0.4), 0 0 40px rgba(245,166,35,0.2)',
          },
          '50%': {
            boxShadow: '0 0 40px rgba(245,166,35,0.8), 0 0 80px rgba(245,166,35,0.4)',
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-12px) rotate(1deg)' },
          '66%': { transform: 'translateY(-6px) rotate(-1deg)' },
        },
        'border-run': {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '200% 50%' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'grid-pulse': {
          '0%, 100%': { opacity: '0.03' },
          '50%': { opacity: '0.07' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
