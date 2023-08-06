/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: "Inter"
      },
      colors: {
        primary: "#F20BB3"
      },
      screens: {
        'xs': '400px',
      },
    },
  },
  plugins: [],
}

