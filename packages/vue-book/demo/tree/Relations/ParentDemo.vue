<template>
  <div>
    <vm-parent/>
  </div>
</template>
<vm-parent/>

<script>
import VmParent from '../../components/Parent.vue'

export default {
  $componentTree: {
    component: VmParent,
  },
  components: { VmParent },
}
</script>

