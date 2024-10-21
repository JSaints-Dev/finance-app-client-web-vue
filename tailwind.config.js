/** @type {import('tailwindcss').Config} */
import tailwindcssPrimeui from 'tailwindcss-primeui'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,vue}'],
  theme: {
    extend: {},
  },
  plugins: [tailwindcssPrimeui],
}
