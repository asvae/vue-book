<template>
  <router-link
    tag="div"
    class="book-component-list-item"
    :class="isActive && 'book-component-list-item--active'"
    :to="file.path"
  >
    <font-awesome-icon class="book-component-list-item__icon"
                       :icon="faFile"/>
    <span class="book-component-list-item__file-name">{{ file.getFilename()
            }}</span>
  </router-link>
</template>

<script lang="ts">
import DemoFile from '../../classes/Main/DemoFile'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faFile } from '@fortawesome/free-solid-svg-icons'

export default {
  components: {
    FontAwesomeIcon,
  },
  props: {
    file: {
      type: DemoFile,
      required: true,
    },
  },
  computed: {
    faFile () {
      return faFile
    },
    isActive () {
      return this.$route.path === this.file.path
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
