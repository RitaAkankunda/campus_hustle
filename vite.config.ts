import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath, URL } from 'node:url';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Use React Fast Refresh
      fastRefresh: true,
    }),
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
    include: [
      'react',
      'react-dom',
      'react/jsx-runtime',
      'react-router-dom',
      'react-helmet-async',
    ],
    force: true, // Force re-optimization
    esbuildOptions: {
      target: 'esnext',
      jsx: 'automatic',
    },
  },
  resolve: {
    alias: {
      // Force all react/react-dom imports to the workspace node_modules to avoid duplicate copies
      react: path.resolve(fileURLToPath(new URL('.', import.meta.url)), 'node_modules/react'),
      'react-dom': path.resolve(fileURLToPath(new URL('.', import.meta.url)), 'node_modules/react-dom'),
      'react/jsx-runtime': path.resolve(fileURLToPath(new URL('.', import.meta.url)), 'node_modules/react/jsx-runtime'),
    },
    dedupe: ['react', 'react-dom', 'react/jsx-runtime'],
  },
  server: {
    fs: {
      // Allow access to files outside the project root
      strict: false,
    },
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
      },
    },
  },
  build: {
    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true,
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
        },
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
  },
});
