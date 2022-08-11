<template>
  <div class="VbPage">
    <div v-if="!files.length">
      <p>You provided no files in requireContext.</p>
      <p>Please check your path and masks.</p>
    </div>
    <div
      class="VbPage__left-block-folded"
      v-else-if="isHidden"
    >
      <ButtonIcon
        @click="isHidden = !isHidden"
        :title="isHidden ? 'Unfold navigation panel' : 'Fold navigation panel'"
        :icon="isHidden ? 'bars' : 'arrow-left'"
        :active="config.mode === DemoPageMode.Tree"
      />
    </div>
    <div
      v-else-if="!hideNavigation"
      class="VbPage__left-block"
      :style="{'flex-basis': config.width + 'px', 'width': config.width + 'px'}"
    >
      <div class="VbPage__menu">
        <VbMenu
          :config="config"
          :currentFile="currentFile"
          @openFolder="currentFile.openFolder()"
        />

        <!-- Why form? See https://github.com/asvae/vue-book/issues/39 -->
        <form autocomplete="off" class="VbPage__menu__search"
              v-if="config.mode === DemoPageMode.Search"
        >
          <SearchInput
            class="VbPage__search-input"
            ref="searchInput"
            v-model="config.searchText"
            placeholder="Search..."
            @up="moveCursor(-1)"
            @down="moveCursor(1)"
            @enter="selectFileUnderCursor()"
            @blur="listCursor.clean()"
          />
          <div
            v-if="config.searchText"
            class="VbPage__menu__search__icon"
            @click="clearSearch()"
          >
            <VbIcon name="times"/>
          </div>
        </form>
      </div>

      <div class="VbPage__files">
        <template v-if="config.mode === DemoPageMode.Search">
          <template v-if="!filteredFiles.length">
            No files found according to search.
          </template>
          <FileList
            v-else
            :files="filteredFiles"
            :listCursor="listCursor"
          />
        </template>

        <TreeFileList
          v-if="config.mode === DemoPageMode.Tree"
          :folder="treeFolderLocal"
          :listCursor="listCursor"
        />
      </div>

      <div class="VbPage__left-block-bottom-menu">
        <ButtonIcon
          @click="isHidden = !isHidden"
          :title="isHidden ? 'Unfold navigation panel' : 'Fold navigation panel'"
          :icon="isHidden ? 'bars' : 'arrow-left'"
          :active="config.mode === DemoPageMode.Tree"
        />
      </div>

      <VueBookResizeLine
        class="VbPage__left-block__resize-line"
        v-model="config.width"
      />
    </div>

    <div class="VbPage__right-block">
      <NotFoundPage :files="similarFiles" v-if="!component"/>
      <component ref="component" v-else :is="component"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FoldersStore } from '../../store/FoldersStore'
import { ConfigStore } from '../../store/configStore'

import { TreeFolder } from '../../classes/Main/TreeFolder'
import { TreeFile } from '../../classes/Main/TreeFile'
import FileList from '../FileTree/FileList.vue'
import VueBookResizeLine from '../ResizeLine.vue'
import DemoPageConfig, { DemoPageMode } from './DemoPageConfig'
import VbMenu from './PageMenu.vue'
import NotFoundPage from './NotFoundPage.vue'
import SearchInput from './SearchInput/SearchInput.vue'
import TreeFileList from '../FileTree/TreeFileList.vue'
import { ListCursor } from '../FileTree/ListCursor'
import { TreeFileCollection } from '../../classes/Main/TreeFileCollection'
import {
  VueBookTreeOptions,
  VueBookTreeOptionsInterface,
} from './VueBookTreeOptions'
import ButtonIcon from './ButtonIcon/ButtonIcon.vue'

import { useContainerFocusProvide } from '../../composables/useContainerFocus'
import { screenSizeService } from '../../composables/ScreenSizeService'
import {
  computed,
  onMounted,
  provide,
  reactive,
  ref, toRaw,
  watch,
  watchEffect,
} from 'vue'
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router'
import VbIcon from './ButtonIcon/VbIcon.vue'

