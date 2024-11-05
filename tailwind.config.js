/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",  // React-Dateien
  ],
  theme: {
    extend: {
      colors: {
        success: '#5FE872',
        error: '#F55C5C',
      },
    },
  },
  plugins: [],
}
