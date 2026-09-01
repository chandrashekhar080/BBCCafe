/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Bodoni Moda"', 'Georgia', '"Times New Roman"', 'serif'],
        sans: ['Outfit', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'sans-serif'],
        script: ['"Style Script"', '"Brush Script MT"', 'cursive'],
      },
      colors: {
        // Black + yellow: BBC's brand pair. Blacks are warm-tinted rather than
        // neutral so the yellow reads as lamplight instead of hazard tape.
        ink: '#050505',
        room: '#0C0B09',
        surface: '#16130E',
        raised: '#211D15',
        slab: '#14110B',
        slabLit: '#2B2313',
        // Yellow scale: bright primary for CTAs and headings, a lighter tint
        // for hover/focus, a deeper one for large fills.
        brass: '#FFC91F',
        brassLit: '#FFE066',
        brassDeep: '#D9A400',
        bone: '#F5F1E6',
        boneDim: '#ABA69B',
        ballRed: '#D24B3C',
      },
      letterSpacing: {
        tightest: '-0.045em',
        widest2: '0.28em',
      },
      maxWidth: {
        shell: '84rem',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        floatIn: {
          from: { opacity: '0', transform: 'translateY(18px)' },
          to: { opacity: '1', transform: 'none' },
        },
        pulseDot: {
          '0%,100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '.45', transform: 'scale(.7)' },
        },
      },
      animation: {
        marquee: 'marquee 38s linear infinite',
        floatIn: 'floatIn .7s cubic-bezier(.2,.7,.3,1) both',
        pulseDot: 'pulseDot 2.4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
