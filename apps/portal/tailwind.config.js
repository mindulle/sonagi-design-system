/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        sng: {
          dark: '#060911',
          card: '#090d16',
          surface: '#101524',
          border: '#1e2430',
          rain: '#4A90E2',
          cyan: '#00ffcc',
          dandelion: '#ffd166',
          burgundy: '#47211b',
          rose: '#d2645f',
          muted: '#8b949e',
        },
      },
      borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '12px',
      },
      borderWidth: {
        DEFAULT: '2px',
        2: '2px',
      },
      fontFamily: {
        sans: ['Inter', 'Pretendard', 'system-ui', 'sans-serif'],
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
      },
    },
  },
  plugins: [],
}

