/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: 'var(--sng-color-brand-primary)',
          'primary-hover': 'var(--sng-color-brand-primary-hover)',
          accent: 'var(--sng-color-brand-accent)',
          'accent-hover': 'var(--sng-color-brand-accent-hover)',
          cyan: 'var(--sng-color-brand-cyan)'
        },
        bg: {
          base: 'var(--sng-color-background-base)',
          surface: 'var(--sng-color-background-surface)',
          elevated: 'var(--sng-color-background-elevated)',
        },
        text: {
          primary: 'var(--sng-color-text-primary)',
          secondary: 'var(--sng-color-text-secondary)',
          muted: 'var(--sng-color-text-muted)',
          disabled: 'var(--sng-color-text-disabled)',
          inverse: 'var(--sng-color-text-inverse)',
        },
        border: {
          default: 'var(--sng-color-border-default)',
          subtle: 'var(--sng-color-border-subtle)',
          strong: 'var(--sng-color-border-strong)',
        },
        state: {
          info: 'var(--sng-color-state-info)',
          success: 'var(--sng-color-state-success)',
          warning: 'var(--sng-color-state-warning)',
          error: 'var(--sng-color-state-error)',
          'info-light': 'var(--sng-color-state-info-light, #e8f1f8)',
          'success-light': 'var(--sng-color-state-success-light, #d4edda)',
          'warning-light': 'var(--sng-color-state-warning-light, #fff3cd)',
          'error-light': 'var(--sng-color-state-error-light, #fde8e8)'
        }
      },
      fontFamily: {
        sans: ['var(--sng-font-sans)'],
        serif: ['var(--sng-font-serif)'],
        mono: ['var(--sng-font-mono)'],
      },
      borderRadius: {
        none: 'var(--sng-radius-none)',
        sm: 'var(--sng-radius-sm)',
        base: 'var(--sng-radius-base)',
        md: 'var(--sng-radius-md)',
        lg: 'var(--sng-radius-lg)',
        xl: 'var(--sng-radius-xl)',
        full: 'var(--sng-radius-full)',
      },
      boxShadow: {
        sm: 'var(--sng-shadow-raised)',
        md: 'var(--sng-shadow-floating)',
        focus: '0 0 0 3px rgba(18,117,181,0.3)',
      }
    },
  },
  plugins: [],
}
