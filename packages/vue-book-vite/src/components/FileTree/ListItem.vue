<template>
  <div
    class="ListItem"
    :class="isActive && 'ListItem--active'"
    @click="select()"
  >
    <VbIcon class="ListItem__icon" name="file"/>
    <span class="ListItem__file-name">
      {{ name }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { TreeFile } from '../../classes/Main/TreeFile'
import {
  VueBookTreeOptions,
  VueBookTreeOptionsInterface,
} from '../DemoPage/VueBookTreeOptions'
import VbIcon from '../DemoPage/ButtonIcon/VbIcon.vue'
import { computed, defineProps, inject } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const vueBookTreeOptions = inject<VueBookTreeOptions>(VueBookTreeOptionsInterface)

if (vueBookTreeOptions === undefined) {
  throw new Error(`${VueBookTreeOptionsInterface} inject didn't happen`)
}

const router = useRouter()
const route = useRoute()

const props = defineProps<{ file: TreeFile }>()

const name = computed(() => {
  if (vueBookTreeOptions.hideFileExtensions) {
    return props.file.getFilenameWithoutExtension()
  }
  return props.file.getFilename()
})

const isActive = computed(() => {
  if (vueBookTreeOptions.noRouter) {
    return vueBookTreeOptions.selectedTreeFile === props.file
  }

  return route.path === props.file.path
})

const select = (): void => {
  console.log('select triggered')

  if (vueBookTreeOptions.noRouter) {
    vueBookTreeOptions.selectedTreeFile = props.file as TreeFile
    return
  }

  if (route?.path === props.file.path) {
    return
  }

  router.push({path: props.file.path})
}
</script>

<style>
:root {
  --color--main: #1fc8db;
  --color--main--dark: #0f626b;
  --color--main--light: #e4f9fb;
  --color--icon: #829268;
}

.ListItem {
  padding-top: 2px;
  padding-bottom: 1px;
  justify-content: center;
  align-items: center;

  cursor: pointer;
  color: black;
  white-space: nowrap;
  display: block;
}

.ListItem.ListItem--active {
  background-color: var(--color--main--dark);
}

.ListItem.ListItem--active .ListItem__file-name {
  color: var(--color--main--light);
}

.ListItem__icon {
  color: var(--color--icon);
  margin-left: 3px;
  margin-right: 3px;
}
</style>
