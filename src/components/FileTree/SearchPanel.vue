<template>
    <div>
        <input
                ref="searchInput"
                style="width: 100%"
                v-model="text"
        >
        <div
                v-for="file in filteredFiles"
                :key="file.path"
                @click="$emit('selected')"
        >
            <vm-file
                    :file="file"
            />
        </div>
    </div>
</template>

<script>
  import DemoFile from '../../classes/Main/DemoFile'
  import VmFile from './File.vue'

  export default {
    components: {
      VmFile,
    },
    name: 'VmSearchPanel',
    data () {
      return {
        text: '',
      }
    },
    props: {
      files: {
        type: Array,
        required: true,
      }
    },
    computed: {
      filteredFiles () {
        if (!this.text) {
          return this.files
        }
        return this.files.filter(file => this.fileSelected(file))
      }
    },
    methods: {
      some (){
        console.log('some')
      },
      fileSelected (file: DemoFile) {
        file.path.includes(this.text)
        return file.path.includes(this.text)
      }
    },
    mounted () {
      const input = this.$refs.searchInput
      input && input.focus()
    },
  }
</script>

<style lang="scss" rel="stylesheet/scss">

</style>
