<template>
  <VbDemo>
    <VbCard title="icons">
      <table>
        <tr v-for="icon in icons">
          <td><VbIcon :name="icon"/></td>
          <td>{{icon}}</td>
        </tr>
      </table>
    </VbCard>
  </VbDemo>
</template>

<script setup lang="ts">
import VbIcon from './VbIcon.vue'
import VbDemo from '../../exposed/VbDemo.vue'
import VbCard from '../../exposed/VbCard.vue'

const icons = [
  'server',
  'bars',
  'xmark',
  'arrow-left',
  'magnifying-glass',
  'circle-dot',
  'file',
  'folder',
  'caret-down',
  'caret-right',
]
</script>
