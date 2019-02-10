<template>
  <div class="IntrospectComponentExample">
    I am IntrospectComponentExample
  </div>
</template>

<script>
export default {
  name: 'IntrospectComponentExample',
  data () {
    return {
      booleanValue: true,
      numberValue: 5,
      objectValue: {id: 5},
    }
  },
  props: {
    straightObject: {},
    straightNull: null,
    straightUndefined: undefined,
    straightBoolean: Boolean,
    straightString: String,
    straightArray: Array,
    objectArray: {
      type: Array,
    },
    objectArrayRequired: {
      type: Array,
      required: true,
    },
  }
}
</script>

<style lang="scss">
.IntrospectComponentExample {

}
</style>