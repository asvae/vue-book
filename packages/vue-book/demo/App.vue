<template>
  <div class="App">
    <router-view />
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import VbPage from '../src/components/DemoPage/VbPage.vue'
import router from './routes'

@Options({
  router,
  components: { VbPage },
})
export default class App extends Vue {
}
</script>
