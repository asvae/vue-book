<template>
    <div class="com-button-icon">
        <font-awesome-icon :icon="type"/>
    </div>
</template>

<script>
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

  export default {
    name: 'com-button-icon',
    components: {
      FontAwesomeIcon,
    },
    props: {
      type: {
        required: true,
        type: String,
      },
    },
  }
</script>

<style lang="scss">
    @import "../../../scss/resources";

    .com-button-icon {
        width: 100px;
        height: 100px;

        cursor: pointer;
        display: inline-flex;
        border-radius: 3px;

        &--active {
            background-color: #c7d6e1;
        }
    }
</style>
