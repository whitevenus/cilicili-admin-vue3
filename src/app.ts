import { createApp } from 'vue'
import App from './App.vue'
// vue-x
import router from './router'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

// ElementPlus
import TDesign from 'tdesign-vue-next'
import 'tdesign-vue-next/es/style/index.css'
import 'tdesign-vue-next/dist/reset.css'
import { PermissionDirective } from './directives/permission'

// create app
const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)
app.use(TDesign)
app.directive('permission', PermissionDirective)

export default app
