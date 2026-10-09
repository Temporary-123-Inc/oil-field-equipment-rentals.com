import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: false,
    assetsInlineLimit(filePath) {
      // Small font subsets must remain same-origin files for font-src 'self'.
      if (/\.(?:woff2?|ttf|otf|eot)$/i.test(filePath)) return false;
      return undefined;
    },
  },
});
