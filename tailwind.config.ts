import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // FIFA World Cup Brand Colors
        fifa: {
          gold: "#D4AF37",
          "gold-light": "#F5D66D",
          "gold-dark": "#B8941F",
          blue: "#0033A0",
          "blue-light": "#1E4DB7",
          "blue-dark": "#002266",
          cyan: "#00D4FF",
          "cyan-light": "#66E5FF",
          "cyan-dark": "#00A8CC",
          emerald: "#00FF87",
          red: "#FF3B3B",
        },
        // Dark mode colors
        dark: {
          bg: "#0A0A0F",
          surface: "#12121A",
          card: "#1A1A24",
          border: "#2A2A38",
          muted: "#3A3A4A",
        },
        // Light mode colors
        light: {
          bg: "#F8FAFC",
          surface: "#FFFFFF",
          card: "#F1F5F9",
          border: "#E2E8F0",
          muted: "#CBD5E1",
        },
      },
      fontFamily: {
        display: ["var(--font-heading)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
        "slide-down": "slideDown 0.5s ease-out",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        "score-update": "scoreUpdate 0.3s ease-out",
        shimmer: "shimmer 2s linear infinite",
        float: "float 3s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideDown: {
          "0%": { opacity: "0", transform: "translateY(-20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseGlow: {
          "0%, 100%": {
            boxShadow: "0 0 5px rgba(0, 212, 255, 0.5), 0 0 10px rgba(0, 212, 255, 0.3)"
          },
          "50%": {
            boxShadow: "0 0 20px rgba(0, 212, 255, 0.8), 0 0 30px rgba(0, 212, 255, 0.5)"
          },
        },
        scoreUpdate: {
          "0%": { transform: "scale(1.2)", color: "#00FF87" },
          "100%": { transform: "scale(1)", color: "inherit" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        shimmer: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
      },
      boxShadow: {
        glow: "0 0 20px rgba(0, 212, 255, 0.3)",
        "glow-strong": "0 0 30px rgba(0, 212, 255, 0.5)",
        gold: "0 0 20px rgba(212, 175, 55, 0.3)",
        "gold-strong": "0 0 30px rgba(212, 175, 55, 0.5)",
      },
    },
  },
  plugins: [],
};

export default config;
