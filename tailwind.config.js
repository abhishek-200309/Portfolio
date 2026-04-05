/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0d0f14',
        surface: '#13161e',
        surface2: '#1a1e2a',
        border: '#252a38',
        accent: '#4ff7b0',
        accent2: '#7b6cff',
        accent3: '#ff6b6b',
        text: '#e8eaf0',
        'text-muted': '#6b7394',
        'text-dim': '#3d4460',
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
