<template>
    <div class="demo-container">
        <div class="demo-container__item">
            <com-button-icon type="coffee"/>
            <com-button-icon type="server"/>
        </div>
    </div>
</template>

<script>
  import ComButtonIcon from './ComButtonIcon.vue'

  export default {
    components: {
      ComButtonIcon,
    },
  }
</script>