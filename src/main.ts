import { createApp } from 'vue'
import App from './App.vue'
import './assets/reset.css'
import 'element-plus/theme-chalk/display.css' // 引入基于断点的隐藏类
import 'element-plus/theme-chalk/dark/css-vars.css'
import "element-plus/theme-chalk/src/message.scss";
import "element-plus/theme-chalk/src/message-box.scss";

import ElementPlus from 'element-plus'
import { createPinia } from 'pinia'
import router from './router'

const store = createPinia()
/** 权限路由处理主方法 */

const app = createApp(App)
app.use(store)
app.use(router)
app.use(ElementPlus)
app.mount('#app')
import './assets/style.scss'
