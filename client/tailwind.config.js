// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",   // Matches all JSX/JS files in the src directory
  ],
  theme: {
    extend: {
      colors: {
        primary: '#D82E2F',
        secondary: '#30734C',
        accent: '#F2A900',
        background: '#F5E2B9',
        textPrimary: '#6A2E2A'
      }
    }
  },
  plugins: []
};
