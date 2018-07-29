<template>
  <input
    class="vue-book-input"
    v-model="valueProxy"
    :name="name"
    :placeholder="placeholder"
    :type="type"
    @keydown.up.prevent="$emit('up')"
    @keydown.down.prevent="$emit('down')"
    @keypress.enter="$emit('enter')"
    autocomplete="off"
    @focus="$emit('focus')"
    @blur="$emit('blur')"
  >
</template>

<script lang="ts">
// input: HTMLInputElement

export default {
  name: 'vue-book-input',
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
    name: {
      type: String,
      default: 'default',
    },
    value: {
      type: String,
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
      set (value: string) {
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

.vue-book-input {
  &:focus::placeholder {
    opacity: 0;
  }
  border-radius: $border-radius--main;
  border: 1px solid $border-color--main;
  padding: 4px 5px;
  width: 100%;
}
</style>
