import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        primary: {
          "strong-cyan": "hsl(172, 67%, 45%)",
        },
        neutral: {
          "very-dark-cyan": "hsl(183, 100%, 15%)",
          "dark-grayish-cyan": "hsl(186, 14%, 43%)",
          "dark-cyan": "hsl(180, 18%, 40%)",
          "grayish-cyan": "hsl(184, 14%, 56%)",
          "light-grayish-cyan": "hsl(185, 41%, 84%)",
          "very-light-grayish-cyan": "hsl(189, 41%, 97%)",
          "light-cyan": "hsl(172, 61%, 77%)",
        },
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
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
