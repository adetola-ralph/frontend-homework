/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    colors: {
      "page-bg": "#F9F9FB",
      "btn": "#251A5E",
      white: "#FFFFFF",
      "primary": "#0D0E17",
      "secondary": "#9BA2D0",
      'modal': 'rgba(0, 0, 0, 0.25)',
      "tertiary": "#7A3352"
    },
    maxWidth: {
      "inv-max-width": "670px"
    },
    
    extend: {
      gridTemplateColumns: {
        "inv-item": "100px 160px 160px 1fr auto"
      },
      animation: {
        fadeIn: 'fadeIn .7s linear both',
        modalSlideIn: 'modalSlideIn 0.7s cubic-bezier(0.4, 0, 0.2, 1) both'
      },
      keyframes: {
        fadeIn: {
          'to': {
            opacity: 1,
            pointerEvents: 'initial'
          }
        },
        modalSlideIn: {
          to: {
            transform: 'translateX(0)'
          }
        }
      }
    },
  },
  plugins: [],
}
