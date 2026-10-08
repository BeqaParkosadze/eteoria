/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkbg: '#0B0F17',
        canvas: '#FFFFFF',
        canvasMuted: '#F8FAFC',
        borderSubtle: '#E2E8F0',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'neo': '0 20px 40px -15px rgba(0, 0, 0, 0.3)',
        'card': '0 4px 20px -2px rgba(15, 23, 42, 0.05)',
        'floating': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      },
      borderRadius: {
        '3xl': '24px',
        '4xl': '32px',
      }
    },
  },
  plugins: [],
}
