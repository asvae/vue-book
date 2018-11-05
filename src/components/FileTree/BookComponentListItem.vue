<template>
  <div
    tag="div"
    class="book-component-list-item"
    :class="isActive && 'book-component-list-item--active'"
    @click="select()"
  >
    <font-awesome-icon
      class="book-component-list-item__icon"
      :icon="faFile"
    />
    <span class="book-component-list-item__file-name">
      {{ name }}
    </span>
  </div>
</template>

<script lang="ts">
import { TreeFile } from '../../classes/Main/TreeFile'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faFile } from '@fortawesome/free-solid-svg-icons'
import {
  VueBookTreeOptions,
  VueBookTreeOptionsInterface,
} from '../DemoPage/VueBookTreeOptions'


export default {
  components: {
    FontAwesomeIcon,
  },
  inject: [
    VueBookTreeOptionsInterface,
  ],
  props: {
    file: {
      type: TreeFile,
      required: true,
    },
  },
  computed: {
    vueBookTreeOptions () {
      return this[VueBookTreeOptionsInterface] as VueBookTreeOptions
    },
    name () {
      if (this.vueBookTreeOptions.hideFileExtensions) {
        return (this.file as TreeFile).getFilenameWithoutExtension()
      }
      return (this.file as TreeFile).getFilename()
    },
    isActive () {
      if (this.vueBookTreeOptions.noRouter) {
        return this.vueBookTreeOptions.selectedTreeFile === this.file
      }

      return this.$route.path === this.file.path
    },
    faFile: () => faFile,
  },
  methods: {
    select (): void {
      if (this.vueBookTreeOptions.noRouter) {
        this.vueBookTreeOptions.selectedTreeFile = this.file as TreeFile
        return
      }

      this.$router.push(this.file.path)
    },
  },
}
</script>

<style lang="scss">
@import "../../scss/resources";

.book-component-list-item {
  padding-top: 2px;
  padding-bottom: 1px;
  @include flexCenter();

  cursor: pointer;
  color: black;
  white-space: nowrap;
  display: block;
  &#{&}--active {
    background-color: darken($color--main, 25);
  }
  &#{&}--active &__file-name {
    color: lighten($color--main, 45);
  }
  &__icon {
    color: #829268;
    margin-left: 3px;
    margin-right: 3px;
  }
}
</style>
