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
      :style="contentStyle"
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
    contentStyle: {
      width: undefined,
      height: undefined,
    },
  }),
  props: {
    noPadding: Boolean,
    dashed: Boolean,
    title: String,
    refresh: Boolean,
  },
  computed: {
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
      this.contentStyle.width = computedStyle.width
      this.contentStyle.height = computedStyle.height
      this.show = false

      setTimeout(() => {
        this.contentStyle.width = undefined
        this.contentStyle.height = undefined
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
