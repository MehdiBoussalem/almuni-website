/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'bleu-fonce': '#355F9B',
        'bleu-clair': '#7AC9F2',
        bordeau: '#B11A5F',
        rouge: '#DE1251',
      },
      fontFamily: {
        title: ['"Bebas Neue"', 'sans-serif'],
        body: ['Montserrat', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, rgba(177, 26, 95, 0.75), rgba(53, 95, 155, 0.75))',
        'network-gradient': 'linear-gradient(135deg, #B11A5F, #DE1251)',
      },
      boxShadow: {
        card: '0 4px 15px rgba(0, 0, 0, 0.08)',
      },
    },
  },
  plugins: [],
}
