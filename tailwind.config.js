/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      'purple-dark': '#150F2E',
      'pwhite' : '#FDF0D5',
      'pred': '#F0544F'
    },
    fontFamily: {
      sans: ['Raleway', 'sans-serif'],
      serif: ['Raleway', 'serif'],
    },
    boxShadow: {
      'face': '0 0 0 3px #139df2 inset;'
    },
    extend: {
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      colors: {
        'purple-dark': '#150F2E',
      }
    }
  },
  plugins: [],
}
