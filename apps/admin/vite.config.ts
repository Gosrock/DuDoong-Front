import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin'],
      },
    }),
  ],
  resolve: {
    alias: [
      { find: '@pages', replacement: '/src/pages' },
      { find: '@blocks', replacement: '/src/blocks' },
      { find: '@lib', replacement: '/src/lib' },
      { find: '@store', replacement: '/src/store' },
    ],
  },
});
