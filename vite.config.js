import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import images from './src/data/image-manifest.json'
import { personalInfo } from './src/data/content.js'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), {
    name: 'preload-portrait',
    transformIndexHtml() {
      const image = images[personalInfo.headshot]
      if (!image) return []
      return [{
        tag: 'link',
        attrs: {
          rel: 'preload',
          as: 'image',
          href: (image.variants.find(({ width }) => width >= 640) || image.variants.at(-1)).src,
          imagesrcset: image.variants.map(({ src, width }) => `${src} ${width}w`).join(', '),
          imagesizes: '(max-width: 1024px) 400px, 450px',
          fetchpriority: 'high',
        },
      }]
    },
  }],
  // For GitHub Pages deployment (username.github.io)
  // Leave base as '/' for user/organization pages
  base: '/',
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
})
