/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
// #5f6FFF
        "primary":"#027BCE",
      },
      gridTemplateColumns:{
        "auto":"repeat(auto-fill, minmax(200px,1fr))"
      }
    },
  },
  plugins: [],
}

