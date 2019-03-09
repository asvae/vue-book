<template>
  <div class="several-instances">
    <vue-book/>
    <vue-book/>
  </div>
</template>

<script lang="ts">
import { createComponent } from '../src/app'

export default {
  name: 'several-instances',
  components: {
    VueBook: createComponent({
      requireContext: require.context('./tree', true, /.vue$/),
      hideFileExtensions: true,
    })
  }
}
</script>

<style lang="scss">
.several-instances {
  display: flex;
  height: 100%;
  .vue-book-root {
    position: unset;
    height: 100%;
  }
}
</style>
