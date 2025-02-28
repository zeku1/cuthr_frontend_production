import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-green': '#F6E8D6',
         'custom-text': '#BFC89B', // Existing custom green color
      },
      fontFamily: {
        book: ["Arboria-Book", "sans-serif"], // Define font-book
        black: ["Arboria-Black", "sans-serif"], // Define font-black
      },
    },
  },
  plugins: [],
} satisfies Config;
