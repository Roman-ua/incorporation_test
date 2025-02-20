const flowbite = require('flowbite-react/tailwind');
/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/react-tailwindcss-datepicker/dist/index.esm.js',
    flowbite.content(),
  ],
  theme: {
    extend: {
      colors: {
        inputBackground: '#ffffff',
        mainBackground: '#fcfcfc',
        mainBlue: '#0277ff',
        sideBarBlue: '#005ab2',
      },
      keyframes: {
        'check-bounce': {
          '0%': { transform: 'scale(0) translateZ(0)' },
          '50%': { transform: 'scale(1.2) translateZ(20px)' },
          '80%': { transform: 'scale(0.9) translateZ(5px)' },
          '100%': { transform: 'scale(1) translateZ(0)' },
        },
      },
      animation: {
        'check-bounce':
          'check-bounce 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
    },
  },
  plugins: [flowbite.plugin()],
};
