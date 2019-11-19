<template>
  <input
    class="VueBookInput"
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
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({})
export default class VueBookInput extends Vue {
  // TODO Check if that default: 'default' is truly needed
  @Prop({ type: String, default: 'default' }) type!: string
  @Prop({ type: String, default: 'default' }) name!: string
  @Prop({ type: String, default: '' }) value!: string
  @Prop({ type: String, default: '' }) placeholder!: string
  @Prop({ type: String, default: '' }) tooltip!: string

  temporaryValue = ''

  focus () {
    (this.$el as HTMLInputElement).focus()
  }

  get valueProxy () {
    if (this.value !== this.temporaryValue) {
      this.temporaryValue = this.value
    }
    return this.temporaryValue
  }

  set valueProxy (value: string) {
    this.temporaryValue = value
    this.$nextTick(() => {
      if (this.value !== this.temporaryValue) {
        this.temporaryValue = this.value
      }
    })
    this.$emit('input', value)
  }
}
</script>

<style lang="scss">
@import "../../../scss/resources";

.VueBookInput {
  &:focus::placeholder {
    opacity: 0;
  }

  border-radius: $border-radius--main;
  border: none;
  padding: 4px 24px 4px 5px;
  width: 100%;
}
</style>
