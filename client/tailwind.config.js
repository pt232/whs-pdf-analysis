const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  purge: [],
  darkMode: "media",
  theme: {
    extend: {
      colors: {
        "thenex-blue": "#1268b0",
        "thenex-gray": {
          light: "#cacaca",
          DEFAULT: "#959595",
          dark: "#333333",
        },
        darkmode: {
          lighter: "#f3f4f6",
          light: "#999999",
          DEFAULT: "#363636",
          dark: "#212121",
          darker: "#181818",
        },
      },
      fontFamily: {
        sans: ["Opens Sans", ...defaultTheme.fontFamily.sans],
        logo: ["Days One", defaultTheme.fontFamily.sans],
      },
      backgroundImage: {
        "dropzone-pattern": "url('/src/images/pattern.png')",
        "dropzone-pattern-dark": "url('/src/images/pattern-darkmode.png')",
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
      backgroundImage: ["dark"],
    },
  },
  plugins: [],
};
