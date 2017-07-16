<template>
    <router-link
            tag="div"
            class="demo-node"
            :class="[status, isActive && 'demo-node--active']"
            :to="file.path"
    >
        <div>
            <i class="icon-folder"></i> <span>{{ file.getFilename() }}</span>
        </div>
    </router-link>
</template>

<script>
  import DemoFile from '../../classes/Main/DemoFile.js'

  export default {
    name: 'VmFile',
    props: {
      file: {
        type: DemoFile
      }
    },
    computed: {
      isActive () {
        return this.$route.path === this.file.path
      },
      status () {
        const status = this.file.component.status
        return status && `demo-node--${status}`
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">

</style>
