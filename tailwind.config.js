/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html"],
  theme: {
    extend: {
      colors: {
        'langits-bg': '#F0EDF3'
      },
      container: {
        center: true,
        padding: '1rem',
      },
      fontFamily: {
        oldenburg: ['Fira Sans']
      }
    },
  },
  plugins: []
}