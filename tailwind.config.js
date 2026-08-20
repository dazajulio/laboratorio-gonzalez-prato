/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          teal: '#0E4D58',
          tealDark: '#09353D',
          tealLight: '#165A65',
          cyan: '#00A8B5',
          cyanLight: '#22D3EE',
          bgClinical: '#F8FAFC',
          surfaceDark: '#0A1118'
        }
      }
    },
  },
  plugins: [],
}
