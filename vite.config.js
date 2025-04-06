import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "tailwindcss";

const server = 'http://localhost:5000';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: server,
        rewrite: (path) => path.replace(/^\/api/, ''),
      }
    },
  },
})
