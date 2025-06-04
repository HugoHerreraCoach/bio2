import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        dark: {
          100: '#333333',
          200: '#2A2A2A',
          300: '#222222',
          400: '#1A1A1A',
          500: '#121212',
          600: '#0A0A0A',
          700: '#050505',
          800: '#030303',
          900: '#000000',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      boxShadow: {
        'card': '0 4px 6px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 6px 12px rgba(0, 0, 0, 0.15)',
      },
    },
  },
  plugins: [],
};

export default config;
