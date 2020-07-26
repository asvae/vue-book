<template>
  <div
    class="VbCard"
    :class="computedClass"
    v-if="!isHiddenAsUnfocused"
    :style="computedStyle"
  >
    <template v-if="title || refresh">
      <div class="VbCard__title">
        <div class="VbCard__title__text" v-if="title">
          {{ title }}
        </div>
        <div class="VbCard__title__spacer"/>
        <div
          v-if="focus"
          class="VbCard__title__icon"
          title="This card is focused. Not focused cards won't be displayed"
          style="font-weight: 700; color: white; background-color: #d8365d; border-radius: 16px; width: 16px"
        >
          <span>F</span>
        </div>
        <div
          v-if="refresh"
          class="VbCard__title__icon"
          style="cursor: pointer"
          @click="doRefresh()"
          title="Refresh"
        >
          <FontAwesomeIcon
            title="Refresh"
            icon="sync"
          />
        </div>
      </div>

      <div class="VbCard__separator"/>
    </template>

    <slot
      :state="stateComputed"
      v-if="show"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { ContainerFocusInjectMixin } from './ContainerFocusService'

@Component({
  components: { FontAwesomeIcon },
  mixins: [ContainerFocusInjectMixin],
})
export default class VbCard extends Vue {
  @Prop(Boolean) noPadding!: boolean
  @Prop(Boolean) dashed!: boolean
  @Prop(String) title!: string
  @Prop(Boolean) refresh!: boolean
  @Prop(Boolean) dark!: boolean
  @Prop(String) width!: string
  @Prop(String) height!: string
  @Prop(String) color!: string
  @Prop() state!: Record<string, any>
  @Prop({ type: Boolean, default: false }) error!: boolean

  show = true
  cardStyleTemp: {} | { width: string | null, height: string | null } = {}

  get stateComputed () {
    return Vue.observable(this.state)
  }

  get computedStyle () {
    if (this.cardStyleTemp) {
      return {
        ...this.cardStyleTemp,
        backgroundColor: this.color,
      }
    }

    return {
      height: this.height,
      width: this.width,
      backgroundColor: this.color,
    }
  }

  get computedClass () {
    return {
      'VbCard--no-padding': this.noPadding,
      'VbCard--dashed': this.dashed,
      'VbCard--dark': this.dark,
      'VbCard--error': this.error,
    }
  }

  doRefresh () {
    const { width, height } = window.getComputedStyle(this.$el)
    this.cardStyleTemp = { width, height }
    this.show = false

    setTimeout(() => {
      this.cardStyleTemp = {}
      this.show = true
    })
  }
}
</script>

<style lang="scss">
@import "../../scss/resources";

$card-content-padding: 20px;

.VbCard {
  margin: 5px;
  background-color: white;
  padding: $card-content-padding;

  &--error {
    outline: 2px solid red;
  }
  &--dark {
    background-color: #252525;

    .VbCard__title {
      color: #ededed;
      background-color: #252525;
    }

    .VbCard__separator {
      background-color: #9d9d9d;
    }

    &.VbCard--dashed {
      border: dashed #d0daee 1px;
    }
  }

  &__title {
    background-color: white;
    display: flex;
    margin: (-$card-content-padding) (-$card-content-padding) 0;
    padding: 3px 5px;
    align-items: center;

    @at-root {
      .VbCard.VbCard--no-padding & {
        margin: 0;
      }
    }

    &__text {
      font-weight: 700;
    }

    &__spacer {
      flex: 1 0;
    }

    &__icon {
      margin-left: 4px;
      font-size: 14px;
      padding: 2px;
      user-select: none;
      @include flexCenter();

      &:hover {
        color: gray;
      }
    }
  }

  &__separator {
    height: 1px;
    background-color: rgba(0, 0, 0, 0.2);
    margin: 0 (-$card-content-padding) $card-content-padding;

    @at-root {
      .VbCard.VbCard--no-padding & {
        margin: 0;
      }
    }
  }

  &--no-padding {
    padding: 0;
  }

  &--dashed {
    border: dashed #7c8391 1px;
  }
}
</style>
