import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // For GitHub Pages deployment (username.github.io)
  // Leave base as '/' for user/organization pages
  base: '/',
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
})
