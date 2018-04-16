<template>
    <div>
        <div style="text-align: right">
            <div v-if="currentFile"
                 class="button-icon"
                 @click="$emit('next', true)"
            >
                    <span class="icon">
                        <i class="fa fa-arrow-left"></i>
                    </span>
            </div>

            <div v-if="currentFile"
                 class="button-icon"
                 @click="$emit('next')"
            >
                    <span class="icon">
                        <i class="fa fa-arrow-right"></i>
                    </span>
            </div>

            <div v-if="currentFile"
                 class="button-icon"
                 @click="$emit('openFolder')"
            >
                    <span class="icon">
                        <i class="fa fa-dot-circle-o"></i>
                    </span>
            </div>

            <div class="button-icon"
                 @click="tree.close()"
            >
                    <span class="icon">
                        <i class="fa fa-exchange"></i>
                    </span>
            </div>
            &nbsp;
            <div class="button-icon"
                 :class="{'button-icon--active': config.mode === 'Hidden'}"
                 @click="config.mode = 'Hidden'"
            >
                    <span class="icon">
                        <i class="fa fa-bars"></i>
                    </span>
            </div>

            <div class="button-icon"
                 :class="{'button-icon--active': config.mode === 'Default'}"
                 @click="config.mode = 'Default'"
            >
                        <span class="icon">
                            <i class="fa fa-server"></i>
                        </span>
            </div>
            <div class="button-icon"
                 :class="{'button-icon--active': config.mode === 'Search'}"
                 @click="config.mode = 'Search'"
            >
                    <span class="icon">
                        <i class="fa fa-search"></i>
                    </span>
            </div>

            <div class="button-icon"
                 :class="{'button-icon--active': config.isFlat}"
                 @click="config.isFlat = !config.isFlat"
            >
                    <span class="icon">
                        <i class="fa fa-arrows-v"></i>
                    </span>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
  import DemoPageConfig from './DemoPageConfig'
  import DemoFile from '../../classes/Main/DemoFile'

  export default {
    name: 'VmDemoPageMenu',
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
  }
</script>

