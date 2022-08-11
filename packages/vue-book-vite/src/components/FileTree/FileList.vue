<template>
  <div class="FileList">
    <div
      class="FileList__node"
      v-for="file in props.files"
      :key="file.path"
      :class="{'FileList__node--pre-selected': filePreSelected(file)}"
      @click="emit('selected')"
    >
      <ListItem :file="file"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import { TreeFile } from '../../classes/Main/TreeFile'
import { ListCursor } from './ListCursor'
import ListItem from './ListItem.vue'
import { onMounted, toRaw } from 'vue'

const emit = defineEmits(['selected'])
const props = defineProps<{
  listCursor: ListCursor,
  files: TreeFile[],
}>()

const filePreSelected = (file: TreeFile): boolean => {
  return toRaw(props.listCursor.preSelectedItem) === file
}
</script>

<style>
:root {
  --color--main: #1fc8db;
  --color--white: white;
}

.FileList {
  height: 100%;
  background-color: var(--color--white);
  overflow: auto;
}

.FileList__node--pre-selected {
  background-color: var(--color--main);
}
</style>
