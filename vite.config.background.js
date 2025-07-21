import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'dist',
    emptyOutDir: false,
    lib: {
      entry: 'src/background.ts',
      name: 'background',
      fileName: 'background',
      formats: ['iife']
    },
    rollupOptions: {
      output: {
        entryFileNames: 'background.js',
        extend: true
      }
    }
  }
}); 