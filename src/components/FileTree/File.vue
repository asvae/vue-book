<template>
    <router-link
            tag="div"
            class="demo-node"
            :style="{'color': file.getColor()}"
            :class="isActive && 'demo-node--active'"
            :to="file.path"
    >
        <div>
            <i class="icon-folder"></i> <span>{{ file.getFilename() }}</span>
        </div>
    </router-link>
</template>

<script lang="ts">
  import DemoFile from '../../classes/Main/DemoFile'
  import statusColors from '../../config/statusColors.ts'

  export default {
    name: 'VmFile',
    props: {
      file: {
        type: DemoFile,
      }
    },
    computed: {
      isActive () {
        return this.$route.path === this.file.path
      },
    },
  }
</script>
