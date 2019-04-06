<template>
  <div
    class="VbCard"
    :class="computedClass"
    v-if="!isHiddenAsUnfocused"
  >
    <div class="VbCard__title" v-if="title || refresh">
      <div class="VbCard__title__text" v-if="title">
        {{ title }}
      </div>
      <div class="VbCard__title__spacer"/>
      <div
        v-if="refresh"
        class="VbCard__title__icon"
        @click="doRefresh()"
        title="Refresh"
      >
        <FontAwesomeIcon
          title="Refresh"
          icon="sync"
        />
      </div>
    </div>
    <div
      class="VbCard__content"
      ref="content"
      :style="computedStyle"
    >
      <slot v-if="show"/>
    </div>
  </div>
</template>

<script lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { ContainerFocusInjectMixin } from './ContainerFocusService'

export default {
  name: 'VbCard',
  components: { FontAwesomeIcon },
  mixins: [
    ContainerFocusInjectMixin,
  ],
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
    color: String,
  },
  computed: {
    computedStyle () {
      const computedStyle = {
        'min-width': this.width,
        'min-height': this.height,
        height: undefined,
        width: undefined,
        backgroundColor: this.color,
      }
      if (this.contentStyleTemp) {
        computedStyle.height = this.contentStyleTemp.height
        computedStyle.width = this.contentStyleTemp.width
      }
      return computedStyle
    },
    computedClass () {
      return {
        'VbCard--no-padding': this.noPadding,
        'VbCard--dashed': this.dashed,
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
.VbCard {
  margin: 5px;
  background-color: white;

  &__title {
    display: flex;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);

    &__text {
      padding: 3px 5px;
      font-weight: 700;
    }

    &__spacer {
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
      .VbCard.VbCard--no-padding & {
        padding: 0;
      }
    }
  }

  &--dashed {
    border: dashed #7c8391 1px;
  }
}
</style>
