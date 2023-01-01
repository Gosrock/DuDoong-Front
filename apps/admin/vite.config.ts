import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@pages', replacement: '/src/components/pages' },
      { find: '@blocks', replacement: '/src/components/blocks' },
      { find: '@lib', replacement: '/src/lib' },
      { find: '@store', replacement: '/src/store' },
    ],
  },
});
