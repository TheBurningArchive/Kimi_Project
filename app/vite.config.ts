import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { inspectAttr } from 'kimi-plugin-inspect-react'

// https://vite.dev/config/
export default defineConfig({
  // For GitHub Pages: replace '/your-repo-name/' with your actual repository name
  // Example: if your repo is 'the-burning-archive', use base: '/the-burning-archive/'
  // For custom domain, use: base: '/'
  base: '/',
  plugins: [inspectAttr(), react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
