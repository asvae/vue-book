<template>
  <VbDemo>
    <VbCard title="type" width="250px">
      <div
        v-for="(value, key) in valueList"
        :class="{active: valueSelected === key}"
        @click="valueSelected = key"
        v-text="key"
      />
    </VbCard>
    <VbCard :title="valueSelected" width="250px">
      <ListFolder :folder="valueList[valueSelected]"/>
    </VbCard>

    <VbCard>
      <label>
        Hide file extensions
        <input type="checkbox" v-model="treeOptions.hideFileExtensions">
      </label>
    </VbCard>
  </VbDemo>
</template>

<script setup lang="ts">
import VbDemo from '../exposed/VbDemo.vue'
import VbCard from '../exposed/VbCard.vue'
import ListFolder from './ListFolder.vue'
import DemoFolderFactory from '../../classes/Factory/DemoFolderFactory'
import { provide, reactive, ref } from 'vue'
import {
  VueBookTreeOptions,
  VueBookTreeOptionsInterface,
} from '../DemoPage/VueBookTreeOptions'

const valueList = reactive({
  empty: DemoFolderFactory.getEmpty(),
  withFolders: DemoFolderFactory.getWithFolders(),
  withFiles: DemoFolderFactory.getWithFiles(),
  withFilesAndFolders: DemoFolderFactory.getWithFoldersAndFiles(),
})

const valueSelected = ref<keyof typeof valueList>('empty')

const treeOptions = reactive(new VueBookTreeOptions)
provide(VueBookTreeOptionsInterface, treeOptions)
</script>
