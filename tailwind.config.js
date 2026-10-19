/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0B1730',
          50: '#e8eaf0',
          100: '#c5cbda',
          200: '#9fa9c2',
          300: '#7887aa',
          400: '#5a6d98',
          500: '#3c5386',
          600: '#2e4070',
          700: '#1e2e55',
          800: '#0f1d3c',
          900: '#0B1730',
        },
        teal: {
          DEFAULT: '#0D9488',
          50: '#e0f7f5',
          100: '#b3ece8',
          200: '#80dfda',
          300: '#4dd2cb',
          400: '#26c8bf',
          500: '#0D9488',
          600: '#0a7d73',
          700: '#07655c',
          800: '#044d45',
          900: '#02362f',
        },
        gold: {
          DEFAULT: '#E8AE45',
          50: '#fdf6e3',
          100: '#fae9b9',
          200: '#f5d98b',
          300: '#f1c95d',
          400: '#ecbc3b',
          500: '#E8AE45',
          600: '#d49a2f',
          700: '#b87e1e',
          800: '#9c6310',
          900: '#7a4a06',
        },
        surface: '#F5F7FA',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
