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
        background: "var(--background)",
        foreground: "var(--foreground)",
        home: "#50C878"
      },
      backgroundImage: {
        'process-background': "url('/back.png')",
        'choose-background': "url('/back_2.png')"
      },
    },
  },
  plugins: [],
};
export default config;
