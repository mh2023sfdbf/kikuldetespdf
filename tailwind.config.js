/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: 'rgb(var(--accent) / <alpha-value>)',
          hover: 'rgb(var(--accent-hover) / <alpha-value>)',
          muted: 'rgb(var(--accent) / 0.12)',
        },
        pop: {
          DEFAULT: 'rgb(var(--pop) / <alpha-value>)',
          hover: 'rgb(var(--pop-hover) / <alpha-value>)',
          muted: 'rgb(var(--pop) / 0.2)',
        },
        coolGray: {
          200: '#e5e7eb',
          300: '#d1d5db',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
      },
      borderWidth: {
        3: '3px',
      },
      fontFamily: {
        sans: ['var(--font-sans)'],
        heading: ['var(--font-sans)'],
      },
      fontSize: {
        'display': ['2.75rem', { lineHeight: '1.1', letterSpacing: '-0.03em' }],
        'display-lg': ['3.5rem', { lineHeight: '1.08', letterSpacing: '-0.03em' }],
        'heading-1': ['1.75rem', { lineHeight: '1.25', letterSpacing: '-0.02em' }],
        'heading-2': ['1.375rem', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
        'heading-3': ['1.125rem', { lineHeight: '1.35' }],
        'body': ['1rem', { lineHeight: '1.62' }],
        'body-lg': ['1.125rem', { lineHeight: '1.6' }],
        'body-sm': ['0.875rem', { lineHeight: '1.5' }],
        'caption': ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.06em' }],
      },
      fontWeight: {
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
      boxShadow: {
        glass: '0 8px 32px rgb(0 0 0 / 0.06)',
        'glass-lg': '0 24px 48px rgb(0 0 0 / 0.08)',
        soft: '0 2px 12px rgb(0 0 0 / 0.04)',
        'accent-soft': '0 4px 20px rgb(var(--accent) / 0.25)',
        calm: '0 20px 50px rgba(0, 0, 0, 0.08)',
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.25rem',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
