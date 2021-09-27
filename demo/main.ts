import { createApp } from 'vue'
import { VueBookComponents } from '../src/app'
import App from './App.vue'
import router from './routes'

const app = createApp(App)
app.use(VueBookComponents)
app.use(router)
// Vue.config.productionTip = false
app.mount('#app')
