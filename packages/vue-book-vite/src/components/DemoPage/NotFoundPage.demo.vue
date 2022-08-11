<template>
  <VbDemo>
    <VbCard title="default">
      <NotFoundPage
        :files="treeFiles"
      />
    </VbCard>
  </VbDemo>
</template>

<script setup lang="ts">
import VbDemo from '../exposed/VbDemo.vue'
import VbCard from '../exposed/VbCard.vue'
import { TreeFile } from '../../classes/Main/TreeFile'
import NotFoundPage from './NotFoundPage.vue'

const treeFiles = [
  new TreeFile({
    path: '/123'
  }),
  new TreeFile({
    path: '/1234'
  }),
]
</script>
