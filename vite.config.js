import { defineConfig } from 'vite';

export default defineConfig({
  base: '/jump-by-voice-game/',
  server: {
    port: 5173,
    open: true
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    minify: 'esbuild',
    sourcemap: false
  }
});
