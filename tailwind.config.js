/** @type {import('tailwindcss').Config} */
import { blackA, violet, green, mauve, slate } from "@radix-ui/colors";
export const content = [
  "./pages/**/*.{js,ts,jsx,tsx}",
  "./components/**/*.{js,ts,jsx,tsx}",
  "./app/**/*.{js,ts,jsx,tsx}",
];
export const theme = {
  extend: {
    fontFamily: {
      default: ["var(--font-jakarta)"],
    },
    colors: {
      "kblack-main": "#000112",
      "kpurple-light": "#d8d7f1",
      "kpurple-main": "#635fc7",
      "kgreen-main": "#67e2ae",
      "kgray-text": "#828fa3",
      "kgray-label": "#000112",
      "kblue-todo": "#E7A75B",
      "indigo-500": "#635FC7",
      "medium-gray": "#89898f",

      ...blackA,
      ...green,
      ...mauve,
      ...slate,
      ...violet,
    },
    keyframes: {
      hide: {
        from: { transform: "translateX(0)" },
        to: { transform: "translateX(calc(100% + var(--viewport-padding)))" },
      },
      slideIn: {
        from: { transform: "translateX(calc(100% + var(--viewport-padding)))" },
        to: { transform: "translateX(0)" },
      },
      swipeOut: {
        from: { transform: "translateX(var(--radix-toast-swipe-end-x))" },
        to: { transform: "translateX(calc(100% + var(--viewport-padding)))" },
      },
    },
    animation: {
      hide: "hide 100ms ease-in",
      slideIn: "slideIn 250ms cubic-bezier(0.16, 1, 0.3, 1)",
      swipeOut: "swipeOut 200ms ease-out",
    },
  },
  darkMode: "selector", // add this line
};
export const plugins = [];

