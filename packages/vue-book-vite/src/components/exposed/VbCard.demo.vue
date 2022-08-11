<template>
  <VbDemo>
    <VbCard>
      Default
    </VbCard>
    <VbCard no-padding>
      No padding
    </VbCard>
    <VbCard dashed>
      Dashed
    </VbCard>
    <VbCard title="Title">
      Content
    </VbCard>
    <VbCard no-padding title="No padding + title">
      Content
    </VbCard>
    <VbCard title="Title" refresh>
      With title and refresh
    </VbCard>
    <VbCard refresh>
      <div style="background-color: #1fc8db; height: 100%; width: 150px">Refresh
        (
        <RefreshCounter/>
        )
      </div>
    </VbCard>
    <VbCard height="100px" width="150px">
      150x100
    </VbCard>
    <VbCard title="Dark" dark refresh dashed>
      <span style="color: white">Content</span>
    </VbCard>
    <VbCard title="Color" refresh color="orange">
      Content
    </VbCard>
    <VbCard title="Dark + color" dark refresh color="orange">
      <span style="color: white">Content</span>
    </VbCard>
    <VbCard
      title="state"
      :state="{value: false}"
      #default="{state}"
    >
      <input type="checkbox" v-model="state.value">
      {{ state.value }}
    </VbCard>
    <VbCard error title="error">
      Error
    </VbCard>
  </VbDemo>
</template>

<script setup lang="ts">
import VbDemo from './VbDemo.vue'
import VbCard from './VbCard.vue'
import RefreshCounter from './__demo__/RefreshCounter.vue'
</script>

