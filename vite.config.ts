import path from "node:path";

import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/",
  build: {
    rollupOptions: {
      input: {
        index: path.resolve(__dirname, "index.html"),
        "404": path.resolve(__dirname, "404.html"),
        dev: path.resolve(__dirname, "dev.html"),
        mus: path.resolve(__dirname, "mus.html"),
        bio: path.resolve(__dirname, "bio.html"),
      },
    },
  },
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
