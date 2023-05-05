const { fontFamily } = require('tailwindcss/defaultTheme');
const { colors } = require('tailwindcss/colors');
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{html,js,ts,tsx}"],
  theme: {
    container:{
      center:true,
      padding:'1.5rem',
      screens: {
        '2xl': '1360'
      }
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', ...fontFamily.sans],
     },
     colors: {
      ...colors, 
      'light-gold' : '#f5bc51',
      'dark-gold'  :  '#533519',

     }
    }
  },
  plugins: [
    require('@tailwindcss-animate'),
    require('@tailwindcss/typography')
  ],
}