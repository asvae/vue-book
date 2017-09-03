<template>
    <div class="resize-line"
         draggable
         @drag="onDrag"
    />
</template>

<script>
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
      }
    },
    methods: {
      onDrag (event: DragEvent) {
        // No idea how, but this works.
        if (event.screenX) {
          this.$emit('input', event.clientX - 22)
        }
      },
    }
  }
</script>

