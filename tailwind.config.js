/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",  // React-Dateien
  ],
  theme: {
    extend: {
      colors: {
        success: '#22C55E',
        error: '#EF4444',
      },
    },
  },
  plugins: [],
}
