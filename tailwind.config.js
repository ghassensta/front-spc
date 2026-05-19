/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background : "#fff",
        primary: "#F9E6D0",
        secondary: "#b8955a"
      },
      fontFamily: {
        'bricolage': ['Bricolage Grotesque', 'sans-serif'],
        'roboto': ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
