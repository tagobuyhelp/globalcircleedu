/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#004e9a',
          light: '#60a5fa',
          dark: '#003d7a',
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#004e9a',
          600: '#003d7a',
          700: '#002c5a',
          800: '#001b3a',
          900: '#000a1a'
        },
        secondary: {
          DEFAULT: '#f37021',
          light: '#faa61a',
          dark: '#d85a0f',
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f37021',
          600: '#d85a0f',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12'
        },
        accent: {
          yellow: '#faa61a',
          orange: '#f37021',
          red: '#e11b22'
        }
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(to right, #004e9a, #f37021)',
        'gradient-secondary': 'linear-gradient(to right, #f37021, #faa61a)',
        'gradient-full': 'linear-gradient(to right, #004e9a, #f37021, #faa61a)'
      }
    }
  },
  plugins: []
};