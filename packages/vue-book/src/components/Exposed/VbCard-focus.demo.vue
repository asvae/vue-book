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
import { Component, Vue } from 'vue-property-decorator'

import VbDemo from './VbDemo.vue'
import VbCard from './VbCard.vue'

@Component({
  components: {
    VbDemo,
    VbCard,
  },
})
export default class VbCardFocusDemo extends Vue {

}
</script>


