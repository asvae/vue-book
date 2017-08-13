<template>
    <div class="info-panel">
        <div class="info-panel__description-block">
            <strong v-if="componentName">{{ componentName }}</strong>
            <div class="info-panel__description">{{ file.options.description }}</div>
        </div>
        <div class="info-panel__relation">
            <strong>Dependencies</strong>
            <vm-file
                    v-for="dependency in file.dependsOn"
                    :key="dependency.path"
                    :file="dependency"
            />
        </div>
        <div class="info-panel__relation">
            <strong>Dependants</strong>
            <vm-file
                    v-for="dependency in file.dependedBy"
                    :key="dependency.path"
                    :file="dependency"
            />
        </div>
    </div>
</template>

<script lang="ts">
  import DemoFile from '../../classes/Main/DemoFile'
  import VmFile from './File.vue'

  export default {
    components: {VmFile},
    name: 'VmInfoPanel',
    props: {
      file: {
        type: DemoFile,
        required: true,
      },
    },
    created () {
      console.log(this.file)
    },
    computed: {
      componentName () {
        return this.file.getComponentName()
      },
    },
  }
</script>

