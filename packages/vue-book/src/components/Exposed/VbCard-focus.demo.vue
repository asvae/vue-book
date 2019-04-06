<template>
  <VbDemo>
    <VbCard focus title="Should be displayed" color="green"/>
    <VbCard focus title="Should be displayed" color="green"/>
    <VbCard title="Should not be displayed" color="red"/>
    <VbCard focus title="Should be displayed" color="green"/>
    <VbCard title="Should not be displayed" color="red"/>
    <VbCard title="Should not be displayed" color="red"/>
  </VbDemo>
</template>

<script>
import VbDemo from './VbDemo'
import VbCard from './VbCard'

export default {
  components: {
    VbCard,
    VbDemo,
  }
}
</script>
