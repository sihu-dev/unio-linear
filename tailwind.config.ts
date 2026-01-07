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
        background: "#08090A",
        foreground: "#F7F8F8",
        "linear-purple": "#5E6AD2",
        "linear-purple-light": "#6B77E0",
        "linear-purple-dark": "#4F5BC3",
      },
      fontWeight: {
        "510": "510",
        "538": "538",
      },
    },
  },
  plugins: [],
};
export default config;
