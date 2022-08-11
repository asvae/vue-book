<template>
  <VbDemo>
    <VbCard title="default">
      <VbInput
        style="width: 400px"
        v-model="normal"
      />
    </VbCard>
    <VbCard title="placeholder">
      <VbInput
        v-model="normal"
        style="width: 400px"
        placeholder="Placeholder"
      />
    </VbCard>
    <VbCard title="events">
      <VbInput
        v-model="normal"
        @update:modelValue="log('update:modelValue', $event)"
        style="width: 400px"
        placeholder="events"
        @focus="log('focus')"
        @blur="log('blur')"
        @up="log('up')"
        @down="log('down')"
        @enter="log('enter')"
      />
    </VbCard>
    <VbCard title="focus">
      <VbInput
        ref="focus_input"
        v-model="normal"
        style="width: 400px"
      />
      <button @click="$refs.focus_input.focus()">Focus</button>
    </VbCard>
  </VbDemo>
</template>

<script setup lang="ts">
import VbInput from './SearchInput.vue'
import VbDemo from '../../exposed/VbDemo.vue'
import VbCard from '../../exposed/VbCard.vue'
import { ref } from 'vue'

const normal = ref('')

const log = console.log
</script>
