/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.{html,js}",
    "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {},
     colors: {
      'white': '#ffffff',
      'night': '#030b12',
      'midnight': '#030d14', //black
      'forest': '#25ce6c', //green, charts and calendar
      'cloudy': { //gray
        50: '#e7eaec',
        100: '#ecebff',
        200: ' #8a8a8c', //calender
        300: '#bdbfc0',
        400: '#454c53', //dark gray
        500: '#4e555a',
        600: '#b0b3b4',
      },
      'lake': { //blue
        50: '#c2ccd4',
        100: '#ecf6fe', //sections background
        200: '#5bafed', //hover li, progressbar
        300: '#5aafed', //ticket svg
      }, 
      'lavender': '#adabed', //purple
      'bubble-gum': { 
        100: '#ff80a9', //btn
        200: '#ff739f', //btn-hover
        300: '#ff749f', //chart
        400: '#ffb8cf', //non-active btn
      },
      'sunshine': '#fecc31', //yellow, charts,
      'cherry': '#ee657a',
      
    },
  },
  plugins: [
        require('flowbite/plugin')
    ],
}

