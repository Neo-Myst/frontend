/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customBlue: "#001A27",
        buttonBlue: "#339DD2",
        darkBlue: "#0D1B2A", // Ensure this color exists
        neonBlue: "#007BFF",
      },
    },
  },
  plugins: [],
};
