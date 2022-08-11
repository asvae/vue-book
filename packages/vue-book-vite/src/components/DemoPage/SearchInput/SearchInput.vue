<template>
  <input
    ref="root"
    class="VbInput"
    v-model="valueProxy"
    :placeholder="placeholder"
    type="text"
    @keydown.up.prevent="$emit('up')"
    @keydown.down.prevent="$emit('down')"
    @keypress.enter.prevent="$emit('enter')"
    autocomplete="off"
    @focus="$emit('focus')"
    @blur="$emit('blur')"
  >
</template>

<script setup lang="ts">
import { computed, nextTick, ref } from 'vue'

const emits = defineEmits(['update:modelValue', 'focus', 'blur', 'up', 'down', 'enter'])

const props = defineProps<{
  modelValue: string,
  placeholder?: string,
}>()

const root = ref<HTMLInputElement>(null as any)
const temporaryValue = ref('')

const valueProxy = computed<string>({
  set: (value: string) => {
    temporaryValue.value = value
    // TODO Not sure what is this for, but probably to prevent emit without user input.
    nextTick(() => {
      if (props.modelValue && props.modelValue !== temporaryValue.value) {
        temporaryValue.value = props.modelValue
      }
    })
    emits('update:modelValue', value)
  },
  get: () => {
    if (props.modelValue && props.modelValue !== temporaryValue.value) {
      temporaryValue.value = props.modelValue
    }
    return temporaryValue.value
  },
})

defineExpose({
  focus: () => {
    (root.value as HTMLInputElement).focus()
  }
})
</script>

<style>
:root {
  --border-radius-main: 3px;
}

.VbInput:focus::placeholder {
  opacity: 0;
}

.VbInput {
  border-radius: var(--border-radius-main);
  border: none;
  padding: 4px 24px 4px 5px;
  width: 100%;
}
</style>