useContainerFocusProvide()

let lastUpdateTimestamp = 0

const hasInFilename = (searchText: string, treeFile: TreeFile) => {
  return treeFile.getFilename().toUpperCase().includes(searchText)
}

const sortByRelevance = (searchText: string, treeFiles: TreeFile[]) => {
  return treeFiles.sort((a, b) => {
    const search = searchText.toUpperCase()
    // Files that have a search in their filename are sent to the top.
    if (hasInFilename(search, a) && !hasInFilename(search, b)) {
      return -1
    }
    if (hasInFilename(search, b) && !hasInFilename(search, a)) {
      return 1
    }
    return 0
  })
}

onBeforeRouteUpdate((to: any, from: any, next: Function) => {
  // Demo components are not registered as routes in vue-router, so we have to call route update hooks manually.
  // TODO Unsure what I tried to achieve here.
  // const component = this.$refs.component as any
  // if (component?.$options.beforeRouteUpdate) {
  //   component?.$options.beforeRouteUpdate?.[0]?.call(component, to, from, next)
  // } else {
    next()
  // }
})

const {
  treeFolder,
  treeFileCollection,
  hideFileExtensions,
  hideNavigation,
} = defineProps<{
  treeFolder: TreeFolder,
  treeFileCollection: TreeFileCollection,
  hideFileExtensions: boolean,
  hideNavigation: boolean,
}>()
if (!(treeFolder instanceof TreeFolder)) {
  throw new Error('No treeFolder found: pass it to props or provide via route meta')
}
if (!(treeFileCollection instanceof TreeFileCollection)) {
  throw new Error('No treeFileCollection found: pass it to props or provide via route meta')
}

const router = useRouter()
const route = useRoute()

let treeFolderLocal = ref<TreeFolder | null>(null)
const listCursor = reactive(new ListCursor())
const configStore = reactive(new ConfigStore())
const foldersStoreInstance = reactive(new FoldersStore())
const vueBookTreeOptions = reactive(new VueBookTreeOptions({
  noRouter: false, // TODO No router mode disabled for now.
  selectedTreeFile: null,
  hideFileExtensions: hideFileExtensions,
}))

foldersStoreInstance.load()
configStore.load()
treeFolder.mergeWithFolders(foldersStoreInstance.openFolders)
treeFolderLocal.value = treeFolder

const config = computed<DemoPageConfig>(() => {
  if (configStore.config === null) {
    throw new Error('configStore is null')
  }
  return configStore.config
})

provide(VueBookTreeOptionsInterface, vueBookTreeOptions)

const searchInput = ref<any>(null)

onMounted(() => {
  const input = searchInput.value
  // TODO Won't work most probably.
  input && input.focus()
})

const isMobile = computed(() => screenSizeService.isMobile)

watchEffect(() => {
  config.value.isHidden = isMobile.value
})
watch(
  () => config,
  config => {
    if (lastUpdateTimestamp < Math.floor(Date.now()) - 200) {
      configStore.config = config.value
      configStore.save()
      lastUpdateTimestamp = Math.floor(Date.now())
    }
  },
  { deep: true },
)
watch(
  () => treeFolderLocal,
  config => {
    if (treeFolderLocal.value === null) {
      return
    }
    foldersStoreInstance.openFolders = treeFolderLocal.value.getOpenFolders()
    foldersStoreInstance.save()
  },
  { deep: true },
)

const isHidden = computed({
  get: () => {
    if (config.value.isHidden === null) {
      return isMobile.value
    }
    return config.value.isHidden
  },
  set: (isHidden: boolean) => {
    config.value.isHidden = isHidden
  },
})

const noRouter = computed(() => {
  return getNoRouter()
})

