/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blush: {
          50: '#fff5f7',
          100: '#ffe8ec',
          200: '#fed5dd',
          300: '#fdb5c3',
          400: '#fa839d',
          500: '#f35579',
          600: '#df325c',
        },
        champagne: {
          50: '#fbf9f4',
          100: '#f5f0e4',
          200: '#ebe0c8',
          300: '#decba5',
          400: '#cbb07a',
          500: '#b89758',
          600: '#9e7c41',
        },
        beige: {
          50: '#faf8f5',
          100: '#f5f0eb',
          200: '#ebe2d8',
          300: '#ddd0c0',
          400: '#c8b49e',
          500: '#b49980',
        },
        rosewood: {
          600: '#8c3a4b',
          700: '#722b3b',
          800: '#5a222f',
          900: '#431923',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'serif'],
        display: ['"Cinzel Decorative"', 'serif'],
        script: ['"Great Vibes"', 'cursive'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      boxShadow: {
        'glow-gold': '0 0 25px rgba(218, 165, 32, 0.35)',
        'glow-rose': '0 0 30px rgba(243, 85, 121, 0.25)',
        'card-soft': '0 10px 30px -5px rgba(184, 151, 88, 0.12), 0 4px 12px -2px rgba(0, 0, 0, 0.05)',
        'envelope': '0 25px 50px -12px rgba(120, 53, 15, 0.25)',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseSubtle: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.04)', opacity: '0.9' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}
