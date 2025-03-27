import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/Ambiknight_small/',
  esbuild: {
    loader: 'jsx',
  },
  
   build: {
    outDir: 'docs/dist',
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },
});
