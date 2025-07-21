import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'dist',
    emptyOutDir: false,
    lib: {
      entry: 'src/content.tsx',
      name: 'content',
      fileName: 'content',
      formats: ['iife']
    },
    rollupOptions: {
      output: {
        entryFileNames: 'content.js',
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    }
  }
});