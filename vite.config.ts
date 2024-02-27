import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { vitePluginSvg } from "@webxrd/vite-plugin-svg"
import { resolve } from 'path'
import createVitePlugins from './plugin'

const alias: Record<string, string> = {
  '@': resolve(__dirname, ".", "src")
}

// https://vitejs.dev/config/
export default defineConfig({

  base: './',
  resolve: {
    alias
  },
  server: {
    port: 3001,
    host: '0.0.0.0',
    open: true,
    proxy: { // 代理配置
      '/api/': 'http://127.0.0.1:8086/api/'
    },
  },
  plugins: [
    vue(),
    vitePluginSvg({
      // 必要的。必须是绝对路径组成的数组。
      iconDirs: [
        resolve(__dirname, 'src/assets/svg'),
      ],
      // 必要的。入口script
      main: resolve(__dirname, 'src/main.js'),
      symbolIdFormat: 'icon-[name]'
    }),
    createVitePlugins(),
  ],
})
