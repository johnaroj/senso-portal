module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'jelly-bean': {
          '50': '#f3f9fa',
          '100': '#e8f2f6',
          '200': '#c5dfe8',
          '300': '#a2cbd9',
          '400': '#5da5bd',
          '500': '#177ea1',
          '600': '#157191',
          '700': '#115f79',
          '800': '#0e4c61',
          '900': '#0b3e4f'
        },
        'orange': {
          '50': '#fff7f3',
          '100': '#ffefe7',
          '200': '#ffd7c4',
          '300': '#ffbfa1',
          '400': '#ff8e5a',
          '500': '#ff5e13',
          '600': '#e65511',
          '700': '#bf470e',
          '800': '#99380b',
          '900': '#7d2e09'
        }
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
