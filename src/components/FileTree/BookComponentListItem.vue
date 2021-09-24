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
import { TreeFile } from '../../classes/Main/TreeFile'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  VueBookTreeOptions,
  VueBookTreeOptionsInterface,
} from '../DemoPage/VueBookTreeOptions'
import { computed, defineComponent, inject, PropType } from 'vue'

export default defineComponent({
  name: 'BookComponentListItem',
  components: {
    FontAwesomeIcon,
  },
  setup({ file }: {file: TreeFile}) {
    const vueBookTreeOptions = inject(VueBookTreeOptionsInterface) as VueBookTreeOptions;
    const name = computed(() => {
      if (vueBookTreeOptions.hideFileExtensions) {
        return file.getFilenameWithoutExtension()
      }
      return file.getFilename()
    })

    return {
      vueBookTreeOptions,
      name,
    }
  },
  props: {
    file: {
      type: Object as PropType<TreeFile>,
      required: true
    },
  },
  computed: {
    isActive () {
      if (this.vueBookTreeOptions.noRouter) {
        return this.vueBookTreeOptions.selectedTreeFile === this.file
      }

      return this.$route.path === this.file.path
    }
  },
  methods: {
    select (): void {
      if (this.vueBookTreeOptions.noRouter) {
        this.vueBookTreeOptions.selectedTreeFile = this.file as TreeFile
        return
      }

      if ((this as any).$route?.path === this.file.path) {
        return
      }

      (this as any).$router.push(this.file.path)
    }
  },
})
</script>

<style lang="scss">
@import "../../scss/resources";

.BookComponentListItem {
  padding-top: 2px;
  padding-bottom: 1px;
  @include flexCenter();

  cursor: pointer;
  color: $book-color-lightgray;
  white-space: nowrap;
  display: block;

  &#{&}--active {
    color: $book-color-gold--dark;
    background-color: $book-color-darkgray--dark;
  }

  &__icon {
    color: #829268;
    margin-left: 3px;
    margin-right: 3px;
  }
}
</style>
