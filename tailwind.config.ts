import type { Config } from 'tailwindcss';

// Colours taken from the club crest.
// NOTE: gold (#F7D417) fails contrast on white – only use it on red, blue or dark backgrounds.
export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        lion: {
          red: '#D7262B',
          redDark: '#A81B20',
          blue: '#1F4FA3',
          blueDark: '#163A7A',
          gold: '#F7D417',
          ink: '#111111',
        },
      },
      fontFamily: {
        display: ['"Barlow Condensed"', 'Impact', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
