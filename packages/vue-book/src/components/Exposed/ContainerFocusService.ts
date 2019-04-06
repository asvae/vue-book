import Vue from 'vue'
import { ArrayHelpers } from 'asva-helpers'

const createContainerFocusService = () => new Vue({
  data: () => ({
    focusedContainers: [] as string[]
  }),
  methods: {
    focusContainer (id: string): void {
      this.focusedContainers.push(id)
    },
    unfocusContainer (id: string): void {
      ArrayHelpers.remove(this.focusedContainers, id)
    },
    isUnfocused (id: string): boolean {
      return this.focusedContainers.length
        && !this.focusedContainers.includes(id)
    }
  }
})

export const ContainerFocusProvideMixin = {
  provide () {
    return {
      vbFocusService: createContainerFocusService()
    }
  }
}

export const ContainerFocusInjectMixin = {
  data () {
    return {
      id: Math.round(Math.random() * 100000) + ''
    }
  },
  props: {
    focus: Boolean,
  },
  inject: {
    vbFocusService: {
      default: null
    }
  },
  created () {
    if (! this.vbFocusService) {
      return
    }
    if (this.focus) {
      this.vbFocusService.focusContainer(this.id)
    }
  },
  beforeDestroy () {
    if (! this.vbFocusService) {
      return
    }
    if (this.focus) {
      this.vbFocusService.unfocusContainer(this.id)
    }
  },
  computed: {
    isHiddenAsUnfocused () {
      if (! this.vbFocusService) {
        return
      }
      return this.vbFocusService.isUnfocused(this.id)
    }
  }
}
