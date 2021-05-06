module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    colors: {
      transparent: "transparent",
      white: "#ffffff",
      black: "#000000",
      "primary-lightest": "#d65770",
      "primary-lighter": "#d13f5c",
      "primary-light": "#cb2747",
      primary: "#C50F33",
      "secondary-lighter": "#355c93",
      "secondary-light": "#1b4786",
      secondary: "#023478",
      "grey-lighter": "#f9f9f9",
      "grey-light": "#f6f6f6",
      grey: "#f3f3f3 ",
      "grey-dark": "#ececec",
      "grey-darker": "#cac6c4",
      "grey-darkest": "#8c9ba5",
    },
  },
  variants: ["responsive", "group-hover", "hover", "focus", "last"],
  plugins: [],
};
