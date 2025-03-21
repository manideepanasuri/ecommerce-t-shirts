/** @type {import('tailwindcss').Config} */

import tempp from 'flowbite/plugin'
export default {
  darkMode: 'selector',
  content: ['./src/**/*.{html,js,jsx}', './index.html'],
  theme: {
    extend: {},
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
  },
  plugins: [tempp],
};
