/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(() => ({
  base: './',
  plugins: [
    svgr({
      exportAsDefault: true,
    }),
    react(),
  ],
  resolve: {
    alias: {
      src: path.resolve(__dirname, './src'),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  server: {
    host: true,
    port: 5000,
  },
  define: {
    'import.meta.vitest': 'undefined',
  },
  test: {
    coverage: {
      reporter: ['text', 'json-summary', 'json'],
      reportOnFailure: true,
    },
    globals: true,
    includeSource: ['src/**/*.test.{ts}'],
  },
}))
