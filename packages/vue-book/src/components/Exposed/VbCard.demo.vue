<template>
  <VbDemo>
    <VbCard>
      Default container
    </VbCard>
    <VbCard no-padding>
      No padding
    </VbCard>
    <VbCard dashed>
      Dashed
    </VbCard>
    <VbCard title="With title">
      With title
    </VbCard>
    <VbCard title="With title" refresh>
      With title and refresh
    </VbCard>
    <VbCard refresh height="100px" width="300px">
      <div style="background-color: #1fc8db; height: 100%; width: 150px">With refresh</div>
    </VbCard>
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
