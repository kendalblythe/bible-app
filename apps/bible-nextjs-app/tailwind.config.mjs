import daisyui from 'daisyui';

const config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    screens: {
      sm: '512px',
      md: '624px',
      lg: '736px',
    },
  },
  plugins: [daisyui],
};

export default config;
