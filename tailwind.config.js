/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        mainGreen: "#00726B",
        secondaryGreen: "#38B68D",
      },
    },
  },
  plugins: [],
}

