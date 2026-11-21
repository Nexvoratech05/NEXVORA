import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        navy: {
          950: "#071426",
          900: "#0C1F38",
          700: "#1B3558",
        },
        blue: {
          600: "#087BCE",
          700: "#0668AE",
        },
        cyan: {
          400: "#55B9FF",
        },
        brand: {
          navy: "#071426",
          dark: "#0C1F38",
          borderDark: "#1B3558",
          blue: "#087BCE",
          blueHover: "#0668AE",
          cyan: "#55B9FF",
          light: "#F4F7FB",
          borderLight: "#DCE4EE",
          muted: "#4A5B73",
          success: "#1F9D6B",
          error: "#D64545",
        },
        gray: {
          50: "#F4F7FB",
          200: "#DCE4EE",
          600: "#4A5B73",
        },
        success: "#1F9D6B",
        error: "#D64545",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        heading: ["var(--font-sora)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      maxWidth: {
        container: "1240px",
      },
      borderRadius: {
        btn: "8px",
        input: "8px",
        card: "12px",
        tag: "9999px",
      },
    },
  },
  plugins: [],
};

export default config;
