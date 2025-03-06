/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary": "#7DCB80", // Warna kustom
        "secondary": "#376A63", // Warna kustom
        "Tertiary": "#FDD744", // Warna kustom
      },
      boxShadow: {
        'inner-corect': 'inset 0 0 10px 5px #47EC1D', // Sesuaikan sesuai kebutuhan
        'inner-incorect': 'inset 0 0 10px 5px red', // Sesuaikan sesuai kebutuhan
      },
    },
  },
  plugins: [],
};
