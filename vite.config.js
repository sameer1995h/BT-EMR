import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs-extra';

// Copy _redirects file after build
const copyRedirects = () => {
  return {
    name: 'copy-redirects',
    closeBundle: async () => {
      await fs.copy('public/_redirects', 'dist/_redirects');
    }
  }
}

export default defineConfig({
  plugins: [react(), copyRedirects()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'chart-vendor': ['chart.js', 'react-chartjs-2'],
        }
      }
    }
  },
  server: {
    port: 5173,
    strictPort: true,
    host: true
  }
});
