/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 1. PRIMARY BRAND COLOR (Trust Blue)
        primary: '#2563EB',
        
        // 2. SECONDARY COLOR (Growth Green)
        secondary: '#16A34A',
        
        // 3. ACCENT COLOR (Warm Orange)
        accent: '#F59E0B',
        
        // 4. BACKGROUNDS
        surface: '#F8FAFC', // Soft White (Site Background)
        card: '#FFFFFF',    // Pure White (For Cards)
        
        // 5. BORDERS
        line: '#E2E8F0',    // Light Neutral Gray
        
        // 6. TEXT COLORS
        heading: '#0F172A', // Deep Slate (Main text)
        body: '#64748B',    // Muted Gray (Description text)
      },
      fontFamily: {
        // Poori website ke liye clean aur modern font
        sans: ['Inter', 'system-ui', 'sans-serif'], 
      },
      // Animations for premium feel
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}