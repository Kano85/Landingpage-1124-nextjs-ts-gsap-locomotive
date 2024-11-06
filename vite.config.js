import { defineConfig } from 'vite';

export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler', // Set to "modern-compiler" or "modern"
      },
    },
  },
});
