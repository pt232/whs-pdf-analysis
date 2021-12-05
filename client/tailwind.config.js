const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        "thenex-blue": "#1268b0",
        "thenex-gray": {
          DEFAULT: "#959595",
          dark: "#333333",
        },
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
    extend: {
      translate: ["group-hover"],
      boxShadow: ["last"],
      borderWidth: ["hover", "last"],
    },
  },
  plugins: [],
};
