/// <reference types="vitest" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'url';
import eslint from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      'test-utils': fileURLToPath(
        new URL('./src/helpers/test-utils.tsx', import.meta.url)
      ),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      reporter: ['text', 'json', 'html'],
      provider: 'c8',
    },
    setupFiles: ['./vitest.setup.ts'],
  },
});
