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
        accent: '#9984a6',
        accentDark: '#655c74',
        accentLight: '#bfa5d0',
        danger: '#FF4136',
        dangerDark: '#cc342b',
        dangerLight: '#ff675e',
        success: '#4CAF50',
        successDark: '#3d8c40',
        successLight: '#70bf73',
        info: '#2196F3',
        infoDark: '#1a78c2',
        infoLight: '#4dabf5',
        warning: '#FFC107',
        warningDark: '#cc9a06',
        warningLight: '#ffcd39',
        cwhite: '#F7F7F7',
        cblack: '#1e1e1e'
      },
      
      fontFamily: {
        sans: ['Inter', 'sans-serif']
      },
      fontSize: {
        'xs': '0.512rem',
        'sm': '0.64rem',
        'md': '0.8rem',
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

