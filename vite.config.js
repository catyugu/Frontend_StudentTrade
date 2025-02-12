import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import legacy from '@vitejs/plugin-legacy'
import vue2 from '@vitejs/plugin-vue2'
import Components from 'unplugin-vue-components/vite';
import { ElementUiResolver } from 'unplugin-vue-components/resolvers';

export default defineConfig({
  plugins: [
    vue2(),
    Components({
      resolvers: [ElementUiResolver()],
    }),
    legacy({
      targets: ['ie >= 11'],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime']
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://localhost:5173',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
