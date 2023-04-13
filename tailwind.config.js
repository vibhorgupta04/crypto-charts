/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "blue-1": "#FAFBFF",
        "blue-2": "#E3EAFF",
        "blue-3": "#1C5DDB",
        "gray-1": "#8E99AC",
        "gray-2": "#F8F9FC",
        "gray-3": "#5E6E88",
        "gray-4": "#F9F9F9",
        "gray-5": "#EDEDED",
        "gray-6": "#c7c7c7",
        "green-1": "#4c9d8a",
        "orange-1": "#ec7622",
        "red-1": "#fbeaea",
      },
    },
  },
  plugins: [],
};
