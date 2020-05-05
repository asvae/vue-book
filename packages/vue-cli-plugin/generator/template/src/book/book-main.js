import Vue from 'vue'
import BookApp from './BookApp.vue'

Vue.config.productionTip = false
Vue.config.devtools = true
Vue.config.performance = true

new Vue({
  render: h => h(BookApp),
}).$mount('#app')
