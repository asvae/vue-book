<template>
  <div class="App">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import router from './routes'

@Component({ router })
export default class App extends Vue {
}
</script>
