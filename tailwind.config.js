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
        //Background Colors
        'black-bg': '#050505',
        'gray-bg': '#2d2d2d',

        //Text colors
        'white-text': '#e4e4e4',
        'dim-text': '#b4b4b4',
        'dimmest-text': '#9fa1a2',

        //Highlight colors
        'lt-blue-hl': '#88d7ec',
        'lr-blue-hl': '#296b85',
        'blue-hl': '#2f5668',
        'maroon-hl': '#822301'
      },
    },
  },
  plugins: [],
}

