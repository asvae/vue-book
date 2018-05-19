<template>
  <div class="demo-container">
    <div class="demo-container__item">
      <com-input
        v-model="normal"
        placeholder="Normal"
      />
    </div>
  </div>
</template>

<script>
  import ComInput from './ComInput.vue'

  export default {
    components: {
      ComInput,
    },
    data () {
      return {
        normal: '',
      }
    },
  }
</script>
