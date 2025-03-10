/** @type {import("tailwindcss").Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Poppins", "sans-serif"],
    },
    extend: {
      colors: {
        brend: {
          primary: "#00AD85",
          secundary: "#EEEEEE",
          grey: "#818181",
          darkGrey: "#35383E",
          lightGrey: "#9A9CF",
          border: "#ECECEC",
          lightGreen: "#E6F7F8",
          progress: "#FFAA04",
          notStarted: "#fE5A99",
          divider: "#F4F4F5",
          time: "#9A7C9F",
          danger: "#f5202b",
        },
      },
    },
  },
  plugins: [],
}
