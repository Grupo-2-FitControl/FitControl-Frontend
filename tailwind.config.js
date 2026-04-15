/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "fit-green": "#CCFF00",
        "fit-dark": "#0A0A0A",
      },
    },
  },
  plugins: [],
}