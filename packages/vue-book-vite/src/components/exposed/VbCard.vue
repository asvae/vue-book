<template>
  <div
    class="VbCard"
    :class="computedClass"
    :style="computedStyle"
    ref="root"
  >
    <template v-if="props.title || props.refresh">
      <div class="VbCard__title">
        <div class="VbCard__title__text" v-if="props.title">
          {{ props.title }}
        </div>
        <div class="VbCard__title__spacer"/>
        <div
          class="VbCard__title__icon"
          v-if="props.focus"
          title="This card is focused. Not focused cards won't be displayed"
          style="font-weight: 700; color: white; background-color: #d8365d; border-radius: 16px; width: 16px"
        >
          <span>F</span>
        </div>
        <div
          v-if="props.refresh"
          class="VbCard__title__icon"
          style="cursor: pointer"
          @click="doRefresh()"
          title="Refresh"
        >
          🔄
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

<script setup lang="ts">
import { computed, defineProps, ref } from 'vue'

const props = defineProps<{
  focus?: boolean,
  dashed?: boolean,
  title?: string,
  refresh?: boolean,
  dark?: boolean,
  width?: string,
  height?: string,
  color?: string,
  state?: any,
  error?: boolean,
}>()

const show = ref(true)
const cardStyleTemp = ref<{} | { width: string | null, height: string | null }>({})
const root = ref<Element | null>(null)

const doRefresh = () => {
  if (root.value === null) {
    return
  }
  const { width, height } = window.getComputedStyle(root.value)
  cardStyleTemp.value = { width, height }
  show.value = false

  setTimeout(() => {
    cardStyleTemp.value = {}
    show.value = true
  })
}

const stateComputed = computed(() => props.state)
const computedStyle = computed(() => {
  if (cardStyleTemp) {
    return {
      ...cardStyleTemp,
      backgroundColor: props.color,
    }
  }

  return {
    height: props.height,
    width: props.width,
    backgroundColor: props.color,
  }
})

const computedClass = computed(() => ({
  'VbCard--no-padding': false, // TODO
  'VbCard--dashed': props.dashed,
  'VbCard--dark': props.dark,
  'VbCard--error': props.error,
}))
</script>

<style>
:root {
  --card-content-padding: 20px;
}

.VbCard {
  margin: 5px;
  background-color: white;
  padding: var(--card-content-padding);
}

.VbCard--error {
  outline: 2px solid red;
}

/*dark only*/
.VbCard--dark {
  background-color: #252525;
}

.VbCard--dark .VbCard__title {
  color: #ededed;
  background-color: #252525;
}

.VbCard--dark .VbCard__separator {
  background-color: #9d9d9d;
}

.VbCard--dark.VbCard--dashed {
  border: dashed #d0daee 1px;
}

/*.VbCard__title*/
.VbCard.VbCard--no-padding .VbCard__title {
  margin: 0;
}

.VbCard__title {
  background-color: white;
  display: flex;
  margin: calc(var(--card-content-padding) * -1) calc(var(--card-content-padding) * -1);
  padding: 3px 5px;
  align-items: center;
}

.VbCard__title__text {
  font-weight: 700;
}

.VbCard__title__spacer {
  flex: 1 0;
}

.VbCard__title__icon {
  margin-left: 4px;
  font-size: 14px;
  padding: 2px;
  user-select: none;

  display: flex;
  justify-content: center;
  align-items: center;
}

.VbCard__title__icon:hover {
  color: gray;
}

.VbCard__separator {
  height: 1px;
  background-color: rgba(0, 0, 0, 0.2);
  margin: var(--card-content-padding) calc(var(--card-content-padding) * -1) var(--card-content-padding);
}

.VbCard.VbCard--no-padding .VbCard__separator {
  margin: 0;
}

.VbCard--no-padding {
  padding: 0;
}

.VbCard--dashed {
  border: dashed #7c8391 1px;
}
</style>
