<template>
  <input
    class="VbInput"
    v-model="valueProxy"
    :name="name"
    :placeholder="placeholder"
    :type="type"
    @keydown.up.prevent="$emit('up')"
    @keydown.down.prevent="$emit('down')"
    @keypress.enter.prevent="$emit('enter')"
    autocomplete="off"
    @focus="$emit('focus')"
    @blur="$emit('blur')"
  >
</template>

<script lang="ts">
import { nextTick } from 'vue'
import { Vue, Options } from 'vue-class-component'
import { Prop } from 'vue-property-decorator'

@Options({
  name: 'VbInput',
  emits: ['update:modelValue', 'focus', 'blur', 'up', 'down', 'enter'],
})
export default class VbInput extends Vue {
  // TODO Check if that default: 'default' is truly needed
  @Prop({ type: String, default: 'default' }) type!: string
  @Prop({ type: String, default: 'default' }) name!: string
  @Prop({ type: String, default: '' }) modelValue!: string
  @Prop({ type: String, default: '' }) placeholder!: string
  @Prop({ type: String, default: '' }) tooltip!: string

  temporaryValue = ''

  focus () {
    (this.$el as HTMLInputElement).focus()
  }

  get valueProxy () {
    if (this.modelValue && this.modelValue !== this.temporaryValue) {
      this.temporaryValue = this.modelValue
    }
    return this.temporaryValue
  }

  set valueProxy (value: string) {
    this.temporaryValue = value
    nextTick(() => {
      if (this.modelValue && this.modelValue !== this.temporaryValue) {
        this.temporaryValue = this.modelValue
      }
    })
    this.$emit('update:modelValue', value)
  }
}
</script>

<style lang="scss">
@import "../../../scss/resources";

.VbInput {
  &:focus::placeholder {
    opacity: 0;
  }

  border-radius: $border-radius--main;
  border: none;
  padding: 4px 24px 4px 5px;
  width: 100%;
}
</style>
