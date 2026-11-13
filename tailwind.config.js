/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#0c0d0e",
        surface: "#121315",
        "surface-card": "#18191c",
        "surface-raised": "#222428",
        border: {
          subtle: "#25272c",
          DEFAULT: "#33363e",
          strong: "#4c505c",
        },
        primary: "#f3f4f6",
        secondary: "#9ca3af",
        muted: "#6b7280",
        flour: "#faf7f2",
        wood: {
          dark: "#1e1713",
          medium: "#3b2e25",
          grain: "#5a473a",
          highlight: "#826955",
        },
        talo: {
          corn: "#d49b42",
          crust: "#b45309",
          ember: "#dc2626",
          piparra: "#15803d",
        }
      },
      fontFamily: {
        editorial: ["'Newsreader'", "Georgia", "serif"],
        display: ["'Space Grotesk'", "sans-serif"],
        mono: ["'Space Mono'", "monospace"],
      },
      letterSpacing: {
        ultra: "0.25em",
        mega: "0.35em",
      },
      keyframes: {
        woodVibrate: {
          "0%, 100%": { transform: "translateY(0) scaleY(1)" },
          "20%": { transform: "translateY(2px) scaleY(0.98)" },
          "40%": { transform: "translateY(-1.5px) scaleY(1.01)" },
          "60%": { transform: "translateY(1px) scaleY(0.99)" },
          "80%": { transform: "translateY(-0.5px)" },
        },
        strikeStick: {
          "0%": { transform: "translateY(-40px) rotate(-6deg)", opacity: "0.4" },
          "45%": { transform: "translateY(0px) rotate(0deg)", opacity: "1" },
          "65%": { transform: "translateY(-12px) rotate(2deg)", opacity: "0.9" },
          "100%": { transform: "translateY(0px) rotate(0deg)", opacity: "0.85" },
        }
      },
      animation: {
        woodVibrate: "woodVibrate 0.35s ease-out",
        strikeStick: "strikeStick 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
      }
    },
  },
  plugins: [],
}
