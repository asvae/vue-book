<template>
    <div class="demo-page-menu">

        <com-button-icon
                class="demo-page-menu__icon"
                @click.native="config.mode = DemoPageMode.Hidden"
                title="Mode: Hidden"
                icon="bars"
                :active="config.mode === DemoPageMode.Hidden"
        />

        <com-button-icon
                class="demo-page-menu__icon"
                @click.native="config.mode = DemoPageMode.Tree"
                title="Mode: Tree"
                icon="server"
                :active="config.mode === DemoPageMode.Tree"
        />

        <com-button-icon
                class="demo-page-menu__icon"
                @click.native="config.mode = DemoPageMode.Search"
                title="Mode: Search"
                icon="search"
                :active="config.mode === DemoPageMode.Search"
        />

        <div class="demo-page-menu__filler">sdfsdf</div>

        <template v-if="config.mode === DemoPageMode.Tree">
            <com-button-icon
                    class="demo-page-menu__icon"
                    v-if="currentFile"
                    @click.native="$emit('openFolder')"
                    title="Expand from Current File"
                    icon="dot-circle"
            />
            <com-button-icon
                    class="demo-page-menu__icon"
                    @click.native="$emit('collapseTree')"
                    title="Collapse All"
                    icon="exchange-alt"
            />
        </template>
    </div>
</template>

<script lang="ts">
  import DemoPageConfig, { DemoPageMode } from './DemoPageConfig'
  import DemoFile from '../../classes/Main/DemoFile'
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
  import ComButtonIcon from './ComButtonIcon/ComButtonIcon.vue'

  export default {
    name: 'VmDemoPageMenu',
    components: {
      ComButtonIcon,
      FontAwesomeIcon,
    },
    props: {
      currentFile: {
        type: DemoFile,
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

<style type="scss">
    .demo-page-menu {
        display: flex;
        &__icon {
            height: 30px;
            background-color: #b769d9;
        }
        &__filler {
            flex: 1 0;
        }
    }
</style>

