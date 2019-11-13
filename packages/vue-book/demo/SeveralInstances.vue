<template>
  <div class="SeveralInstances">
    <vue-book/>
    <vue-book/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { createComponent } from '../src/app'

@Component({
  components: {
    VueBook: createComponent({
      requireContext: require.context('./tree', true, /.vue$/),
      hideFileExtensions: true,
    })
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
