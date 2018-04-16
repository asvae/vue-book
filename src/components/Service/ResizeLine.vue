<template>
    <div class="resize-line"
         :class="{'resize-line--is-horizontal': isHorizontal}"
         draggable
         @drag="onDrag"
    />
</template>

<script lang="ts">
  export default {
    name: 'VmResizeLine',
    data () {
      return {
        startValue: 0,
        startCoordinate: 0,
      }
    },
    props: {
      value: {
        type: Number,
        required: true,
      },
      isHorizontal: {
        type: Boolean,
        default: false,
      },
    },
    methods: {
      onDrag (event: DragEvent) {
        // No idea how, but this works.
        if (this.isHorizontal) {
          if (event.screenY) {
            const totalHeight = document.documentElement.clientHeight
            this.$emit('input', totalHeight - (event.clientY))
          }
          return
        }

        if (event.screenX) {
          this.$emit('input', event.clientX - 22)
        }
      },
    }
  }
</script>

