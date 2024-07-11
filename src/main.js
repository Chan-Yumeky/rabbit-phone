import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import App from './App.vue'
import router from './router/index.js'

//引入初始化样式资源
import '@/styles/common.scss'

//引入懒加载指令插件并注册
import { lazyPlugin } from '@/directives'
// 引入全局组件插件
import { componentPlugin } from "@/components/components_index.js";

const app = createApp(App)
const pinia = createPinia()
// 注册持久化插件
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)
app.use(ElementPlus,{zIndex:3000})
app.use(lazyPlugin)
app.use(componentPlugin)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.mount('#app')
