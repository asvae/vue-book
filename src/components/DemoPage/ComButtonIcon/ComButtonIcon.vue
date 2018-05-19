<template>
    <div class="com-button-icon"
         :class="{'com-button-icon--active': active}"
    >
        <font-awesome-icon :icon="icon"/>
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
      icon: {
        type: String,
        required: true,
      },
      active: {
        type: Boolean,
        required: false,
      },
    },
  }
</script>

<style lang="scss">
    @import "../../../scss/resources";

    .com-button-icon {
        cursor: pointer;
        display: inline-flex;
        border-radius: 3px;
        padding: 3px;
        @include flexCenter();

        &--active {
            padding: 2px;
            border: $color--main solid 1px;
            background-color: #c7d6e1;
        }
    }
</style>
