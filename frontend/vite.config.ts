import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

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
    // proxy: {
    //   // All routes not matched by an existing file will be rewritten to `index.html`
    //   '^/.*': {
    //     target: '/',
    //     rewrite: (path) => '/index.html',
    //   },
    // },
  },
})
