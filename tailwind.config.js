module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    colors: {
      'blue-dark': '#4706B6',
      'blue-light': '#60D0FD',
      'blue': '#5327EE',
      'purple-main': 'linear-gradient(180deg, #943BF3 0%, #5327EE 100%);'
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif']
    },
    extend: {
      spacing: {
        '8xl': '96rem',
        '9xl': '128rem'
      },
      borderRadius: {
        '4xl': '2rem'
      },
      boxShadow: {
        'bottom-left': 'rgb(157 79 255 / 70%) -8px 8px 0px'
      }
    }
  }
}
