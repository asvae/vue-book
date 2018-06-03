<template>
    <router-link
            tag="div"
            class="demo-node"
            :class="isActive && 'demo-node--active'"
            :to="file.path"
    >
        <div>
            <font-awesome-icon icon="file"/> <span>{{ file.getFilename() }}</span>
        </div>
    </router-link>
</template>

<script lang="ts">
  import DemoFile from '../../classes/Main/DemoFile'
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

  export default {
    name: 'vm-file',
    props: {
      file: {
        type: DemoFile,
      }
    },
    components: {
      FontAwesomeIcon,
    },
    computed: {
      isActive () {
        const self: any = this

        return self.$route.path === self.file.path
      },
    },
  }
</script>
