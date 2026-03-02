/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'quebec-blue': '#003087',
        'river-blue': '#1a6fa8',
        'light-blue': '#4a9fd4',
        'sky-blue': '#e8f4fd',
        'forest-green': '#2d6a4f',
        'meadow-green': '#52b788',
        'light-green': '#d8f3dc',
        'snow-white': '#f8faf7',
        'autumn-gold': '#d4a017',
        'bark': '#5c3d1e',
        'text-dark': '#1b2d1e',
        'text-secondary': '#4a5c4e',
        'text-muted': '#7a8c7e',
        'border-color': '#d4e4d8',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        'panel': '0 0 40px rgba(0,0,0,0.12)',
        'card': '0 4px 20px rgba(0,0,0,0.08)',
      },
    },
  },
  plugins: [],
}
