import { defineConfig } from 'tailwindcss';
import daisyui from 'daisyui';

export default defineConfig({
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
});
