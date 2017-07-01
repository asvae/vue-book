<template>
    <div class="demo-container">
        <div style="width: 250px">
            <div class="demo-container__item demo-container--config">
                <div class="demo-container__header"
                     v-text="'type'"
                />
                <div v-for="(value, key) in valueList"
                     class="selectable-item is-small"
                     :class="{active: valueSelected === key}"
                     @click="valueSelected = key"
                     v-text="key"
                />
            </div>
        </div>

        <div class="demo-container__item" style="width: 250px">
            <div class="demo-container__header"
                 v-text="valueSelected"
            />
            <vm-folder :folder="valueList[valueSelected]"/>
        </div>
    </div>
</template>

<script>
  import vmFolder from '../../components/FileTree/Folder.vue'
  import DemoNode from '../../classes/Main/DemoNode'
  import DemoFolder from '../../classes/Main/DemoFolder'
  import DemoFolderFactory from "../../classes/Factory/DemoFolderFactory";

  export default {
    data () {
      return {
        valueList: {
          empty: DemoFolderFactory.getEmpty(),
          withFolders: DemoFolderFactory.getWithFolders(),
          withFiles: DemoFolderFactory.getWithFiles(),
          withFilesAndFolders: DemoFolderFactory.getWithFoldersAndFiles(),
        },
        valueSelected: 'empty',
      }
    },
    components: {
      vmFolder,
    },
  }
</script>

<style lang="scss" rel="stylesheet/scss">

</style>
