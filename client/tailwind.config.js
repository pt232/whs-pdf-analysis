const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  purge: [],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        "thenex-blue": "#1268b0",
        "thenex-gray": {
          light: "#cacaca",
          DEFAULT: "#959595",
          dark: "#333333",
        },
      },
      fontFamily: {
        sans: ["Opens Sans", ...defaultTheme.fontFamily.sans],
        logo: ["Days One", defaultTheme.fontFamily.sans],
      },
      backgroundImage: {
        "dropzone-pattern": "url('/src/images/pattern.png')",
      },
      animation: {
        "spin-slow": "spin 2s linear infinite",
      },
    },
  },
  variants: {
    extend: {
      translate: ["group-hover"],
      boxShadow: ["last"],
      borderWidth: ["hover", "last"],
    },
  },
  plugins: [],
};
