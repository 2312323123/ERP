import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  preview: {
    port: 8080,
    strictPort: true,
host: true,
  },
  server: {
    port: 8080,
    strictPort: true,
    host: true,
    // origin: "http://localhost:8080",
    watch: {
      usePolling: true,
    },
  },
})
