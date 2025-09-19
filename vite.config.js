import { defineConfig } from 'vite'

export default defineConfig({
  base: '/galaxy-spiral/', // Match GitHub repo name exactly
  build: {
    outDir: 'build' // Optional — only if you want `build` instead of `dist`
  },
})
