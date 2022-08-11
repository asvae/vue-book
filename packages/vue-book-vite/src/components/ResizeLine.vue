<template>
  <div
    class="ResizeLine"
    :class="{'ResizeLine--is-horizontal': isHorizontal}"
    draggable
    @drag="onDrag"
  />
</template>

<script setup lang="ts">
// TODO Needs demo
// TODO Selects text sometimes on drag
const emit = defineEmits(['update:modelValue'])
const props = defineProps<{
  modelValue: number,
  isHorizontal?: boolean
}>()

const onDrag = (event: DragEvent): void => {
  // No idea how, but this works.
  if (props.isHorizontal) {
    if (event.screenY) {
      const totalHeight = document.documentElement.clientHeight
      emit('update:modelValue', totalHeight - (event.clientY))
    }
    return
  }

  if (event.screenX) {
    emit('update:modelValue', event.clientX)
  }
}
</script>

<style>
.ResizeLine {
  width: 4px;
  cursor: col-resize;
}

.ResizeLine--is-horizontal {
  cursor: row-resize;
}
</style>
