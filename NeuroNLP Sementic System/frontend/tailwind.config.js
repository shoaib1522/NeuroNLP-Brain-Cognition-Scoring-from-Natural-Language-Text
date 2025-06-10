/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#111827',
        'dark-card': '#1F2937',
        'dark-border': '#374151',
        'primary-accent': '#8B5CF6',
        'primary-hover': '#7C3AED',
        'light-text': '#F3F4F6',
        'subtle-text': '#9CA3AF',
      },
    },
  },
  plugins: [],
};