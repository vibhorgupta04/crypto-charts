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
        "blue-4": "rgba(153, 102, 255, 0.5)",
        "blue-5": "rgba(153, 102, 255)",
        "gray-1": "#8E99AC",
        "gray-2": "#F8F9FC",
        "gray-3": "#5E6E88",
        "gray-4": "#F9F9F9",
        "gray-5": "#EDEDED",
        "gray-6": "#c7c7c7",
        "green-1": "#4c9d8a",
        "orange-1": "#ec7622",
        "red-1": "#fbeaea",
        "red-2": 'rgb(255, 99, 132)',
        "red-3": 'rgba(255, 99, 132, 0.5)',
        "yellow-1": 'rgba(255, 159, 64)',
        "yellow-2": 'rgba(255, 159, 64, 0.5)',

      },
    },
  },
  plugins: [],
};
