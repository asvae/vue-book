<template>
  <VbDemo>
    <VbCard style="width: 300px">
      <ListItem :file="treeFile" />
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
import { TreeFileFactory } from '../../classes/Factory/TreeFileFactory'
import ListItem from './ListItem.vue'
import { provide, reactive } from 'vue'
import {
  VueBookTreeOptions,
  VueBookTreeOptionsInterface,
} from '../DemoPage/VueBookTreeOptions'

const treeOptions = reactive(new VueBookTreeOptions)

provide(VueBookTreeOptionsInterface, treeOptions)

const treeFile = TreeFileFactory.getWithShortPath()
</script>
