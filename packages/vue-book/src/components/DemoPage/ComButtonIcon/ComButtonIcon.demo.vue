<template>
  <VbDemo>
    <VbCard>
      <com-button-icon
        @click.native="active = ! active"
        icon="server"
        :active="active"
      />
      <com-button-icon
        @click.native="active = ! active"
        icon="server"
        :active="! active"
      />
    </VbCard>
  </VbDemo>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ComButtonIcon from './ComButtonIcon.vue'

@Component({
  components: { ComButtonIcon },
})
export default class ComButtonIconDemo extends Vue {
  active = false
}
</script>
