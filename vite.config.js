import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'

const server = 'https://challenge-based-face-recognition-hnc5a2axefaehmfj.eastus-01.azurewebsites.net'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: server,
        changeOrigin: true,
        // secure: false, // 👈 ignore SSL errors (only for development)
        rewrite: (path) => path.replace(/^\/api/, ''),
      }
    }
  }
})


// import {defineConfig} from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from "tailwindcss";

// const server = 'http://localhost:5000';

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react(), tailwindcss()],
//   server: {
//     proxy: {
//       '/api': {
//         target: server,
//         rewrite: (path) => path.replace(/^\/api/, ''),
//       }
//     },
//   },
// })
