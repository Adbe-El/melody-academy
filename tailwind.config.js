/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        academy: {
          cream: '#F9F8F4',
          'cream-light': '#FFFFFF',
          emerald: '#0F382C',
          'emerald-hover': '#14493A',
          'emerald-dark': '#09251D',
          leaf: '#1A5C3A',
          'leaf-soft': '#D4E8DA',
          sage: '#E6EFEA',
          'sage-dark': '#C8DAD0',
          gold: '#D4AF37',
          'gold-hover': '#B8972E',
          'gold-strong': '#9B7B1A',
          charcoal: '#1A1A1A',
          ink: '#151515',
          muted: '#666666',
          whatsapp: '#25D366',
          'whatsapp-hover': '#20bd5a',
          border: '#E5E5E0',
          input: '#EBEBEB',
          ring: '#1A5C3A',
          secondary: '#F4F3EE',
          'muted-surface': '#F0EFE8',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 1px 2px rgba(0,0,0,0.04), 0 8px 24px -8px rgba(15, 56, 44, 0.08)',
        'card': '0 1px 2px rgba(0,0,0,0.04), 0 12px 36px -12px rgba(15, 56, 44, 0.18)',
        'glow': '0 24px 60px -20px rgba(26, 92, 58, 0.35)',
        'lift': '0 2px 4px rgba(0,0,0,0.04), 0 28px 60px -20px rgba(15, 56, 44, 0.22)',
      }
    },
  },
  plugins: [],
}
