<template>
  <table>
    <tr v-for="icon in iconNames">
      <td><VbIcon :name="icon"/></td>
      <td>{{icon}}</td>
    </tr>
  </table>
</template>

<script setup lang="ts">
import VbIcon from '../VbIcon.vue'
import { icons } from '../icons'

const iconNames = Object.keys(icons)
</script>
