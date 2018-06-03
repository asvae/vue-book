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
      onDrag (event: DragEvent): void {
        const self: any = this
        // No idea how, but this works.
        if (self.isHorizontal) {
          if (event.screenY) {
            const totalHeight = document.documentElement.clientHeight
            self.$emit('input', totalHeight - (event.clientY))
          }
          return
        }

        if (event.screenX) {
          self.$emit('input', event.clientX - 22)
        }
      },
    }
  }
</script>

