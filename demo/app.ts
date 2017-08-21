import Vue, {ComponentOptions} from 'vue'
import App from './App.vue'

// NOTE Weird hack to make TypeScript compiler happy.
const componentOptions = App as ComponentOptions<Vue>

new Vue(componentOptions).$mount('#app')