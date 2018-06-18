<template>
  <div class="demo-container">
    <div class="demo-container__item">
      <vue-book-input
        v-model="normal"
        placeholder="Normal"
      />
    </div>
  </div>
</template>

<script>
  import VueBookInput from './VueBookInput.vue'

  export default {
    components: {
      VueBookInput,
    },
    data () {
      return {
        normal: '',
      }
    },
  }
</script>
