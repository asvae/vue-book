<template>
  <span class="RefreshCounter">
    {{refreshCounter}}
  </span>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

let refreshCounter = 0

@Component({})
export default class RefreshCounter extends Vue {
  created() {
    console.log('created')
  }
  get refreshCounter () {
    return ++refreshCounter
  }
}
</script>
