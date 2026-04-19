/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        gym: ['"Bebas Neue"', 'sans-serif'],
      },
      colors: {
        "fit-green": "#CCFF00",
        "fit-dark": "#0A0A0A",
      },
      keyframes: {
        slideIn: {
          "0%": { transform: "translateX(100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
      },
      animation: {
        slideIn: "slideIn 0.3s ease-out",
      },
    },
  },
  plugins: [],
}