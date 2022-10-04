import { defineConfig, splitVendorChunkPlugin } from 'vite';
import react from '@vitejs/plugin-react';

import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  
  plugins: [
    react({
      include: ['src/*'],
      exclude: ['node_modules'],
    }),
    splitVendorChunkPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  preview: {
    port: 3000,
  },
  server: {
    port: 3000,
  },
});
