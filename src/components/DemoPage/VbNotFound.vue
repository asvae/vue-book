<template>
  <div class="VbNotFound">
    <div class="VbNotFound__title">Demo was not found.</div>
    <div class="VbNotFound__description" v-if="files.length">
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

<script lang="ts">
import { Prop } from 'vue-property-decorator'
import { TreeFile } from '../../classes/Main/TreeFile'
import { Options, Vue } from 'vue-class-component'

@Options({
  name: 'VbNotFound'
})
export default class VbNotFound extends Vue {
  @Prop({ type: Array, required: true }) files!: TreeFile[]
}
</script>

<style lang="scss">
.VbNotFound {
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
