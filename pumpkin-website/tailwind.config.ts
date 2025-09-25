import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#faf8f5",
        foreground: "#2c1810",
        "autumn-orange": "#d2691e",
        "autumn-gold": "#daa520",
        "autumn-red": "#8b4513",
        cream: "#f5e6d3",
      },
    },
  },
  plugins: [],
};

export default config;