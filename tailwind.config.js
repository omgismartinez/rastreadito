const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './ui/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        _primary: '#00E99E',
        _primaryLight: '#DDFCF2',
        _white: '#FFFFFF',
        _dark: '#1B1B1B',
        _darkText: '#333333',
        _gray: '#F0F0F0',
        _grayText: '#8D8D8D',
        _grayTextLight: '#B3B3B3',
        _grayTextDisabled: '#E0E0E0',
        _grayBorder: '#C5C5C5',
      },
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans],
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
        blur: {
          '0%': { filter: 'blur(0)' },
          '20%': { filter: 'blur(0)' },
          '30%': { filter: 'blur(4px)' },
          '90%': { filter: 'blur(4px)' },
          '100%': { filter: 'blur(0px)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'blur': 'blur 6s infinite ease-in-out',
      },
      transitionDelay: {
        '2000': '2000ms',
        '4000': '4000ms',
      }
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    require('tailwind-scrollbar')({ nocompatible: true }),
    require('@tailwindcss/line-clamp'),
  ],
}