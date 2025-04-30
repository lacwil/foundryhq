import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// 👇 This enables API proxying in dev and allows Vercel to handle API routes
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      }
    }
  }
});
