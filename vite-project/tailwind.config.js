/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Albert Sans', 'sans-serif'],
      },
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(100%)' }, // Start off the screen to the right
          '100%': { transform: 'translateX(-100%)' }, // End off the screen to the left
        },
      },
      animation: {
        scroll: 'scroll 10s linear infinite', // Slower animation for smoother scroll
      },
    },
  },
  plugins: [],
};
