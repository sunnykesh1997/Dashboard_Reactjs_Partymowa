import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.JPG'],
  server: {
    proxy: {
      '/api': 'http://localhost:5000',
    },
  },
  // Additional configuration to ensure proper resolution of external modules
  resolve: {
    alias: {
      'react-icons/fa': 'react-icons/fa',
      'react-icons/io5': 'react-icons/io5',
    },
  },
});
