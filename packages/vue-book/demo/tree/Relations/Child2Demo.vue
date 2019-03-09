<template>
    <div>
        <vm-child2/>
    </div>
</template>

<script>
  import VmChild2 from '../../components/Child2.vue'

  export default {
    $componentTree: {
      component: VmChild2,
    },
    components: { VmChild2 }
  }
</script>

