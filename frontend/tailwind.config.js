const plugin = require('tailwindcss/plugin')

module.exports = {
  mode: 'jit',
  content: [
    "./src/components/**/*.{js,vue,ts}",
    "./src/layouts/**/*.vue",
    "./src/pages/**/*.vue",
    "./src/plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./src/**/*.{html,js}",
  ],
  plugins: [],
  theme: {
      screens: {
        xs: "320px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1782px",
        'msm': {'max': '639px'},
        'mmd': {'max': '767px'},
        'mlg': {'max': '1023px'},
        'mxl': {'max': '1279px'},
        'm2xl': {'max': '1535px'},
        '5xl': {'max': '2150px'},
    },
    extend: {
      colors: {
        'background': '#101820',
        'primary': '#FFFFFF',
        'secondary': '#B6E147',
        'accent': '#26D07C', //quantum green
        'container': '#1D252D',
        'card': '#1D252D',
        'card-light': '#121212',
        'pending': '#FED141', //Sunglow
        'caution': '#EAAA00', //gold
        'warning': '#8A2B2B', //ruby
        'highlight': '#41B6E6', //quantum blue
        'highlight-purple': '#39207C', //royal
        'quantum': '#26D07C',//quantum green
      },
      fontFamily: {
        'heading': ['Futura', 'Arial', 'sans-serif'],
        'main': ['Gilroy', 'Arial', 'sans-serif'],
        'body': ['Gilroy', 'Arial', 'sans-serif'],
      },
      gridTemplateColumns: {
        // Simple 16 column grid
        '16': 'repeat(16, minmax(0, 1fr))',
        '200-fit': 'repeat(auto-fill, minmax(120px, 1fr))',

        // Complex site-specific column configuration
        'footer': '200px minmax(900px, 1fr) 100px',
      },
      maxHeight: {
        '0': '0',
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
        'full': '100%',
       },
       zIndex: {
        '-1': '-1',
        '-2': '-2',
        '-3': '-3',
        '-10': '-10',
       },
       minWidth:{
        '96': '24rem'
      },
      padding: {
        '1/3': '33.333333%',
        '2/3': '66.666666%',
        '1/4': '25%',
      },
      fontSize: {
        'xxxs': '.3rem',
        'xxs': '.7rem'
      },
      keyframes: {
        'fade-in-down': {
          '0%': {
            opacity: '0',
            transform: 'translateY(-10px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          },
        },
        'fade-out-down': {
          'from': {
            opacity: '1',
            transform: 'translateY(0px)'
          },
          'to': {
            opacity: '0',
            transform: 'translateY(10px)'
          },
        },
        'fade-in-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(10px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          },
        },
        'fade-out-up': {
          'from': {
            opacity: '1',
            transform: 'translateY(0px)'
          },
          'to': {
            opacity: '0',
            transform: 'translateY(10px)'
          },
        },
        'rotate-y-axis': {
          'from': {
            transform: 'rotateY(0deg)',
          },
          'to': {
            transform: 'rotateY(180deg)',
          }
        }
      },
      animation: {
        'fade-in-down': 'fade-in-down 0.5s ease-out',
        'fade-out-down': 'fade-out-down 0.5s ease-out',
        'fade-in-up': 'fade-in-up 0.5s ease-out',
        'fade-out-up': 'fade-out-up 0.5s ease-out',
        'rotate-y-axis': 'rotate-y-axis 0.5s ease-in-out'
      },
    }
  },
  plugins: [
    require('@tailwindcss/typography'),],
}
