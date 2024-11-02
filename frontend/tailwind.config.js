/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        arima: ['Arima', 'system-ui'],
        prociono: ['Prociono', 'serif'], // Add the Arima font family
      },
    },
  },
  plugins: [],
}