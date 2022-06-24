const colors = require("tailwindcss/colors");

module.exports = {
  mode: "jit",
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./pages/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    fontSmoothing: ["hover", "focus"],
    fontSize: {
      xs: ".75rem",
      sm: ".875rem",
      tiny: ".875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "4rem",
      "7xl": "5rem",
    },
    fontWeight: {
      "extra-light": 100,
      light: 300,
      normal: 400,
      medium: 500,
      bold: 700,
      "extra-bold": 800,
      black: 900,
    },
    letterSpacing: {
      tightest: "-.075em",
      tighter: "-.05em",
      normal: "0",
      wider: ".05em",
      widest: ".25em",
    },
    fontFamily: {
      sans: ["Roboto", "Helvetica", "Arial", "sans-serif"],
      serif: ["Merriweather", "serif"],
      Inter: ["Inter", "sans-serif"],
      Montserrat: ["Montserrat", "sans-serif"],
    },
  },

  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/line-clamp"),
  ],
};
