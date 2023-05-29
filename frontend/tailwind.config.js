/** @type {import('tailwindcss').Config} */
export default {
  content: [ './index.html',
    './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#348371',
        secondary: '#333333',
        primaryDark: '#245c4f',
        primaryLight: '#71a89c',
        secondaryDark: '#1e1e1e',
        secondaryLight: '#4f4f4f',
        accent: '#bfa5d0',
        danger: '#FF4136',
        success: '#4CAF50',
        info: '#2196F3',
        warning: '#FFC107'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif']
      },
      fontSize: {
        'xs': '0.512rem',
        'sm': '0.64rem',
        'base': '1rem',
        'lg': '1.25rem',
        'xl': '1.563rem',
        '2xl': '1.953rem',
        '3xl': '2.441rem',
        '4xl': '3.052rem',
        '5xl': '3.815rem',
        '6xl': '4.768rem'
      }
    }
    
  },
  plugins: []
};

