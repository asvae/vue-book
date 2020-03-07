<template>
  <div
    class="VueBookResizeLine"
    :class="{'VueBookResizeLine--is-horizontal': isHorizontal}"
    draggable
    @drag="onDrag"
  >

  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({})
export default class VueBookResizeLine extends Vue {
  startValue = 0
  startCoordinate = 0
  @Prop({ type: Number, required: true }) value!: number
  @Prop({ type: Boolean, default: false }) isHorizontal!: boolean

  onDrag (event: DragEvent): void {
    // No idea how, but this works.
    if (this.isHorizontal) {
      if (event.screenY) {
        const totalHeight = document.documentElement.clientHeight
        this.$emit('input', totalHeight - (event.clientY))
      }
      return
    }

    if (event.screenX) {
      this.$emit('input', event.clientX)
    }
  }
}
</script>

<style lang="scss">
@import "../../scss/resources";

.VueBookResizeLine {
  width: 4px;
  cursor: col-resize;

  &--is-horizontal {
    cursor: row-resize;
  }
}
</style>
