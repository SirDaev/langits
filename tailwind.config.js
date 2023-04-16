/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html"],
  theme: {
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }
    },
    extend: {
      colors: {
        'langits-bg': '#F0EDF3',
        'langits-black': '#333333',
        'langits-blue': '#3572A5',
        'langits-pink': '#C6538C',
        'langits-white': '#F5F5F5'
      },
      container: {
        center: true,
        padding: '1rem',
      },
      fontFamily: {
        firaSans: ['Fira Sans']
      }
    },
  },
  plugins: []
}