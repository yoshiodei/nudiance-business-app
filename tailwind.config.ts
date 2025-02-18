import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#511989',
          light: '#F0E0F5',
          dark: '',
        },
        secondary: {
          DEFAULT: '#fac007',
          light: '',
          dark: '',
        },
        font: {
          primary: '#B261C7',
          secondary: '',
          light: '#FFFFFF',
          dark: '',
        },
        background: {
          DEFAULT: '#f1eef4',
          light: '#f3f3f3',
          dark: 'lightgrey',
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
