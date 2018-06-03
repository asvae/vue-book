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
        const self: any = this
        if (!self.config.searchText) {
          return self.files
        }
        return self.files.filter(file => self.fileSelected(file))
      },
    },
    methods: {
      fileSelected (file: DemoFile) {
        const self: any = this
        const path = file.path.toUpperCase()
        const text = self.config.searchText.toUpperCase()
        const includesFull = path.includes(text)
        if (includesFull) {
          return includesFull
        }
        const upperCaseLetters = file.getFilename().replace(/[a-z.]/g, '')
        return upperCaseLetters.includes(self.config.searchText)
      },
    },
    mounted () {
      const self: any = this
      const input = self.$refs.searchInput
      input && input.$el.focus()
    },
  }
</script>
