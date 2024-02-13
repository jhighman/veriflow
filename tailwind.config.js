/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#ff5f57',
        'secondary': '#ffbd2e',
        'accent': '#0a81ab',
        'dark': '#1a202c',
        'light': '#f7fafc',
        'muted': '#718096',
      },
      fontFamily: {
        'body': ['Inter', 'sans-serif'],
        'display': ['Poppins', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      boxShadow: {
        'custom': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.dark'),
            a: {
              color: theme('colors.primary'),
              '&:hover': {
                color: theme('colors.secondary'),
              },
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require("daisyui"),
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#ff5f57",
          "secondary": "#ffbd2e",
          "accent": "#0a81ab",
          "neutral": "#1a202c",
          "base-100": "#ffffff",
          "info": "#3ABFF8",
          "success": "#36D399",
          "warning": "#FBBD23",
          "error": "#F87272",
        },
      },
    ],
  },
};
