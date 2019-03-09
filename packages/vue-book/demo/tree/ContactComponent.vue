<template>
  <div>
    <h2>Vue component tree</h2>
    <a href="https://github.com/asvae/vue-book">Repo</a>
    <ul>
      <li>Display your components as a tree or flat list.</li>
      <li>Preview components on the page.</li>
      <li>Text search (keybind: press Shift then Shift)</li>
      <li>Routing support.</li>
      <li>Saves on page reload.</li>
      <li>Colored statuses.</li>
    </ul>
  </div>
</template>

<script lang="ts">
export default {
  data () {
    return {
      some: 'some',
    }
  },
}
</script>
