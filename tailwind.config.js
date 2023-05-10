/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary": "#4f515a",
        "secondary": "#ebebeb",
        "warning": "#da0f41",
      },
      fontFamily: {
        Nunito: ["Nunito, sans-serif"]
      },
      backgroundColor: {
        'fafafa': '#fafafa',
      },
      textDecoration: {
        'none': 'none',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}

