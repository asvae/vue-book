<template>
  <div>
    Component
  </div>
</template>

<script>
export default {
  created () {
    console.log('created 20')
  },
  beforeRouteUpdate (to, from, next) {
    console.log('beforeRouteUpdate 20')
    next()
  },
}
</script>
