<template>
  <div class="VbIcon">
    <component class="VbIcon__svg" :is="icons[props.name]"/>
  </div>
</template>

<script setup lang="ts">
import ServerSVG from './icons/ServerSVG.vue'
import BarsSVG from './icons/BarsSVG.vue'
import XmarkSVG from './icons/XmarkSVG.vue'
import ArrowLeftSVG from './icons/ArrowLeftSVG.vue'
import MagnifyingGlassSVG from './icons/MagnifyingGlassSVG.vue'
import CircleDotSVG from './icons/CircleDotSVG.vue'
import FileSVG from './icons/FileSVG.vue'
import FolderSVG from './icons/FolderSVG.vue'
import CaretDownSVG from './icons/CaretDownSVG.vue'
import CaretRightSVG from './icons/CaretRightSVG.vue'

const icons = {
  'server': ServerSVG,
  'bars': BarsSVG,
  'xmark': XmarkSVG,
  'arrow-left': ArrowLeftSVG,
  'magnifying-glass': MagnifyingGlassSVG,
  'circle-dot': CircleDotSVG,
  'file': FileSVG,
  'folder': FolderSVG,
  'caret-down': CaretDownSVG,
  'caret-right': CaretRightSVG,
}

const props = defineProps<{
  name: string,
}>()
</script>

<style lang="scss">
.VbIcon {
  width: 1rem;
  height: 1rem;
  display: inline-flex;
  justify-content: center;
  align-items: center;
}
.VbIcon__svg {
  max-width: 1rem;
  max-height: 1rem;
}
</style>
