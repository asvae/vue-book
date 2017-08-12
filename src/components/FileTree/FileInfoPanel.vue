<template>
    <div>
        <div>
            <p>Dependencies</p>
            <vm-file
                    v-for="dependency in file.dependsOn"
                    :key="dependency.path"
                    :file="dependency"
            />
        </div>
        <div>
            <p>Dependants</p>
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
    components: { VmFile },
    name: 'VmFileInfoPanel',
    props: {
      file: {
        type: DemoFile,
      }
    }
  }
</script>

