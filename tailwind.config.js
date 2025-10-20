/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        text: {
          light: "#0d100b",
          dark: "#f7fee7",
        },
        background: {
          light: "#f7fee7",
          dark: "#0d100b",
        },
        subtle: "#a3a3a3",
        muted: "#404040",
        highlight: {
          light: "#bef264",
          dark: "#4d7c0f",
        }
      },
    },
  },
  plugins: [],
}