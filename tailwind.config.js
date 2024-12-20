/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary": "#6D9773", // Warna kustom
        "secondary": "#0C382E", // Warna kustom
        "Tertiary": "#FFBA00", // Warna kustom
      },
      boxShadow: {
        'inner-custom': 'inset 0 8px 10px #47EC1D', // Sesuaikan sesuai kebutuhan
      },
    },
  },
  plugins: [],
};
