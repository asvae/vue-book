<template>
    <div class="demo-container">
        <div class="demo-container__item">
            <demo-page-menu :config="config"/>
        </div>
    </div>
</template>

<script lang="ts">
  import DemoPageMenu from './DemoPageMenu.vue'
  import DemoPageConfig from './DemoPageConfig'

  export default {
    components: {
      DemoPageMenu,
    },
    data () {
      return {
        config: new DemoPageConfig(),
      }
    },
  }
</script>