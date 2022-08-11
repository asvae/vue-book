<template>
  <div class="TreeDemoFileList">
    <ListFolder :folder="props.folder"/>
  </div>
</template>

<script setup lang="ts">
import ListFolder from './ListFolder.vue'
import { TreeFolder } from '../../classes/Main/TreeFolder'

const props = defineProps<{
  folder: TreeFolder
}>()
</script>

<style>
:root {
  --color--main: #1fc8db;
}

.TreeDemoFileList {
  height: 100%;
  background-color: var(--color--main);
  overflow: auto;
}
</style>
