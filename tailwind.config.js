/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "class",
  theme: {
    extend: {
      keyframes: {
        fadeInUp: {
          'from': { opacity: '0', transform: 'translateY(12px)', filter: 'blur(8px)' },
          'to': { opacity: '1', transform: 'translateY(0)', filter: 'blur(0)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 15px rgba(16, 185, 129, 0.3)' },
          '50%': { boxShadow: '0 0 25px rgba(16, 185, 129, 0.6)' },
        },
        ringPulse: {
          '0%, 100%': { borderColor: 'rgb(220, 38, 38)', boxShadow: '0 0 10px rgba(220, 38, 38, 0.5)' },
          '50%': { borderColor: 'rgb(239, 68, 68)', boxShadow: '0 0 25px rgba(239, 68, 68, 0.8)' },
        }
      },
      animation: {
        'fade-in-up': 'fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pulse-glowing': 'pulseGlow 2s infinite ease-in-out',
        'ring-pulse': 'ringPulse 1.5s infinite ease-in-out',
      }
    },
  },
  plugins: [],
};
