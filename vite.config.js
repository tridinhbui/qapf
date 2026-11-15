import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages serves under /qapf/; Vercel and local dev serve at /
export default defineConfig({
  plugins: [react()],
  base: process.env.GITHUB_ACTIONS ? '/qapf/' : '/',
})
