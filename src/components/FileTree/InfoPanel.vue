<template>
    <div class="info-panel">
        <div class="info-panel__description-block">
            <strong v-if="componentName">{{ componentName }}</strong>
            <div class="info-panel__description">{{ file.options.description
                }}
            </div>
        </div>
        <vm-component-graph :file="file"/>
        <div class="info-panel__relation">
            <strong>Dependencies</strong>
            <vm-file
                    v-for="dependency in dependsOn"
                    :key="dependency.path"
                    :file="dependency"
            />
            <hr>
            <vm-file
                    v-for="dependency in dependsOnDeep"
                    :key="dependency.path"
                    :file="dependency"
            />
        </div>
        <div class="info-panel__relation">
            <strong>Dependants</strong>
            <vm-file
                    v-for="dependency in dependedBy"
                    :key="dependency.path"
                    :file="dependency"
            />
            <hr>
            <vm-file
                    v-for="dependency in dependedByDeep"
                    :key="dependency.path"
                    :file="dependency"
            />
        </div>
    </div>
</template>

<script lang="ts">
  import DemoFile from '../../classes/Main/DemoFile'
  import VmFile from './File.vue'
  import VmComponentGraph from './ComponentGraph.vue'

  export default {
    components: {
      VmComponentGraph,
      VmFile,
    },
    name: 'VmInfoPanel',
    props: {
      file: {
        type: DemoFile,
        required: true,
      },
    },
    computed: {
      dependsOn (): DemoFile[] {
        return this.file.dependsOn.filter(file => file.component)
      },
      dependedBy (): DemoFile[] {
        return this.file.dependedBy.filter(file => file.component)
      },
      dependsOnDeep (): DemoFile[] {
        const file: DemoFile = this.file
        const all = file.getDependsOnDeep()
        return all.filter(fileChecked => {
          return (!file.dependsOn.includes(fileChecked)) && fileChecked.component
        })
      },
      dependedByDeep (): DemoFile[] {
        const file: DemoFile = this.file
        const all = file.getDependedByDeep()
        return all.filter(fileChecked => {
          return (!file.dependedBy.includes(fileChecked)) && fileChecked.component
        })
      },
      componentName () {
        return this.file.getComponentName()
      },
    },
  }
</script>

