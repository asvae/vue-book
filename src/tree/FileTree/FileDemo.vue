<template>
    <div class="demo-container">
        <div class="demo-container__item"
             style="width: 300px"
             v-for="(value, key) in valueList"
        >
            <div class="demo-container__header"
                 v-text="key"
            />
            <vm-file :file="value"/>
        </div>
    </div>
</template>

<script>
  import vmFile from '../../components/FileTree/File.vue'
  import DemoNode from '../../classes/Main/DemoFile'
  import DemoFileFactory from "../../classes/Factory/DemoFileFactory";

  export default {
    data () {
      return {
        valueList: {
          short: DemoFileFactory.getWithShortPath(),
          long: DemoFileFactory.getWithLongPath(),
          withStatus: DemoFileFactory.getWithStatus('wip'),
        }
      }
    },
    components: {
      vmFile,
    },
  }
</script>

<style lang="scss" rel="stylesheet/scss">

</style>
