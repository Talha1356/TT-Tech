import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// ✅ Fixed configuration for Netlify deployment
export default defineConfig({
  plugins: [react()],
  
  // This ensures correct paths for assets on Netlify
  base: './',

  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
});
