import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    fs: {
      // This tells Vite it is allowed to serve files from the root directory
      allow: ['..'] 
    }
  }
})