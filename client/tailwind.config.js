const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  purge: [],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        "thenex-blue": "#1268b0",
        "thenex-gray": "#959595",
      },
      fontFamily: {
        sans: ["Opens Sans", ...defaultTheme.fontFamily.sans],
      },
      backgroundImage: {
        "dropzone-pattern": "url('/src/images/pattern.png')",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
