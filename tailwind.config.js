const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './public/index.html',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Open Sans', 'sans-serif'],
        serif: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      screens: {
        sm: '640px',
        // => @media (min-width: 640px) { ... }

        md: '768px',
        // => @media (min-width: 768px) { ... }

        lg: '1024px',
        // => @media (min-width: 1024px) { ... }

        xl: '1280px',
        // => @media (min-width: 1280px) { ... }

        xxl: '1536px',
        // => @media (min-width: 1536px) { ... }
      },
      boxShadow: {
        bottom:
          '0 5px 6px -7px rgba(0, 0, 0, 0.6), 0 2px 4px -5px rgba(0, 0, 0, 0.06)',
      },
      textColor: {
        metronicTextColor: '#00e5a5',
      },
      colors: {
        'gray-50': '#f9fafb', // light grey Background
        'gray-800': '#111827', // dark grey background

        'gray-300': '#d1d5db', // light grey for text in darkmode
        'gray-900': '#030712', // dark grey for text in lightmode

        'gray-400': '#9ca3af', // border grey for all
        'green-100': '#3bc48d', // metronix green for text and button
        'red-600': '#e02424', // metronix green

        a7abb0: '#d1d5db', // light grey
        '3bc48d': '#3bc48d', // green
        f15e5e: '#e02424', // red
        '2ac1c3': '#2ac1c3', // blue
      },
    },
  },
};
