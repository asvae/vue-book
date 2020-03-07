<template>
  <div class="ComButtonIcon"
       :class="{'ComButtonIcon--active': active}"
  >
    <font-awesome-icon :icon="icon"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

@Component({
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
