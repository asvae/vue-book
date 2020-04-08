<template>
  <div class="vue-book-404">
    <div class="vue-book-404__title">Demo was not found. Here's some similar ones:</div>
    <div class="vue-book-404__description" v-if="files.length">
      <ul>
        <li
          v-for="(file, i) in files"
          :key="i"
        >
          <router-link
            :to="file.path"
          >
            {{ file.path }}
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { TreeFile } from '../../classes/Main/TreeFile'

@Component({})
export default class VueBookNotFound extends Vue {
  @Prop({ type: Array, required: true }) files!: TreeFile
}
</script>

<style lang="scss">
.vue-book-404 {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 10px;

  &__title {
    font-weight: bold;
    font-size: 20px;
  }
  &__description {
    font-size: 16px;
  }
}
</style>
