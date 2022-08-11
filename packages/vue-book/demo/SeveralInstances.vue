<template>
  <div class="SeveralInstances">
    <vue-book />
    <vue-book />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { createComponent } from '../src/app'

@Options({
  components: {
    VueBook: createComponent({
      requireContext: require.context('./tree', true, /.vue$/),
      hideFileExtensions: true,
    }),
  },
})
export default class SeveralInstances extends Vue {

}
</script>

<style lang="scss">
.SeveralInstances {
  display: flex;
  height: 100%;

  .vue-book-root {
    position: unset;
    height: 100%;
  }
}
</style>
