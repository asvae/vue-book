<template>
  <VbDemo>
    <VbContainer>
      Default container
    </VbContainer>
    <VbContainer no-padding>
      No padding
    </VbContainer>
    <VbContainer dashed>
      Dashed
    </VbContainer>
    <VbContainer title="With title">
      With title
    </VbContainer>
    <VbContainer title="With title" refresh>
      With title and refresh
    </VbContainer>
    <VbContainer refresh height="100px" width="300px">
      <div style="background-color: #1fc8db; height: 100%; width: 150px">With refresh</div>
    </VbContainer>
  </VbDemo>
</template>

<script>
import VbDemo from './VbDemo'
import VbContainer from './VbContainer'

export default {
  components: {
    VbContainer,
    VbDemo,
  }
}
</script>
