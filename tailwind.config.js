/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        light: "hsl(188, 5%, 95%)",
        dark: "hsl(188, 10% 5%)",
        gray: {
          1: "hsl(188, 3%, 90%)",
          2: "hsl(188, 3%, 83%)",
          3: "hsl(188, 3%, 75%)",
          4: "hsl(188, 3%, 60%)",
          5: "hsl(188, 3%, 40%)",
          6: "hsl(188, 3%, 20%)",
          7: "hsl(188, 3%, 15%)",
          8: "hsl(188, 3%, 10%)",
        },
        main: {
          DEFAULT: "hsl(188, 90%, 20%)",
          light: "hsl(188, 90%, 30%)",
        },
        error: "hsl(350, 55%, 50%)"
      },
    },
  },
  plugins: [],
}