/** Tailwind config generated from brand tokens */
module.exports = {
  content: ['./*.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: { center: true, padding: '12px' },
    extend: {
      colors: {
        primary: '#163F6F',
        accent: '#7C0004',
        neutral: {
          0: '#FFFFFF', 50: '#FAFAF7', 100: '#F5F5F3', 200: '#E8E8E5',
          300: '#D6D6D2', 400: '#B5B5B1', 500: '#8A8A86', 600: '#6B6B6B',
          700: '#4A4A49', 800: '#2F2F2E', 900: '#1B1B1A'
        }
      },
      fontFamily: {
        serif: ['PT Serif','ui-serif','Georgia','Times New Roman','serif'],
        sans: ['PT Sans','ui-sans-serif','system-ui','-apple-system','Segoe UI','Roboto','Helvetica Neue','Arial','Noto Sans','Liberation Sans','sans-serif']
      },
      fontSize: {
        display: ['60px', { lineHeight: '1.1', letterSpacing: '0.02em', fontWeight: '700' }],
        h1: ['48px', { lineHeight: '1.15', letterSpacing: '0.02em', fontWeight: '700' }],
        h2: ['36px', { lineHeight: '1.2', letterSpacing: '0.01em', fontWeight: '700' }],
        h3: ['28px', { lineHeight: '1.3', fontWeight: '700' }],
        h4: ['22px', { lineHeight: '1.35', fontWeight: '700' }],
        body: ['18px', { lineHeight: '1.6' }],
        small: ['14px', { lineHeight: '1.6' }],
        micro: ['12px', { lineHeight: '1.5', letterSpacing: '.06em', fontWeight: '600' }]
      },
      borderRadius: { sm:'6px', md:'12px', lg:'20px', pill:'9999px' },
      boxShadow: {
        sm: '0 1px 2px rgba(0,0,0,.06)',
        md: '0 4px 12px rgba(0,0,0,.08)',
        lg: '0 10px 24px rgba(0,0,0,.10)'
      },
      spacing: { 1:'4px', 2:'8px', 3:'12px', 4:'16px', 6:'24px', 8:'32px', 12:'48px', 16:'64px' }
    }
  },
  plugins: []
}