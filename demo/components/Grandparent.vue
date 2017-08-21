<template>
    <div>
        <h2>I am grandparent</h2>
        <vm-parent/>
        <vm-parent-without-demo/>
    </div>
</template>

<script>
  import VmParent from './Parent.vue'
  import VmParentWithoutDemo from './ParentWithoutDemo.vue'

  export default {
    components: {
      VmParent,
      VmParentWithoutDemo,
    },
    name: 'VmGrandparent',
  }
</script>

