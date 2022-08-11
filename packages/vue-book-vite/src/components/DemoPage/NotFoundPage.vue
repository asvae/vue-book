<template>
  <div class="NotFoundPage">
    <div class="NotFoundPage__title">Demo was not found.</div>
    <div class="NotFoundPage__description" v-if="files.length">
      Here's some similar files:
      <ul>
        <li
          v-for="file in files"
          :key="file.path"
        >
          <router-link :to="file.path">
            {{ file.path }}
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { TreeFile } from '../../classes/Main/TreeFile'

const props = defineProps<{files: TreeFile[]}>()
</script>

<style>
.NotFoundPage {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 10px;
}
.NotFoundPage__title {
  font-weight: bold;
  font-size: 20px;
}
.NotFoundPage__description {
  padding-top: 40px;
  font-size: 16px;
}
</style>
