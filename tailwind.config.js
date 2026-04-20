/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
  // Use a prefix to avoid collisions with consumer's CSS if they also use Tailwind
  // But since we want "extract precisely", maybe no prefix for now unless needed.
  // Prefixing is safer for libraries: prefix: 'cl-',
};
