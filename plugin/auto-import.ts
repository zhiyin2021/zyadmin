import { fileURLToPath, URL } from 'node:url'
import autoImport from 'unplugin-auto-import/vite'

// 自动载入插件的api
export default function createAutoImport() {
  return autoImport({
    dts: 'src/auto-imports.d.ts',
    dirs: ['src/plugins', 'src/api'],
    // 自动载入下面插件的api，按需自己加
    imports: ['vue', 'vue-router', 'pinia'],
    eslintrc: {
      enabled: true,
      filepath: fileURLToPath(new URL('../../.eslintrc-auto-import.json', import.meta.url)),
      globalsPropValue: true,
    }
  })
}
