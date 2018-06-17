<template>
  <div class="demo-container">
    <div class="demo-container__item">
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
    </div>
  </div>
</template>

<script>
  import ComButtonIcon from './ComButtonIcon.vue'

  export default {
    components: {
      ComButtonIcon,
    },
    data () {
      return {
        active: false,
      }
    },
  }
</script>