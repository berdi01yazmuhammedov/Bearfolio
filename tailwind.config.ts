import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ivory: "#F7F4EC",
        paper: "#FCFAF5",
        ink: "#181914",
        stone: {
          DEFAULT: "#8A8371",
          light: "#B6AF9C",
        },
        line: "#E3DDCC",
        navy: {
          DEFAULT: "#26344A",
          light: "#3A4E6B",
          dark: "#161F2C",
        },
      },
      fontFamily: {
        display: ["\"Fraunces\"", "ui-serif", "Georgia", "serif"],
        sans: ["\"Inter\"", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      maxWidth: {
        container: "1320px",
      },
      letterSpacing: {
        widest2: "0.24em",
      },
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        pulseDot: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.35" },
        },
      },
      animation: {
        pulseDot: "pulseDot 2.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
