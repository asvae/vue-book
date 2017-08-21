<template>
    <router-view></router-view>
</template>

<script lang="ts">
  import router from './routes.js'
  import Vue, {ComponentOptions} from 'vue'

  export default {
    data () {
      return {}
    },
    router,
  }
</script>
