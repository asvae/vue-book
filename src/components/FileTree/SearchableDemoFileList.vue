<template>
  <div class="searchable-demo-file-list">
    <div class="searchable-demo-file-list__node"
         v-for="file in filteredFiles"
         :key="file.path"
         @click="$emit('selected')"
    >
      <book-component-list-item :file="file"/>
    </div>
  </div>
</template>

<script lang="ts">
  import DemoFile from '../../classes/Main/DemoFile'
  import BookComponentListItem from './BookComponentListItem.vue'
  import DemoPageConfig from '../DemoPage/DemoPageConfig'
  import ComInput from '../DemoPage/ComInput/ComInput.vue'

  export default {
    name: 'searchable-demo-file-list',
    components: {
      ComInput,
      BookComponentListItem,
    },
    props: {
      search: {
        type: String,
        required: true,
      },
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
        if (!self.searchProxy) {
          return self.files
        }
        return self.files.filter(file => self.fileSelected(file))
      },
      searchProxy: {
        get () {
          const self: any = this

          return self.search
        },
        set (search) {
          const self: any = this

          self.$emit('update:search', search)
        }
      }
    },
    methods: {
      fileSelected (file: DemoFile) {
        const self: any = this
        const path = file.path.toUpperCase()
        const text = self.searchProxy.toUpperCase()
        const includesFull = path.includes(text)
        if (includesFull) {
          return includesFull
        }
        const upperCaseLetters = file.getFilename().replace(/[a-z.]/g, '')
        return upperCaseLetters.includes(self.searchProxy)
      },
    },
    mounted () {
      const self: any = this
      const input = self.$refs.searchInput
      input && input.$el.focus()
    },
  }
</script>

<style lang="scss">
  @import '../../scss/resources';

  .searchable-demo-file-list {
    height: 100%;
    background-color: $color--white;
    overflow: auto;
    &__node {

    }
  }
</style>
