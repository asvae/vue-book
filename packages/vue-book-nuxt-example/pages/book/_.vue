<template>
  <client-only>
    <VueBook/>
  </client-only>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

// vue-book is meant to be client only.
let VueBook = { render: () => '' }
if (process.client) {
  // @ts-ignore
  VueBook = require('vue-book').createComponent({
    // @ts-ignore
    requireContext: require.context('./../../components', true, /.demo.vue$/),
    hideFileExtensions: true,
  })
}

// @ts-ignore
@Component({
  components: {
    VueBook,
  },
})
export default class Book extends Vue {

}
</script>
