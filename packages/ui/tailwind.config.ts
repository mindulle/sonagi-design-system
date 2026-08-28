import type { Config } from 'tailwindcss'

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
          danger: 'var(--sng-color-state-danger)',
          'info-bg': 'var(--sng-color-state-info-bg, #e8f1f8)',
          'success-bg': 'var(--sng-color-state-success-bg, #d4edda)',
          'warning-bg': 'var(--sng-color-state-warning-bg, #fff3cd)',
          'danger-bg': 'var(--sng-color-state-danger-bg, #fde8e8)',
          /* v1.7 compat */
          error: 'var(--sng-color-state-danger)',
          'error-bg': 'var(--sng-color-state-danger-bg, #fde8e8)',
        }
      },
      fontFamily: {
        sans: ['var(--sng-font-sans)'],
        serif: ['var(--sng-font-serif)'],
        mono: ['var(--sng-font-mono)'],
      },
      spacing: {
        'sng-gap-xs': 'var(--sng-space-gap-xs)',
        'sng-gap-sm': 'var(--sng-space-gap-sm)',
        'sng-gap-item': 'var(--sng-space-gap-item)',
        'sng-gap-group': 'var(--sng-space-gap-group)',
        'sng-gap-section': 'var(--sng-space-gap-section)',
        'sng-container-sm': 'var(--sng-space-container-sm)',
        'sng-container-md': 'var(--sng-space-container-md)',
        'sng-container-lg': 'var(--sng-space-container-lg)',
        'sng-container-page': 'var(--sng-space-container-page)',
        'sng-element-py': 'var(--sng-space-element-py)',
        'sng-element-px': 'var(--sng-space-element-px)',
      },
      borderRadius: {
        none: 'var(--sng-radius-none)',
        sm: 'var(--sng-radius-sm)',
        md: 'var(--sng-radius-md)',
        lg: 'var(--sng-radius-lg)',
        xl: 'var(--sng-radius-xl)',
        full: 'var(--sng-radius-full)',
      },
      boxShadow: {
        sm: 'var(--sng-shadow-raised)',
        md: 'var(--sng-shadow-floating)',
        focus: 'var(--sng-shadow-focus)',
      },
      opacity: {
        'sng-hover': 'var(--sng-opacity-hover)',
        'sng-pressed': 'var(--sng-opacity-pressed)',
        'sng-disabled': 'var(--sng-opacity-disabled)',
        'sng-overlay': 'var(--sng-opacity-overlay)',
      }
    },
  },
  plugins: [],
}
