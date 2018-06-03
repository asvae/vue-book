<template>
  <input
    class="com-input"
    v-model="valueProxy"
    :name="name"
    :placeholder="placeholder"
    :type="type"
    autocomplete="off"
  >
</template>

<script>
  export default {
    name: 'com-input',
    data () {
      return {
        temporaryValue: '',
      }
    },
    props: {
      type: {
        type: String,
        default: 'default',
      },
      type: {
        type: String,
        default: 'text',
      },
      name: {
        type: String,
        default: '',
      },
      value: {
        default: '',
      },
      placeholder: {
        type: String,
        default: '',
      },
      tooltip: {
        type: String,
        default: '',
      },
    },
    computed: {
      valueProxy: {
        get () {
          if (this.value !== this.temporaryValue) {
            this.temporaryValue = this.value
          }

          return this.temporaryValue
        },
        set (value) {
          this.temporaryValue = value

          this.$nextTick(() => {
            if (this.value !== this.temporaryValue) {
              this.temporaryValue = this.value
            }
          })

          this.$emit('input', value)
        },
      },
    },
  }
</script>

<style lang="scss">
  @import "../../../scss/resources";

  .com-input {
    // Remove placeholder on focus
    &:focus::placeholder {
      opacity: 0;
    }
    border-radius: $border-radius--input;
    border: 1px solid $border-color--main;
    padding: 4px 5px;
    width: 100%;
  }
</style>
