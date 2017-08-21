<template>
    <div>
        <h3>I am {{$options.name}}</h3>
        <vm-child1></vm-child1>
        <vm-child2></vm-child2>
    </div>
</template>

<script>
  import VmChild1 from './Child1.vue'
  import VmChild2 from './Child2.vue'

  export default {
    name: 'VmParentWithoutDemo',
    components: {
      VmChild2,
      VmChild1
    },
  }
</script>

