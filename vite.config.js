import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/tecnico': {
        target: 'http://34.9.38.255:8080',
        changeOrigin: true,
        secure: false,
      },
      '/chatbot': {
        target: 'http://34.9.38.255:8080',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
