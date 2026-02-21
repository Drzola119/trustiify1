import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#050810",
        foreground: "#FFFFFF",
        brand: {
          cyan: '#00D4FF',
          teal: '#00F5A0',
          purple: '#8B5CF6',
          pink: '#EC4899',
        },
        bg: {
          primary: '#050810',
          secondary: '#0A0E1A',
          card: '#0D1225',
        },
        text: {
          primary: '#FFFFFF',
          secondary: '#94A3B8',
          muted: '#475569',
        }
      },
      fontFamily: {
        heading: ['var(--font-clash)', 'sans-serif'],
        body: ['var(--font-inter)', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'monospace'],
      },
      animation: {
        'orb-1': 'orb-1 12s ease-in-out infinite',
        'orb-2': 'orb-2 10s ease-in-out infinite',
        'orb-3': 'orb-3 8s ease-in-out infinite',
        'shimmer': 'shimmer 3s infinite',
        'scroll-dot': 'scroll-dot 1.5s ease-in-out infinite',
        'marquee': 'marquee 30s linear infinite',
      },
      keyframes: {
        'orb-1': {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(60px, -40px) scale(1.1)' },
          '66%': { transform: 'translate(-40px, 60px) scale(0.9)' },
        },
        'orb-2': {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(-60px, 40px) scale(0.9)' },
          '66%': { transform: 'translate(40px, -60px) scale(1.1)' },
        },
        'orb-3': {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(30px, 30px) scale(1.05)' },
        },
        'shimmer': {
          '0%': { transform: 'translateX(-100%) skewX(-15deg)' },
          '100%': { transform: 'translateX(200%) skewX(-15deg)' },
        },
        'scroll-dot': {
          '0%, 100%': { transform: 'translateY(0)', opacity: '1' },
          '50%': { transform: 'translateY(12px)', opacity: '0' },
        },
        'marquee': {
          'from': { transform: 'translateX(0)' },
          'to': { transform: 'translateX(-50%)' },
        }
      }
    },
  },
  plugins: [],
};
export default config;
