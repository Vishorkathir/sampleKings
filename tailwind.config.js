/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html','./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: 'oklch(0.16 0.02 260)',
        muted: 'oklch(0.56 0.03 260)',
        paper: 'oklch(1 0 0)',
        surface: 'oklch(0.985 0.01 255)',
        primary: 'oklch(0.52 0.20 260)',
        accent: 'oklch(0.84 0.18 158)',
        warm: 'oklch(0.72 0.18 45)',
        border: 'oklch(0.92 0.02 260)',
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"','system-ui','sans-serif'],
        sans: ['"Manrope"','system-ui','sans-serif'],
      },
      borderRadius: { sm: '8px', md: '12px', lg: '16px' },
      boxShadow: {
        sm: '0 1px 2px oklch(0.16 0.02 260 / 0.08)',
        md: '0 4px 12px oklch(0.16 0.02 260 / 0.10)',
      },
      animation: {
        'float-slow': 'float-slow 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
