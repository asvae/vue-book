<template>
  <VaModal
    class="vb-recent-modal"
    max-height="60vh"
    v-model="showModal"
    position="center"
    hideDefaultActions

  >
    <div class="vb-recent-modal__wrapper" v-if="!files.length">
      <div class="vb-recent-modal__header">
        Recent files history is empty
      </div>
    </div>

    <div class="vb-recent-modal__wrapper" v-else>
      <div class="vb-recent-modal__header">
        Recent files
      </div>
      <ul
        ref="fileList"
        @keydown.up.prevent="focusPreviousFile"
        @keydown.down.prevent="focusNextFile"

      >
        <li
          v-for="(file, i) in files"
          :key="i"
          :tabindex="i+1"
          @keypress.enter="selectFile(file)"
          :id="`file-${i}`"
          :title="file.path"
          @click="selectFile(file)"
          class="BookComponentListItem"
          :class="$route.path === file.path ? 'vb-recent-modal--active': ''"
        >
          <font-awesome-icon
            class="BookComponentListItem__icon"
            icon="file"
          />
          {{file.name}}
        </li>
      </ul>
    </div>
  </VaModal>
</template>

<script lang="ts">
import VaModal
  from 'vuestic-ui/src/components/vuestic-components/va-modal/VaModal.vue'
import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'
import { TreeFile } from '../../classes/Main/TreeFile'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { RecentFilesStore } from '../../store/RecentFilesStore'

@Component({
  components: {
    VaModal,
    FontAwesomeIcon,
  },
})
export default class VbRecentModal extends Vue {
  @Prop({ type: Boolean, required: true }) value!: boolean
  @Prop({
    type: RecentFilesStore,
    required: true,
  }) recentFilesStore!: RecentFilesStore

  get files (): any {
    return this.recentFilesStore.files
  }

  get showModal (): boolean {
    return this.value
  }

  set showModal (value) {
    this.$emit('input', value)
  }

  focusNextFile (): void {
    const activeElement: any = document.activeElement
    const nextElement: any = activeElement.nextSibling
    if (nextElement) {
      nextElement.focus()
    }
  }

  focusPreviousFile (): void {
    const activeElement: any = document.activeElement
    const previousElement: any = activeElement.previousSibling
    if (previousElement) {
      previousElement.focus()
    }
  }

  selectFile (file: TreeFile): void {
    const equalRoutes: boolean = this.$route.path === file.path
    if (!equalRoutes) {
      this.$router.push(file.path)
    }
    this.$emit('input', false)
  }

  updated () {
    this.$nextTick(function () {
      const fileList: any = this.$refs.fileList
      if (fileList) {
        if (this.files.length > 1) {
          fileList.childNodes.item(1).focus()
        } else {
          fileList.firstChild.focus()
        }
      }
    })
  }
}
</script>

<style lang="scss">
.vb-recent-modal {
  &__wrapper {
    height: 100%;
    min-height: 24vh;
    min-width: 24vh;
  }
  &__header {
    color: white;
    text-align: center;
    padding: 5px 0px;
  }
  ul {
    height: 100%;
    background: white;
    padding: 0px;
    list-style-type: none;
    margin: 0px;
    li {
      overflow: hidden;
      padding: 2px 2px;
      color: black;
      a:link {
        text-decoration: none;
      }
    }
    li:focus {
      color: white;
      outline: none;
      background-color: darken(#1fc8db, 25);
    }
  }
  &--active {
    color: white;
    outline: none;
    background-color: #1fc8db;
  }
  .va-modal {
    background: #1fc8db;
    &__inner {
      padding: 0 5px 5px 5px;
    }
  }
}
</style>
