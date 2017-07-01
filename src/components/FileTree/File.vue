<template>
    <router-link
            tag="div"
            class="demo-node"
            :class="[status, isActive && 'demo-node--active']"
            :to="file.path"
    >
        <div>
            <i class="fa fa-file"></i> <span>{{ file.getFilename() }}</span>
        </div>
    </router-link>
</template>

<script>
  import DemoNode from '../../classes/Main/DemoNode.js'

  export default {
    name: 'File',
    props: {
      file: {
        type: DemoNode
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
