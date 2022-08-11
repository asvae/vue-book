<template>
  <VbDemo>
    <VbCard>
      <FileList
        :files="files"
        :listCursor="listCursor"
      />
    </VbCard>
  </VbDemo>
</template>

<script setup lang="ts">
import FileList from './FileList.vue'
import VbDemo from '../exposed/VbDemo.vue'
import VbCard from '../exposed/VbCard.vue'
import { TreeFileFactory } from '../../classes/Factory/TreeFileFactory'
import { ListCursor } from './ListCursor'
import { provide, reactive, ref } from 'vue'
import { TreeFile } from '../../classes/Main/TreeFile'
import {
  VueBookTreeOptions,
  VueBookTreeOptionsInterface,
} from '../DemoPage/VueBookTreeOptions'

const files = ref<TreeFile[]>([
  TreeFileFactory.getWithShortPath(),
  TreeFileFactory.getWithLongPath(),
])

const listCursor = ref(new ListCursor({
  preSelectedItem: files.value[1],
}))

const treeOptions = reactive(new VueBookTreeOptions)
provide(VueBookTreeOptionsInterface, treeOptions)
</script>
