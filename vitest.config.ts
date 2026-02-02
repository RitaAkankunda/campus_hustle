/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [
    react({
      fastRefresh: true,
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
  },
  resolve: {
    alias: {
      react: path.resolve(fileURLToPath(new URL('.', import.meta.url)), 'node_modules/react'),
      'react-dom': path.resolve(fileURLToPath(new URL('.', import.meta.url)), 'node_modules/react-dom'),
      'react/jsx-runtime': path.resolve(fileURLToPath(new URL('.', import.meta.url)), 'node_modules/react/jsx-runtime'),
    },
    dedupe: ['react', 'react-dom', 'react/jsx-runtime'],
  },
})