<template>
  <div>
    Component
  </div>
</template>

<script>
export default {
  created () {
    console.log('created 2')
  },
  beforeRouteUpdate (to, from, next) {
    console.log('beforeRouteUpdate 2')
    next()
  },
}
</script>
