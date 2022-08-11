<template>
  <div class="ListFolder">
    <div class="ListFolder__header" @click="props.folder.toggle()">
      <div class="ListFolder__header__caret">
        <VbIcon
          v-if="props.folder.isOpen"
          name="caret-down"
        />
        <VbIcon
          v-else
          name="caret-right"
        />
      </div>

      <VbIcon
        class="ListFolder__header__icon"
        name="folder"
      />

      <div class="ListFolder__title">
        <span>{{ props.folder.name }}</span>
      </div>
    </div>

    <div
      class="ListFolder__insides"
      v-if="props.folder.isOpen && ! props.folder.isEmpty()"
    >
      <ListFolder
        v-for="child in props.folder.folders"
        :key="generateKey()"
        :folder="child"
        ref="folders"
      />
      <ListItem
        v-for="file in props.folder.files"
        :key="generateKey()"
        :file="file"
      />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'ListFolder',
}
</script>

<script setup lang="ts">
import ListItem from './ListItem.vue'

import { TreeFolder } from '../../classes/Main/TreeFolder'
import { ObjectHelpers } from 'asva-helpers'
import VbIcon from '../DemoPage/ButtonIcon/VbIcon.vue'
import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'

const props = defineProps<{ folder: TreeFolder }>()

const router = useRouter()
const route = useRoute()

const folders = ref<any[] | null>(null)

const openSelected = (): void => {
  const foldersChain = ObjectHelpers
    .traverseBranch(props.folder, { path: route.path })
    .filter(item => {
      return (item instanceof TreeFolder)
    })

  if (foldersChain.length) {
    props.folder.isOpen = true
  }

  if (foldersChain.length > 1) {
    setTimeout(() => {
      if (!folders.value) return
      const folderComponent = folders.value.find(folderComponent => folderComponent.folder === foldersChain[1])
      folderComponent && folderComponent.openSelected()
    })
  }
}

const generateKey = (): number => {
  return Math.floor(Math.random() * 1e8)
}

defineExpose({
  openSelected
})
</script>

<style>
.ListFolder__header {
  cursor: pointer;
  display: flex;
}

.ListFolder__header__caret {
  flex: 0 0 14px;
  width: 14px;
  width: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.ListFolder__header__icon {
  flex: 0 0 18px;
  height: 18px;
  width: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #656192;
  margin-left: 3px;
  margin-right: 5px;
}

.ListFolder__insides {
  padding-left: 16px;
}
</style>
