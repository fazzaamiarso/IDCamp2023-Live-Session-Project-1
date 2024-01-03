/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        nunito: ["nunito", "sans-serif"],
      },
      colors: {
        baseText: "#111517",
        baseInput: "#858585",
        baseBg: "#FAFAFA",
        darkBg: "#202C37",
        darkElement: "#2B3945",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
