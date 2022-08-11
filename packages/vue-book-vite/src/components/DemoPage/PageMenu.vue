<template>
  <div class="PageMenu">
    <ButtonIcon
      class="PageMenu__icon"
      @click="props.config.mode = DemoPageMode.Tree"
      title="Mode: Tree"
      icon="server"
      :active="config.mode === DemoPageMode.Tree"
    />

    <ButtonIcon
      class="PageMenu__icon"
      @click="props.config.mode = DemoPageMode.Search"
      title="Mode: Search"
      icon="magnifying-glass"
      :active="config.mode === DemoPageMode.Search"
    />

    <div class="PageMenu__filler"></div>

    <template v-if="props.config.mode === DemoPageMode.Tree">
      <ButtonIcon
        v-if="props.currentFile"
        @click="emit('openFolder')"
        title="Expand from Current File"
        icon="circle-dot"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import ButtonIcon from './ButtonIcon/ButtonIcon.vue'
import { TreeFile } from '../../classes/Main/TreeFile'
import DemoPageConfig, { DemoPageMode } from './DemoPageConfig'

const emit = defineEmits(['openFolder'])
const props = defineProps<{
  currentFile?: TreeFile,
  config?: DemoPageConfig,
}>()
</script>

<style>
.PageMenu {
  display: flex;
}
.PageMenu__filler {
  flex: 1 0;
}
</style>
