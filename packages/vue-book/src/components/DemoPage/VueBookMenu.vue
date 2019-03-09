<template>
  <div class="vue-book-menu">
    <com-button-icon
      class="vue-book-menu__icon"
      @click.native="config.mode = DemoPageMode.Tree"
      title="Mode: Tree"
      icon="server"
      :active="config.mode === DemoPageMode.Tree"
    />

    <com-button-icon
      class="vue-book-menu__icon"
      @click.native="config.mode = DemoPageMode.Search"
      title="Mode: Search"
      icon="search"
      :active="config.mode === DemoPageMode.Search"
    />

    <div class="vue-book-menu__filler"></div>

    <template v-if="config.mode === DemoPageMode.Tree">
      <com-button-icon
        class="vue-book-menu__icon"
        v-if="currentFile"
        @click.native="$emit('openFolder')"
        title="Expand from Current File"
        icon="dot-circle"
      />
    </template>
  </div>
</template>

<script lang="ts">
import DemoPageConfig, { DemoPageMode } from './DemoPageConfig'
import { TreeFile } from '../../classes/Main/TreeFile'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import ComButtonIcon from './ComButtonIcon/ComButtonIcon.vue'

export default {
  name: 'vue-book-menu',
  components: {
    ComButtonIcon,
    FontAwesomeIcon,
  },
  props: {
    currentFile: {
      type: TreeFile,
      required: false,
    },
    config: {
      type: DemoPageConfig,
      required: true,
    },
  },
  computed: {
    DemoPageMode: () => DemoPageMode,
  },
}
</script>

<style lang="scss">
@import "../../scss/resources";

.vue-book-menu {
  display: flex;
  &__filler {
    flex: 1 0;
  }
}
</style>

