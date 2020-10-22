import { Options, Vue } from 'vue-class-component'
import { ArrayHelpers } from 'asva-helpers'
import { Inject, Prop } from 'vue-property-decorator'

const createContainerFocusService = () => {
  class Container extends Vue {
      focusedContainers: string[] = []

      focusContainer (id: string): void {
        this.focusedContainers.push(id)
      }

      unfocusContainer (id: string): void {
        ArrayHelpers.remove(this.focusedContainers, id)
      }

      isUnfocused (id: string): boolean {
        // TODO Use proper TS.
        return (this as any).focusedContainers.length &&
          !this.focusedContainers.includes(id)
      }
  }
  return Container
}

export class ContainerFocusProvideMixin extends Vue {
  provide () {
    return {
      vbFocusService: createContainerFocusService(),
    }
  }
}

export class ContainerFocusInjectMixin extends Vue {
  @Inject({ default: null }) vbFocusService!: any
  @Prop(Boolean) focus!: boolean

  id = Math.round(Math.random() * 100000) + ''

  created () {
    if (!this.vbFocusService) {
      return
    }
    if (this.focus) {
      this.vbFocusService.focusContainer(this.id)
    }
  }

  beforeDestroy () {
    if (!this.vbFocusService) {
      return
    }
    if (this.focus) {
      this.vbFocusService.unfocusContainer(this.id)
    }
  }

  get isHiddenAsUnfocused () {
    if (!this.vbFocusService) {
      return
    }
    return this.vbFocusService.isUnfocused(this.id)
  }
}
