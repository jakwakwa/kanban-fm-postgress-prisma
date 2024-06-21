/** @type {import('tailwindcss').Config} */
import { blackA, violet } from "@radix-ui/colors";
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
      "kblue-todo": "#E7A75B",
      "indigo-500": "#635FC7",
      "medium-gray": "#89898f",
      green: "#5BE772",
      ...blackA,
      ...violet,
    },
  },
};
export const plugins = [];
