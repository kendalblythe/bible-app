/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    screens: {
      sm: '512px',
      md: '624px',
      lg: '736px',
    },
  },
  plugins: [require('daisyui'), require('tailwindcss-flip')],
};
