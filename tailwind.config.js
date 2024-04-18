/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        default: ["var(--font-jakarta)"],
      },
      colors: {
        "kblack-main": "#000112",
        "kpurple-light": "#d8d7f1",
        "kpurple-main": "#635fc7",
      },
    },
  },
  plugins: [],
};
