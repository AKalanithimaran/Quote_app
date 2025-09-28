// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Merriweather"', 'serif'],
        sans: ['"Inter"', 'sans-serif'],
      },
      colors: {
        elegantWhite: '#ffffffff',
        softGray: '#070225ff',
        accent: '#6366f1',
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-in-out',
        slideLeft: 'slideLeft 0.5s ease-in-out',
        scaleIn: 'scaleIn 0.4s ease',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideLeft: {
          '0%': { transform: 'translateX(50%)', opacity: 0 },
          '100%': { transform: 'translateX(0)', opacity: 1 },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: 0 },
          '100%': { transform: 'scale(1)', opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};
