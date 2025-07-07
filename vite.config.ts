import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // forward all /api/* requests to your Express backend
      '/api': {
        target: 'https://newfashion-backend.onrender.com',
        changeOrigin: true,
      },
      // forward /uploads/* (your Multer‐served static files) as well
      '/uploads': {
        target: 'https://newfashion-backend.onrender.com',
        changeOrigin: true,
      },
    },
  },
})
