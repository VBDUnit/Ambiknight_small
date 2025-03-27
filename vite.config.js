import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/Ambiknight_small/',
  build: {
    outDir: 'docs',
  },
});
