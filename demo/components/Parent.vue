<template>
    <div>
        <h3>I am {{$options.name}}</h3>
        <vm-child1/>
        <vm-child2/>
        <vm-child-without-demo1/>
        <vm-child-without-demo2/>
    </div>
</template>

<script>
  import VmChild1 from './Child1.vue'
  import VmChild2 from './Child2.vue'
  import VmChildWithoutDemo1 from './ChildWithoutDemo1.vue'
  import VmChildWithoutDemo2 from './ChildWithoutDemo2.vue'

  export default {
    name: 'VmParent',
    components: {
      VmChildWithoutDemo2,
      VmChildWithoutDemo1,
      VmChild2,
      VmChild1
    },
  }
</script>