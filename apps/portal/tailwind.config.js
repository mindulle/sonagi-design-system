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
        mds: {
          dark: 'var(--mds-color-background-base, #12151d)',
          card: 'var(--mds-color-background-surface, #1b202c)',
          surface: 'var(--mds-color-background-elevated, #242b3b)',
          border: 'var(--mds-color-border-default, #2c3547)',
          'border-subtle': 'var(--mds-color-border-subtle, #1f2635)',
          dandelion: 'var(--mds-color-brand-primary, #ffc837)',
          gold: 'var(--mds-color-brand-accent, #ffd166)',
          rain: '#4A90E2',
          cyan: '#00ffcc',
          muted: 'var(--mds-color-text-muted, #64748b)',
        },
        sng: {
          dark: 'var(--sng-color-background-base, #12151d)',
          card: 'var(--sng-color-background-surface, #1b202c)',
          surface: 'var(--sng-color-background-elevated, #242b3b)',
          border: 'var(--sng-color-border-default, #2c3547)',
          'border-subtle': 'var(--sng-color-border-subtle, #1f2635)',
          dandelion: 'var(--sng-color-brand-primary, #ffc837)',
          gold: 'var(--sng-color-brand-accent, #ffd166)',
          rain: '#4A90E2',
          cyan: '#00ffcc',
          burgundy: '#47211b',
          rose: '#d2645f',
          muted: 'var(--sng-color-text-muted, #64748b)',
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

