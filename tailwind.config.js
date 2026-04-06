/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0f172a',
        surface: '#1e293b',
        surface2: '#334155',
        border: '#475569',
        accent: '#38bdf8',
        accent2: '#a78bfa',
        accent3: '#f472b6',
        text: '#f8fafc',
        'text-muted': '#cbd5e1',
        'text-dim': '#94a3b8',
      },
      fontFamily: {
        sans: ['Instrument Sans', 'sans-serif'],
        mono: ['DM Mono', 'monospace'],
        serif: ['DM Serif Display', 'serif'],
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulse2: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.5', transform: 'scale(0.8)' },
        },
        grow: {
          'from': { transform: 'scaleX(0)' },
          'to': { transform: 'scaleX(1)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '15%, 45%, 75%': { transform: 'translateX(-6px)' },
          '30%, 60%, 90%': { transform: 'translateX(6px)' },
        },
        fadeUp: {
          'from': { opacity: '0', transform: 'translateY(30px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        float: 'float 4s ease-in-out infinite',
        'float-delay1': 'float 4s ease-in-out -1.5s infinite',
        'float-delay2': 'float 4s ease-in-out -3s infinite',
        pulse2: 'pulse2 2s ease-in-out infinite',
        grow: 'grow 1.2s cubic-bezier(0.22,1,0.36,1) forwards',
        shake: 'shake 0.5s ease-in-out',
      },
    },
  },
  plugins: [],
}
