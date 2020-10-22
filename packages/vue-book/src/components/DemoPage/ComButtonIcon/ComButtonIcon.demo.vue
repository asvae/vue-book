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
import { Vue, Options } from 'vue-class-component'
import ComButtonIcon from './ComButtonIcon.vue'

@Options({
  components: { ComButtonIcon },
})
export default class ComButtonIconDemo extends Vue {
  active = false
}
</script>
