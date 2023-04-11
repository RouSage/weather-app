const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-open-sans)", ...fontFamily.sans],
        merriweather: ["var(--font-merriweather)", ...fontFamily.sans],
        roboto: ["var(--font-roboto-slab)", ...fontFamily.sans],
      },
    },
  },
  plugins: [],
};
