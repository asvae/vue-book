<template>
  <span class="RefreshCounter">
    {{ refreshCounter }}
  </span>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'

let refreshCounter = 0

@Options({})
export default class RefreshCounter extends Vue {
  created () {
    // eslint-disable-next-line no-console
    console.log('created')
  }

  get refreshCounter () {
    return ++refreshCounter
  }
}
</script>
