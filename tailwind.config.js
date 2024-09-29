/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      keyframes: {
        popOut: {
          '0%': { opacity: '0' },
          '100%': { opacity: '0.5' },
        }
      },
      animation: {
        popOut: 'popOut 0.5s ease-in-out'
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}
