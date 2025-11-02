/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#6D28D9', // primary brand purple
          light: '#A78BFA',
          dark: '#5B21B6'
        }
      }
    },
  },
  plugins: [],
};
