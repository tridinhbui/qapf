import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base matches the GitHub Pages path: https://tridinhbui.github.io/qapf/
export default defineConfig({
  plugins: [react()],
  base: '/qapf/',
})
