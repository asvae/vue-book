<template>
  <VbDemo>
    <VbCard>
      <ComButtonIcon
        @click.native="active = ! active"
        icon="server"
        :active="active"
      />
      <ComButtonIcon
        @click.native="active = ! active"
        icon="server"
        :active="! active"
      />
    </VbCard>
  </VbDemo>
</template>

<script setup lang="ts">
import ComButtonIcon from './VbButtonIcon.vue'
import { ref } from 'vue'

const active = ref(false)
</script>
