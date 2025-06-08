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
        textPrimary: '#6A2E2A',
        // New colors
        nigerianPurple: '#4B0082',
        nigerianOrange: '#FF8C00',
        nigerianGreen: '#2E8B57',
        nigerianYellow: '#FFD700',
        nigerianBrown: '#8B4513',
        // Gradients
        gradientPrimary: 'linear-gradient(135deg, #D82E2F 0%, #FF8C00 100%)',
        gradientSecondary: 'linear-gradient(135deg, #30734C 0%, #2E8B57 100%)',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #D82E2F 0%, #FF8C00 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #30734C 0%, #2E8B57 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'slide-left': 'slideLeft 0.5s ease-out',
        'slide-right': 'slideRight 0.5s ease-out',
        'bounce-in': 'bounceIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideLeft: {
          '0%': { transform: 'translateX(20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideRight: {
          '0%': { transform: 'translateX(-20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        bounceIn: {
          '0%': { transform: 'scale(0.3)', opacity: '0' },
          '50%': { transform: 'scale(1.05)', opacity: '0.8' },
          '70%': { transform: 'scale(0.9)', opacity: '0.9' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    }
  },
  plugins: []
};
