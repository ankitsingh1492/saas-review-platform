import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Custom color palette matching our CSS variables
        bg: {
          primary: "#1A1C20",
          secondary: "#211E26",
          tertiary: "#222428",
        },
        card: {
          primary: "#2B2D31",
          secondary: "#332E3A",
        },
        text: {
          primary: "#E0E0E0",
          secondary: "#9E9E9E",
          muted: "#6D6875",
        },
        accent: {
          primary: "#7D5CE8",
          secondary: "#8A6FE8",
          hover: "#8A6FE8",
        },
        border: {
          primary: "#2B2D31",
          secondary: "#332E3A",
        },
        status: {
          success: "#10B981",
          warning: "#F59E0B",
          error: "#EF4444",
          info: "#3B82F6",
        },
        shadow: {
          primary: "rgba(125, 92, 232, 0.25)",
          secondary: "rgba(0, 0, 0, 0.1)",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        dashboard:
          "linear-gradient(to bottom right, #1A1C20, #211E26, #1A1C20)",
      },
      boxShadow: {
        accent: "0 4px 14px 0 rgba(125, 92, 232, 0.25)",
        "accent-lg": "0 10px 25px -3px rgba(125, 92, 232, 0.25)",
        card: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        modal: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
      },
      animation: {
        "ping-slow": "ping 2s cubic-bezier(0, 0, 0.2, 1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
