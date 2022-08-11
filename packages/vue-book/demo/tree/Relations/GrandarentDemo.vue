<template>
  <div>
    <vm-grandparent/>
  </div>
</template>
<vm-parent/>

<script>
import VmGrandparent from '../../components/Grandparent.vue'

export default {
  $componentTree: {
    component: VmGrandparent,
  },
  components: { VmGrandparent },
}
</script>

