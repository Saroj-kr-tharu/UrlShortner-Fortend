/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        PrimaryColor: {
          100: "#d5eaec",
          200: "#abd6d9",
          300: "#80c1c6",
          400: "#56adb3",
          500: "#2c98a0",
          600: "#237a80",
          700: "#1a5b60",
          800: "#123d40",
          900: "#091e20"
},
      },
    },

  },
  plugins: [],
}

