/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#38bdf8',
        secondary: '#818cf8',
        dark: '#0f172a',
      },
      borderRadius: {
        '2xl': '1.5rem',
      }
    },
  },
  plugins: [],
}
