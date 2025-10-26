/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        text: {
          light: "#0d100b",
          dark: "#FAFFF0",
        },
        bg: {
          light: "#FAFFF0",
          dark: "#0d100b",
        },
        subtle: "#a3a3a3",
        muted: "#404040",
        main: {
          light: "#bef264",
          dark: "#4d7c0f",
        },
        weak: {
          light: "#E0EBCA",
          dark: "#404040",
        },
        medium: {
          light: "",
          dark: "",
        },
        strong: {
          light: "",
          dark: "",
        }
      },
    },
  },
  plugins: [],
}