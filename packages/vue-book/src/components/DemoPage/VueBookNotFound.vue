<template>
  <div class="vue-book-not-found">
    <div class="vue-book-not-found__title">Demo was not found.</div>
    <div class="vue-book-not-found__description" v-if="files.length">
      Here's some similar ones:
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
.vue-book-not-found {
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
    padding-top: 40px;
    font-size: 16px;
  }
}
</style>
