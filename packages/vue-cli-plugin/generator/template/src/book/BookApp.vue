<template>
  <router-view/>
</template>

<script>
import { createRoute, VueBookComponents } from 'vue-book'
import Vue from 'Vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
Vue.use(VueBookComponents)

const router = new VueRouter({
  routes: [
    createRoute({
      requireContext: require.context('../..', true, /.demo.vue$/),
      path: '',
      hideFileExtensions: true,
    }),
  ],
})

export default {
  name: 'BookApp',
  components: {
    router,
  },
}

</script>
