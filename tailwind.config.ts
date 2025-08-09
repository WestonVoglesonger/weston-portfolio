import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: 'rgb(var(--background) / <alpha-value>)',
        foreground: 'rgb(var(--foreground) / <alpha-value>)',
        card: 'rgb(var(--background) / <alpha-value>)',
        accent: 'rgba(0,0,0,0.04)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
} satisfies Config;


