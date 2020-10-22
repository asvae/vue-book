<template>
  <VbDemo>
    <VbCard focus title="Should be displayed" color="green"/>
    <VbCard focus title="Should be displayed" color="green"/>
    <VbCard title="Should not be displayed" color="red"/>
    <VbCard focus title="Should be displayed" color="green"/>
    <VbCard title="Should not be displayed" color="red"/>
    <VbCard title="Should not be displayed" color="red"/>
  </VbDemo>
</template>

<script lang="ts">

import VbDemo from './VbDemo.vue'
import VbCard from './VbCard.vue'
import { Vue, Options } from 'vue-class-component'

@Options({
  components: {
    VbDemo,
    VbCard,
  },
})
export default class VbCardFocusDemo extends Vue {

}
</script>
