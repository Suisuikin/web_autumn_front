import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import basicSsl from '@vitejs/plugin-basic-ssl'
import path from 'path';

const BASE_PATH = process.env.GITHUB_PAGES ? '/web_autumn_front/' : '/';

export default defineConfig({
  plugins: [
    react(),
    basicSsl(),
    VitePWA({
       // ... ваш PWA конфиг ...
       registerType: 'autoUpdate',
       // ...
       manifest: {
         // ...
         name: 'Chrono Archives', // добавьте остальное из вашего файла
         // ...
         scope: BASE_PATH,
         start_url: BASE_PATH,
       }
    })
  ],

  base: BASE_PATH,

  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    minify: 'terser',
  },

  server: {
    port: 59830,
    host: true,
    strictPort: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      },
    },
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
