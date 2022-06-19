/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "body": ["body"],
        "title": ["title"]
      }
    },
  },
  prefix: "t-",
  plugins: [require('@tailwindcss/aspect-ratio'),],
}
