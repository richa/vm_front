const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: [
    './src/**/*.html',
    './src/**/*.js',
  ],
  darkMode: false,
  theme: {
    colors: {
      primary: '#F5DF4D',
      primaryDark: '#FFD60A',
      secondary: '#003566',
      secondaryDark: '#001D3D',
      gray: '#939597',
      grayDark: '#555657',
      grayLight: '#f8fafa',
      white: '#ffffff',
      offWhite: '#efefef',
      black: '#000814',
      error: '#e06b75',
    },
    minHeight: {
     '0': '0',
     '1/5': '20%',
     '2/5': '40%',
     '3/5': '60%',
     '4/5': '80%',
     'full': '100%',
     'screen-7/10': '70vh',
     'screen': '100vh',
    },
    minWidth: {
     '0': '0',
     '1/5': '20%',
     '2/5': '40%',
     '3/5': '60%',
     '4/5': '80%',
     'full': '100%',
     'screen': '100vh',
    },
    letterSpacing: {
      wide: '.05em',
      wider: '.15em',
      widest: '.25em',
    },
    extend: {
      fontSize: {
        'xs': '13px',
        '2xl': '30px',
        '3xl': '35px',
        '4xl': '40px',
        '5xl': '45px',
        '6xl': '50px',
        '7xl': '55px',
        'semi': '85px',
        'full': '150px',
      },
      width: {
        '100': '28rem',
        '112': '32rem',
        '128': '36rem',
        '4/7': '60%',
      },
      height: {
        '100': '28rem',
        '112': '32rem',
        '128': '36rem',
      }
    },
  },
  variants: {},
  plugins: [],
}
