module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,html,mdx}"],
  darkMode: "class",
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px'
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: "var(--color-primary)",
          foreground: "var(--color-primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--color-secondary)",
          foreground: "var(--color-secondary-foreground)",
        },
        destructive: {
          DEFAULT: "var(--color-destructive)",
          foreground: "var(--color-destructive-foreground)",
        },
        muted: {
          DEFAULT: "var(--color-muted)",
          foreground: "var(--color-muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--color-accent)",
          foreground: "var(--color-accent-foreground)",
        },
        popover: {
          DEFAULT: "var(--color-popover)",
          foreground: "var(--color-popover-foreground)",
        },
        card: {
          DEFAULT: "var(--color-card)",
          foreground: "var(--color-card-foreground)",
        },
        success: {
          DEFAULT: "var(--color-success)",
          foreground: "var(--color-success-foreground)",
        },
        warning: {
          DEFAULT: "var(--color-warning)",
          foreground: "var(--color-warning-foreground)",
        },
        error: {
          DEFAULT: "var(--color-error)",
          foreground: "var(--color-error-foreground)",
        },
        surface: "var(--color-surface)",
        // Text Colors
        text: {
          primary: "var(--color-text-primary)",
          secondary: "var(--color-text-secondary)",
          muted: "var(--text-muted)",
          'muted-alpha': "var(--text-muted-alpha)",
          light: "var(--text-light)",
          accent: "var(--text-accent)",
          success: "var(--text-success)",
          info: "var(--text-info)",
          warning: "var(--text-warning)",
          error: "var(--text-error)",
          white: "var(--text-white)",
          black: "var(--text-black)",
          blue: "var(--text-blue)",
          teal: "var(--text-teal)",
          green: "var(--text-green)",
          purple: "var(--text-purple)",
          gray: "var(--text-gray)",
        },
        // Background Colors
        background: {
          main: "var(--bg-main)",
          primary: "var(--bg-primary)",
          secondary: "var(--bg-secondary)",
          'secondary-alpha': "var(--bg-secondary-alpha)",
          card: "var(--bg-card)",
          dark: "var(--bg-dark)",
          success: "var(--bg-success)",
          info: "var(--bg-info)",
          warning: "var(--bg-warning)",
          error: "var(--bg-error)",
          orange: "var(--bg-orange)",
          gray: "var(--bg-gray)",
          purple: "var(--bg-purple)",
        },
        // Border Colors
        border: {
          primary: "var(--border-primary)",
          secondary: "var(--border-secondary)",
          light: "var(--border-light)",
          gray: "var(--border-gray)",
          dark: "var(--border-dark)",
          muted: "var(--border-muted)",
          blue: "var(--border-blue)",
          teal: "var(--border-teal)",
          soft: "var(--border-soft)"
        },
        // Component-specific colors
        sidebar: {
          background: "var(--sidebar-bg)"
        },
        menu: {
          text: "var(--menu-text-color)"
        },
        button: {
          background: "var(--button-bg)",
          border: "var(--button-border)"
        },
        search: {
          background: "var(--search-bg)",
          border: "var(--search-border)",
          text: "var(--search-text)"
        },
        table: {
          'header-bg': "var(--table-header-bg)"
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'xs': 'var(--font-size-xs)',
        'sm': 'var(--font-size-sm)',
        'md': 'var(--font-size-md)',
        'base': 'var(--font-size-base)',
        'lg': 'var(--font-size-lg)',
        'xl': 'var(--font-size-xl)',
        '2xl': 'var(--font-size-2xl)',
        '3xl': 'var(--font-size-3xl)',
        '4xl': 'var(--font-size-4xl)',
        '5xl': 'var(--font-size-5xl)'
      },
      fontWeight: {
        'normal': 'var(--font-weight-normal)',
        'medium': 'var(--font-weight-medium)',
        'semibold': 'var(--font-weight-semibold)',
        'bold': 'var(--font-weight-bold)',
        'extrabold': 'var(--font-weight-extrabold)'
      },
      lineHeight: {
        'xs': 'var(--line-height-xs)',
        'sm': 'var(--line-height-sm)',
        'md': 'var(--line-height-md)',
        'base': 'var(--line-height-base)',
        'lg': 'var(--line-height-lg)',
        'xl': 'var(--line-height-xl)',
        '2xl': 'var(--line-height-2xl)',
        '3xl': 'var(--line-height-3xl)',
        '4xl': 'var(--line-height-4xl)',
        '5xl': 'var(--line-height-5xl)',
        '6xl': 'var(--line-height-6xl)',
        '7xl': 'var(--line-height-7xl)'
      },
      spacing: {
        'xs': 'var(--spacing-xs)',
        'sm': 'var(--spacing-sm)',
        'md': 'var(--spacing-md)',
        'lg': 'var(--spacing-lg)',
        'xl': 'var(--spacing-xl)',
        '2xl': 'var(--spacing-2xl)',
        '3xl': 'var(--spacing-3xl)',
        '4xl': 'var(--spacing-4xl)',
        '5xl': 'var(--spacing-5xl)',
        '6xl': 'var(--spacing-6xl)',
        '7xl': 'var(--spacing-7xl)',
        '8xl': 'var(--spacing-8xl)',
        '9xl': 'var(--spacing-9xl)',
        '10xl': 'var(--spacing-10xl)',
        '11xl': 'var(--spacing-11xl)',
        '12xl': 'var(--spacing-12xl)',
        '13xl': 'var(--spacing-13xl)',
        '14xl': 'var(--spacing-14xl)',
        '15xl': 'var(--spacing-15xl)',
        '16xl': 'var(--spacing-16xl)',
        '17xl': 'var(--spacing-17xl)',
        '18xl': 'var(--spacing-18xl)',
        '19xl': 'var(--spacing-19xl)',
        '20xl': 'var(--spacing-20xl)',
        '21xl': 'var(--spacing-21xl)',
        '22xl': 'var(--spacing-22xl)',
        '23xl': 'var(--spacing-23xl)',
        '24xl': 'var(--spacing-24xl)',
        '25xl': 'var(--spacing-25xl)'
      },
      borderRadius: {
        'none': 'var(--radius-none)',
        'xs': 'var(--radius-xs)',
        'sm': 'var(--radius-sm)',
        'md': 'var(--radius-md)',
        'lg': 'var(--radius-lg)',
        'xl': 'var(--radius-xl)',
        '2xl': 'var(--radius-2xl)',
        '3xl': 'var(--radius-3xl)',
        '4xl': 'var(--radius-4xl)',
        '5xl': 'var(--radius-5xl)',
        '6xl': 'var(--radius-6xl)',
        '7xl': 'var(--radius-7xl)',
        '8xl': 'var(--radius-8xl)',
        '9xl': 'var(--radius-9xl)'
      },
      borderWidth: {
        'sm': 'var(--border-width-sm)',
        'md': 'var(--border-width-md)'
      },
      width: {
        'sidebar': 'var(--width-sidebar)',
        'content': 'var(--width-content)',
        'icon': 'var(--width-icon)',
        'logo': 'var(--width-logo)',
        'button': 'var(--width-button)',
        'dropdown': 'var(--width-dropdown)',
        'section': 'var(--width-section)',
        'small': 'var(--width-small)',
        'medium': 'var(--width-medium)',
        'large': 'var(--width-large)',
        'xlarge': 'var(--width-xlarge)',
        'container': 'var(--width-container)'
      },
      zIndex: {
        'mobile-menu': '40',
        'sidebar': '50',
        'modal': '1000',
        'toast': '1010'
      },
      boxShadow: {
        'sm': 'var(--shadow-sm)',
        'md': 'var(--shadow-md)',
        'lg': 'var(--shadow-lg)',
        'xl': 'var(--shadow-xl)',
        'card-hover': 'var(--shadow-card-hover)',
        'cta': 'var(--shadow-cta)',
        'inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.3s ease-out',
        "fade-up": "fadeUp 0.4s ease-out",
        "scale-in": "scaleIn 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        "bounce-subtle": "bounceSubtle 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
        "shimmer": "shimmer 1.5s infinite",
        "pulse-slow": "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "spin-slow": "spin 3s linear infinite",
        'scale-in': 'scaleIn 0.3s ease-out',
        'fade-in-long': 'fadeIn 0.5s ease-out forwards',
        'slide-in': 'slideIn 0.5s ease-out',
        'zoom-in': 'zoomIn 0.3s ease-out',
        'shake': 'shake 0.5s ease-in-out',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        fadeInUp: {
          'from': { opacity: 0, transform: 'translateY(10px)' },
          'to': { opacity: 1, transform: 'translateY(0)' },
        },
        fadeIn: {
          'from': { opacity: 0 },
          'to': { opacity: 1 },
        },
        fadeUp: {
          from: {
            opacity: 0,
            transform: "translateY(20px)",
          },
          to: {
            opacity: 1,
            transform: "translateY(0)",
          },
        },
        scaleIn: {
          'from': { opacity: 0, transform: 'scale(0.95)' },
          'to': { opacity: 1, transform: 'scale(1)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-2px)' },
          '75%': { transform: 'translateX(2px)' },
        },
        slideIn: {
          'from': { opacity: 0, transform: 'translateX(-20px)' },
          'to': { opacity: 1, transform: 'translateX(0)' },
        },
        zoomIn: {
          'from': { transform: 'scale(0.95)', opacity: 0 },
          'to': { transform: 'scale(1)', opacity: 1 },
        },
        bounceSubtle: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-2px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      transitionTimingFunction: {
        'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'spring': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      },
      transitionDuration: {
        '250': '250ms',
        '400': '400ms',
      },
      backdropBlur: {
        'custom': '10px',
      },
      backgroundImage: {
        'enhanced-gradient': 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #f1f5f9 100%)',
      }
    }
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.text-gradient-primary': {
          background: 'linear-gradient(to right, #7b2ff7, #f107a3)',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
        },
      })
    },
    function({ addComponents }) {
      addComponents({
        '.touch-target': {
          minHeight: '44px',
          minWidth: '44px',
          '@screen sm': {
            minHeight: '48px',
          },
        },
      })
    },
    require("tailwindcss-animate"),
  ]
};
