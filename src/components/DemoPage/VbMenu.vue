<template>
  <div class="VbMenu">
    <ComButtonIcon
      class="VuebookMenu__icon"
      @click.native="config.mode = DemoPageMode.Tree"
      title="Mode: Tree"
      icon="server"
      :active="config.mode === DemoPageMode.Tree"
    />

    <ComButtonIcon
      class="VuebookMenu__icon"
      @click.native="config.mode = DemoPageMode.Search"
      title="Mode: Search"
      icon="search"
      :active="config.mode === DemoPageMode.Search"
    />

    <div class="VbMenu__filler"></div>

    <template v-if="config.mode === DemoPageMode.Tree">
      <ComButtonIcon
        v-if="currentFile"
        @click.native="$emit('openFolder')"
        title="Expand from Current File"
        icon="dot-circle"
      />
    </template>
  </div>
</template>

<script lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import ComButtonIcon from './ComButtonIcon/ComButtonIcon.vue'
import { TreeFile } from '../../classes/Main/TreeFile'
import DemoPageConfig, { DemoPageMode } from './DemoPageConfig'
import { Vue, Options } from 'vue-class-component'
import { PropType } from 'vue'

@Options({
  name: 'VbMenu',
  components: {
    ComButtonIcon,
    FontAwesomeIcon,
  },
  emits: ['openFolder'],
  props: {
    currentFile: {
      type: Object as PropType<TreeFile | undefined>
    },
    config: {
      type: Object as PropType<DemoPageConfig | undefined>,
    }
  }
})
export default class VbMenu extends Vue {
  DemoPageMode = DemoPageMode
}
</script>

<style lang="scss">
@import "../../scss/resources";

.VbMenu {
  display: flex;

  &__filler {
    flex: 1 0;
  }
}
</style>
