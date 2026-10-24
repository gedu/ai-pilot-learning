/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    // globals: true hace que React Testing Library se auto-limpie entre tests
    // (necesita el afterEach global). Sin esto, el DOM del test anterior queda montado.
    globals: true,
    setupFiles: './src/test/setup.ts',
    css: false,
  },
});
