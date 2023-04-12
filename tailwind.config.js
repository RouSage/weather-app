const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-open-sans)", ...fontFamily.sans],
        merriweather: ["var(--font-merriweather)", ...fontFamily.serif],
        roboto: ["var(--font-roboto-slab)", ...fontFamily.serif],
      },
      colors: {
        main: "#076969",
        error: "#f16051",
        "dark-green": "#3a8100",
        "light-green": "#7fca40",
      },
    },
  },
  plugins: [],
};
