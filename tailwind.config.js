/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'map': "url('https://img.freepik.com/free-photo/world-map-background-with-compass-red-hearts_23-2147607793.jpg?w=826&t=st=1724337314~exp=1724337914~hmac=f2a761a9315e893a2260aa7e0c33f9373cc8b52a102a52b0957ec418a04d7c88')",
      },
      boxShadow: {
        // box-shadow: [offset-x] [offset-y] [blur-radius] [spread-radius] [color];
        '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
        '4xl': '10px 10px 40px 3px rgba(0, 0, 0, 0.8)',
      },
    },
  },
  plugins: [],
}
