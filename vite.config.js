import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/projects/svelte-d3-charts",
  build: {
    outDir: 'dist'
  },
  plugins: [svelte()],
})
