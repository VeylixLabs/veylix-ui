/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./.storybook/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryColor: "#AA62F5",
        primaryColorLight: "#d8b4fe",
        backgroundColor: "#000000",
        primaryColorDark: "#808080",
        accentPurple: "#808080",
        accentBlue: "#a0a0a0",
        accentMagenta: "#ffffff",
        glassBg: "rgba(10, 10, 10, 0.7)",
        glassBorder: "rgba(255, 255, 255, 0.2)",
      },
      fontFamily: {
        display: ["var(--font-iceberg)", "Iceberg", "sans-serif"],
        tech: ["Syncopate", "sans-serif"],
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
        mono: ["Geist Mono", "Fira Code", "monospace"],
      },
      borderRadius: {
        lg: "0.5rem",
        md: "0.375rem",
        sm: "0.25rem",
        default: "0.4rem",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(170, 98, 245, 0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(170, 98, 245, 0.3), 0 0 60px rgba(170, 98, 245, 0.3)" },
        },
        "text-flicker": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.8" },
        },
        "gradient-rotate": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        "particle-float": {
          "0%": { transform: "translateY(100vh) rotate(0deg)", opacity: "0" },
          "10%": { opacity: "1" },
          "90%": { opacity: "1" },
          "100%": { transform: "translateY(-100vh) rotate(720deg)", opacity: "0" },
        },
      },
      animation: {
        blink: "blink 1s infinite",
        float: "float 6s ease-in-out infinite",
        marquee: "marquee 20s linear infinite",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
        "text-decode": "text-flicker 0.1s infinite",
        "gradient-rotate": "gradient-rotate 8s ease infinite",
        "particle-float": "particle-float 15s linear infinite",
      },
      boxShadow: {
        "glow-green": "0 0 20px rgba(170, 98, 245, 0.3), 0 0 40px rgba(170, 98, 245, 0.3)",
        "glow-purple": "0 0 20px rgba(170, 98, 245, 0.2), 0 0 40px rgba(170, 98, 245, 0.2)",
        "glow-blue": "0 0 20px rgba(170, 98, 245, 0.2), 0 0 40px rgba(170, 98, 245, 0.2)",
        "glass": "0 8px 32px rgba(0, 0, 0, 0.4)",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
}
