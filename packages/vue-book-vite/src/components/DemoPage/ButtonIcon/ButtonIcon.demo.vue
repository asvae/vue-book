<template>
  <VbDemo>
    <VbCard title="default">
      <ButtonIcon icon="server"/>
    </VbCard>
    <VbCard title="active">
      <ButtonIcon icon="server" active/>
    </VbCard>
  </VbDemo>
</template>

<script setup lang="ts">
import ButtonIcon from './ButtonIcon.vue'
import VbDemo from '../../exposed/VbDemo.vue'
import VbCard from '../../exposed/VbCard.vue'
</script>
