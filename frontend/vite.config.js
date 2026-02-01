import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    cors: {
      origin: 'http://192.168.1.198',
    },
  },
  plugins: [react()],
})
