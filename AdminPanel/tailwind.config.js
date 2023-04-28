
module.exports = {
  content: ["./src/**/*.{js,jsx}",],
  theme: {
    extend: {
      transitionProperty: {
        width: 'width',
        bottom: 'bottom',
      },
      width: {
        "device-width": "320px",
      },
      height: {
        "device-height": "600px",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
}


