<template>
  <div
    tag="div"
    class="BookComponentListItem"
    :class="isActive && 'BookComponentListItem--active'"
    @click="select()"
  >
    <font-awesome-icon
      class="BookComponentListItem__icon"
      icon="file"
    />
    <span class="BookComponentListItem__file-name">
      {{ name }}
    </span>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Inject } from 'vue-property-decorator'
import { TreeFile } from '../../classes/Main/TreeFile'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  VueBookTreeOptions,
  VueBookTreeOptionsInterface,
} from '../DemoPage/VueBookTreeOptions'

@Component({
  name: 'BookComponentListItem',
  components: {
    FontAwesomeIcon,
  },
})
export default class BookComponentListItem extends Vue {
  @Inject(VueBookTreeOptionsInterface) readonly vueBookTreeOptions!: VueBookTreeOptions
  @Prop({ type: TreeFile, required: true }) file!: TreeFile

  get name () {
    if (this.vueBookTreeOptions.hideFileExtensions) {
      return (this.file as TreeFile).getFilenameWithoutExtension()
    }
    return (this.file as TreeFile).getFilename()
  }

  get isActive () {
    if (this.vueBookTreeOptions.noRouter) {
      return this.vueBookTreeOptions.selectedTreeFile === this.file
    }

    return this.$route.path === this.file.path
  }

  select (): void {
    console.log('this.file.path', this.file.path)
    if (this.vueBookTreeOptions.noRouter) {
      this.vueBookTreeOptions.selectedTreeFile = this.file as TreeFile
      return
    }

    if (this.$route?.path === this.file.path) {
      return
    }

    this.$router.push(this.file.path)
  }
}
</script>

<style lang="scss">
@import "../../scss/resources";

.BookComponentListItem {
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
