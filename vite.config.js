import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver, } from 'unplugin-vue-components/resolvers'
import AutoImport from 'unplugin-auto-import/vite'
import { createHtmlPlugin } from "vite-plugin-html";

// https://vitejs.dev/config/
export default ({mode}) => {
  const ENV = loadEnv(mode, process.cwd())
  return defineConfig({
    plugins: [
      vue(),
      createHtmlPlugin({
        inject: {
          data: {
            title: ENV.VITE_APP_NAME,
          },
        },
      }),
      Components({
        types: [{
          from: 'vue-router',
          names: ['RouterLink', 'RouterView'],
        }],
        resolvers: [
          AntDesignVueResolver(),
        ],
      }),
      AutoImport({
        imports: [
          'vue',
          'vue-router'
        ],
        dirs: [
          './src/global/*',
        ],
        vueTemplate: true,
        eslintrc: {
          enabled: false,
        },
      }),
    ],
    server: {
      port: 3000,
      proxy: {
        '/index.php': {
          target: ENV.VITE_APP_HOST,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  })
}
