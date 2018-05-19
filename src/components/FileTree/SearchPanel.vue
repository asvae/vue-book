<template>
    <div class="search-panel">
        <com-input
                ref="searchInput"
                style="width: 100%"
                v-model="config.searchText"
        />
        <div v-for="file in filteredFiles"
             :key="file.path"
             @click="$emit('selected')"
        >
            <vm-file :file="file"/>
        </div>
    </div>
</template>

<script lang="ts">
  import DemoFile from '../../classes/Main/DemoFile'
  import VmFile from './File.vue'
  import DemoPageConfig from '../DemoPage/DemoPageConfig'
  import ComInput from '../DemoPage/ComInput/ComInput.vue'

  export default {
    name: 'VmSearchPanel',
    components: {
      ComInput,
      VmFile,
    },
    props: {
      config: {
        type: DemoPageConfig,
        required: true,
      },
      files: {
        type: Array,
        required: true,
      },
    },
    computed: {
      filteredFiles () {
        if (!this.config.searchText) {
          return this.files
        }
        return this.files.filter(file => this.fileSelected(file))
      },
    },
    methods: {
      fileSelected (file: DemoFile) {
        const path = file.path.toUpperCase()
        const text = this.config.searchText.toUpperCase()
        const includesFull = path.includes(text)
        if (includesFull) {
          return includesFull
        }
        const upperCaseLetters = file.getFilename().replace(/[a-z.]/g, '')
        return upperCaseLetters.includes(this.config.searchText)
      },
    },
    mounted () {
      const input = this.$refs.searchInput
      input && input.$el.focus()
    },
  }
</script>
