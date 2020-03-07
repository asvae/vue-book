<template>
  <div>
    <vm-child1/>
  </div>
</template>

<script>
import VmChild1 from '../../components/Child1.vue'

export default {
  $componentTree: {
    component: VmChild1,
  },
  components: { VmChild1 },
}
</script>

