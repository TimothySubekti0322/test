/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}", "./*.html", "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui"), require('flowbite/plugin')],
  daisyui: {
    themes: ["light"]
  }
}

