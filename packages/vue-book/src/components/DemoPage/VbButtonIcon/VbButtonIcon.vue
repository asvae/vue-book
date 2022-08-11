<template>
  <div
    class="ComButtonIcon"
    :class="{'ComButtonIcon--active': active}"
  >
    <!-- v-on="$listeners" -->
    <font-awesome-icon :icon="icon" />
  </div>
</template>

<script lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { Vue, Options } from 'vue-class-component'
import { Prop } from 'vue-property-decorator'

@Options({
  name: 'ComButtonIcon',
  components: {
    FontAwesomeIcon,
  },
})
export default class ComButtonIcon extends Vue {
  @Prop({ type: String, required: true }) icon!: string
  @Prop({ type: Boolean, default: false }) active!: boolean
}
</script>

<style lang="scss">
@import "../../../scss/resources";

.ComButtonIcon {
  cursor: pointer;
  display: inline-flex;
  border-radius: 3px;
  padding: 3px;
  @include flexCenter();
  color: $color--icon;

  &--active {
    padding: 2px;
    border: $color--main solid 1px;
    background-color: #c7d6e1;
  }
}
</style>
