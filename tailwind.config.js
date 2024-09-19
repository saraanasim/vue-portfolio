/** @type {import('tailwindcss').Config} */
export default {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  content: [],
  theme: {
    extend: {
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
      },
      fontWeight: {
        regular: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extrabold: 800,
        black: 900,
      },
      colors: {
        // Neutral Colors
        'gray-nurse': '#f2f3f2',
        'aztec': '#080f11',
        'outer-space': '#283839',
        'finlandia': '#5e625e',

        // Primary Colors
        'eastern-blue': '#24b1b1',
        'denim': '#1373ab',
        
        // Accent Colors
        'cinnabar': '#e65935',
        'atoll': '#0b6570',

        // Background Colors
        'elephant-dark': '#0b2a38',
        'elephant-light': '#144759',
      },
    },
  },
  plugins: [],
}