const files = computed<TreeFile[]>(() => {
  return treeFileCollection.treeFiles
})
const currentFile = computed(() => {
  return files.value.find((file: any) => {
    return route.path === file.path
  }) || null
})
const component = computed(() => {
  return currentFile.value && currentFile.value.component
})
const filteredFiles = computed<TreeFile[]>(() => {
  if (!config.value.searchText) {
    return files.value
  }
  const treeFiles = files.value.filter((file: any) => fileSearched(file))
  return sortByRelevance(config.value.searchText, treeFiles)
})
const currentComponentName = computed((): string | undefined => {
  return route.path.split('/').pop()
})
const similarFiles = computed<TreeFile[]>(() => {
  const similarFiles: TreeFile[] = []
  filteredFiles.value.forEach((file: TreeFile) => {
    if (file.getFilename() === currentComponentName.value) {
      similarFiles.push(file)
    }
  })
  return similarFiles
})


const clearSearch = (): void => {
  config.value.searchText = ''
  searchInput.focus()
}

const fileSearched = (file: TreeFile): boolean => {
  const path = file.path.toUpperCase()
  const text = config.value.searchText.toUpperCase()
  const includesFull = path.includes(text)
  if (includesFull) {
    return includesFull
  }
  const upperCaseLetters = file.getFilename().replace(/[a-z.]/g, '')
  return upperCaseLetters.includes(config.value.searchText)
}

const moveCursor = (delta: number) => {
  const files = filteredFiles.value

  if (!listCursor.preSelectedItem) {
    listCursor.preSelectedItem = files[0]
    return
  }

  const fileIndex = files.indexOf(toRaw(listCursor.preSelectedItem))
  if (fileIndex === -1) {
    listCursor.preSelectedItem = files[0]
    return
  }
  const nextFileIndex = fileIndex + delta

  if (nextFileIndex === -1) {
    listCursor.preSelectedItem = files[0]
    return
  }
  if (nextFileIndex === files.length) {
    listCursor.preSelectedItem = files[files.length - 1]
    return
  }
  listCursor.preSelectedItem = files[nextFileIndex]
}

const selectFileUnderCursor = (): void => {
  const fileUnderCursor = toRaw(listCursor.preSelectedItem)

  if (!fileUnderCursor) {
    return
  }

  if (!filteredFiles.value.includes(fileUnderCursor)) {
    return
  }

  if (vueBookTreeOptions.noRouter) {
    vueBookTreeOptions.selectedTreeFile = fileUnderCursor
    return
  }

  router.push({path: fileUnderCursor.path})
}
</script>

<style>
:root {
  --color--icon: #3f506e;
  --color--main: #1fc8db;
  --color--main--light: #e4f9fb;
}

.VbPage {
  height: 100%;
  width: 100%;
  position: fixed;
  display: flex;
  top: 0;
  left: 0;
}

.VbPage__menu {
  padding: 5px;
}

.VbPage__menu__search {
  position: relative;
  margin-top: 5px;
}

.VbPage__menu__search__icon {
  position: absolute;
  right: 6px;
  top: 3px;
  color: var(--color--icon);
  cursor: pointer;
  opacity: 0.3;
}

.VbPage__search-input {
  background-color: var(--color--main--light);
  margin-bottom: 5px;
  border-radius: 4px;
}

.VbPage__files {
  background-color: var(--color--main);
  padding: 0 5px;
  flex: 1 0;
  height: 300px;
}

.VbPage__left-block-folded {
  background-color: var(--color--main);
  position: fixed;
  left: 0;
  bottom: 0;
}

.VbPage__left-block {
  font-family: "Noto Sans", sans-serif;
  position: relative;
  background-color: var(--color--main);
  height: 100%;
  flex: 0 0;
  display: flex;
  flex-direction: column;
}

.VbPage__left-block__resize-line {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
}

.VbPage__left-block-bottom-menu {
  text-align: center;
}

.VbPage__left-block * {
  box-sizing: border-box;
}

.VbPage__right-block {
  flex: auto;
  display: flex;
  flex-direction: column;
  overflow: auto;
  height: 100%;
}
</style>
