/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "inter": '"Inter", sans-serif', // Adds a new `font-display` class
        "Cinzel": '"Cinzel", serif', // Adds a new `font-display` class
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

