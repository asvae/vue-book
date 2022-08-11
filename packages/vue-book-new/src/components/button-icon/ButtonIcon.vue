<template>
  <div
    class="ButtonIcon"
    :class="{'ButtonIcon--active': props.active}"
  >
    <VbIcon :name="props.icon"/>
  </div>
</template>

<script setup lang="ts">
import VbIcon from '../vb-icon/VbIcon.vue'

const props = defineProps<{
  icon: string,
  active?: boolean,
}>()
</script>

<style>
:root {
  --color--icon: #3f506e;
}

.ButtonIcon {
  color: var(--color--icon);
  cursor: pointer;
  display: inline-flex;
  border-radius: 3px;
  padding: 3px;
  justify-content: center;
  align-items: center;
}

.ButtonIcon--active {
  padding: 2px;
  border: var(--color--icon) solid 1px;
  background-color: #c7d6e1;
}
</style>
