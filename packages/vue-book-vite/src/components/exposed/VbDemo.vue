<template>
  <div class="VbDemo">
    <slot/>
  </div>
</template>

<script setup lang="ts">

</script>

<style>
.VbDemo {
  height: 100%;
  overflow: auto;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: flex-start;
  background-color: #eeeeee;
}
</style>
