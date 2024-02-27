import Components from 'unplugin-vue-components/vite';
// import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';


// 自动载入自己写的组件
export default function createComponents() {
  return Components({
    dts: 'src/components.d.ts',
    // 只自动引入components第一层文件夹的组件，不深度变量子目录，如果组件是多文件的，需要自己自定义，要不然会导致所有组件里的小组件也会变成全局组件
    dirs: ['src/components/*' ],
    deep: false,
    extensions: ['vue', 'tsx'],
    resolvers: [
      // antd vue 组件全局按需自动引入
      // AntDesignVueResolver({
      //   importStyle: 'less', // 配置用less 还是 sass
      // }),
      //ElementPlus 组件全局按需自动引入
      ElementPlusResolver({
        importStyle: 'sass', // 配置用less 还是 sass
      }),
    ],
  })
}
