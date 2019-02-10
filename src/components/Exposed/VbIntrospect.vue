<template>
  <div class="VbIntrospect">
    Props
    <table>
      <tr>
        <td>Key</td>
        <td>Required</td>
        <td>Default</td>
        <td>Validator</td>
        <td>Type</td>
      </tr>
      <tr
        v-for="introspectProp in introspectPropList"
        :key="introspectProp.key"
      >
        <td>{{introspectProp.key}}</td>
        <td>{{introspectProp.required}}</td>
        <td>{{introspectProp.default}}</td>
        <td>{{introspectProp.validator}}</td>
        <td>{{introspectProp.type}}</td>
      </tr>
    </table>
    
    Data
    <table>
      <tr>
        <td>Key</td>
        <td>Value</td>
      </tr>
      <tr
        v-for="introspectData in introspectDataList"
        :key="introspectData.key"
      >
        <td>{{introspectData.key}}</td>
        <td>{{introspectData.value}}</td>
      </tr>
    </table>
  
    Methods
    <table>
      <tr>
        <td>Key</td>
        <td>Value</td>
      </tr>
      <tr
        v-for="introspectData in introspectDataList"
        :key="introspectData.key"
      >
        <td>{{introspectData.key}}</td>
        <td>{{introspectData.value}}</td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

const createIntrospectProp = (key: string, prop: any): IntrospectProp => {
  return new IntrospectProp({
    key,
    required: prop.required,
    default: prop.default,
    validator: prop.validator,
    type: prop.type && prop.type.name,
  })
}

class IntrospectProp {
  key: string = ''
  required: boolean = false
  default: any = undefined
  validator: any = undefined
  type: any = undefined

  constructor (data: Partial<IntrospectProp>) {
    Object.assign(this, data)
  }
}

class IntrospectData {
  key: string = ''
  value: undefined = undefined

  constructor (data: Partial<IntrospectData>) {
    Object.assign(this, data)
  }
}

export default {
  name: 'VbIntrospect',
  data () {
    return {
      componentInstance: new Vue(this.component),
    }
  },
  props: {
    component: {
      type: Object,
      required: true,
    },
  },
  computed: {
    introspectPropList (): IntrospectProp[] {
      const result = []
      for (const key in this.component.props) {
        result.push(createIntrospectProp(key, this.component.props[key]))
      }
      return result
    },
    introspectDataList () {
      const data = this.componentInstance.$data
      const result = []
      for (const key in data) {
        result.push(new IntrospectData({
          key,
          value: data[key],
        }))
      }
      return result
    },
  },
}
</script>

<style lang="scss">
.VbIntrospect {

}
</style>