import { createApp, h } from 'vue'
import App from './App.vue'
// vue-x
import router from './router'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

// less
import '@/assets/less/base.less'

// t-design
import TDesign from 'tdesign-vue-next'
import 'tdesign-vue-next/es/style/index.css'
import 'tdesign-vue-next/dist/reset.css'
import { PermissionDirective } from './directives/permission'

// echarts
import { plugin } from 'echarts-for-vue'
import * as echarts from 'echarts'

// create app
const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(router)
app.use(pinia)
app.use(plugin, { echarts, h })
app.use(TDesign)
app.directive('permission', PermissionDirective)

export default app
