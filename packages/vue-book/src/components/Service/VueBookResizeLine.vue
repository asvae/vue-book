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
import { Vue, Options } from 'vue-class-component'
import { Prop } from 'vue-property-decorator'

@Options({
  emits: ['update:modelValue'],
})
export default class VueBookResizeLine extends Vue {
  startValue = 0
  startCoordinate = 0
  @Prop({ type: Number, required: true }) modelValue!: number
  @Prop({ type: Boolean, default: false }) isHorizontal!: boolean

  onDrag (event: DragEvent): void {
    // No idea how, but this works.
    if (this.isHorizontal) {
      if (event.screenY) {
        const totalHeight = document.documentElement.clientHeight
        this.$emit('update:modelValue', totalHeight - (event.clientY))
      }
      return
    }

    if (event.screenX) {
      this.$emit('update:modelValue', event.clientX)
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
