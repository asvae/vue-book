<template>
  <div
    class="VbContainer"
    :class="computedClass"
  >
    <div class="VbContainer__title" v-if="title || refresh">
      <div class="VbContainer__title__text" v-if="title">
        {{ title }}
      </div>
      <div class="VbContainer__title__filler"/>
      <div
        v-if="refresh"
        class="VbContainer__title__icon"
        @click="doRefresh()"
      >
        <FontAwesomeIcon
          title="Refresh"
          icon="sync"
        />
      </div>
    </div>
    <div
      class="VbContainer__content"
      ref="content"
      :style="computedStyle"
    >
      <slot v-if="show"/>
    </div>
  </div>
</template>

<script lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

export default {
  name: 'VbContainer',
  components: { FontAwesomeIcon },
  data: () => ({
    show: true,
    contentStyleTemp: null,
  }),
  props: {
    noPadding: Boolean,
    dashed: Boolean,
    title: String,
    refresh: Boolean,
    width: String,
    height: String,
  },
  computed: {
    computedStyle () {
      const computedStyle = {
        'min-width': this.width,
        'min-height': this.height,
        height: undefined,
        width: undefined,
      }
      if (this.contentStyleTemp) {
        computedStyle.height = this.contentStyleTemp.height
        computedStyle.width = this.contentStyleTemp.width
      }
      return computedStyle
    },
    computedClass () {
      return {
        'VbContainer--no-padding': this.noPadding,
        'VbContainer--dashed': this.dashed,
      }
    },
  },
  methods: {
    doRefresh () {
      const computedStyle = window.getComputedStyle(this.$refs.content)
      this.contentStyleTemp = {
        width: computedStyle.width,
        height: computedStyle.height,
      }
      this.show = false

      setTimeout(() => {
        this.contentStyleTemp = null
        this.show = true
      })
    },
  },
}
</script>

<style lang="scss">
.VbContainer {
  margin: 5px;
  background-color: white;

  &__title {
    display: flex;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);

    &__text {
      padding: 3px 5px;
      font-weight: 700;
    }

    &__filler {
      flex: 1 0;
    }

    &__icon {
      font-size: 12px;
      padding: 4px;
      user-select: none;

      &:hover {
        cursor: pointer;
        color: gray;
      }
    }
  }

  &__content {
    padding: 20px;
    @at-root {
      .VbContainer.VbContainer--no-padding & {
        padding: 0;
      }
    }
  }

  &--dashed {
    border: dashed #7c8391 1px;
  }
}
</style>
