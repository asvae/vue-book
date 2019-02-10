<template>
  <VbDemo>
    <VbContainer title="Introspection">
      <VbIntrospect
        :component="IntrospectComponentExample"
      />
    </VbContainer>
    <VbContainer title="Actual component">
      <IntrospectComponentExample
        :objectArrayRequired="[]"
      />
    </VbContainer>
  </VbDemo>
</template>

<script>
import VbIntrospect from './VbIntrospect.vue'
import IntrospectComponentExample from './IntrospectComponentExample'

export default {
  components: { IntrospectComponentExample, VbIntrospect },
  computed: {
    IntrospectComponentExample: () => IntrospectComponentExample,
  },
}
</script>