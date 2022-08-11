<template>
  <VbDemo>
    <VbCard title="default">
      <PageMenu
        style="width: 300px"
        :config="config"
      />
    </VbCard>
    <VbCard title="with current file">
      <PageMenu
        style="width: 300px"
        :config="config"
        :currentFile="currentFile"
        @openFolder="log('openFolder')"
      />
    </VbCard>
  </VbDemo>
</template>

<script setup lang="ts">
import VbDemo from '../exposed/VbDemo.vue'
import VbCard from '../exposed/VbCard.vue'
import PageMenu from './PageMenu.vue'
import DemoPageConfig from './DemoPageConfig'
import { ref } from 'vue'
import { TreeFile } from '../../classes/Main/TreeFile'

const config = ref(new DemoPageConfig())
const currentFile = new TreeFile()

const log = console.log
</script>
