module.exports = {
  purge: { enabled: false, content: ["./views/**/*.ejs"] },
  darkMode: false,
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "ui-sans-serif", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto"],
      },
      colors: {
        primary: {
          light: "#c7d5f8",
          DEFAULT: "#7494ec",
        },
        secondary: "#5874c6",
        neutral: {
          light: "#f8fbff",
          DEFAULT: "#f2f7ff",
        },
        gray: {
          light: "#8b98bb",
          DEFAULT: "#69779B",
        },
        success: {
          light: "#daece0",
          DEFAULT: "#6ac46f",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
