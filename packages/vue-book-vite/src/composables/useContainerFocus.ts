import { ArrayHelpers } from 'asva-helpers'
import {
  computed,
  inject,
  onBeforeUnmount,
  onMounted,
  provide,
  reactive,
} from 'vue'

// TODO Looks particularly dubious
const createContainerFocusService = () => {
   class FService {
    focusedContainers: string[] = reactive([])

    focusContainer = (id: string): void => {
      this.focusedContainers.push(id)
    }

    unfocusContainer = (id: string): void => {
      // TODO Remove library
      ArrayHelpers.remove(this.focusedContainers, id)
    }

    isUnfocused = (id: string): boolean => {
      // TODO Use proper TS.
      return (this as any).focusedContainers.length &&
        !this.focusedContainers.includes(id)
    }
  }
  return new FService()
}

export const useContainerFocusProvide = () => {
  provide('vbFocusService', createContainerFocusService())
}

export const useContainerFocusInject = () => {
  const vbFocusService = inject<any>('vbFocusService')

  const props = defineProps<{focus: boolean}>()

  const id = Math.round(Math.random() * 100000) + ''

  onMounted(() => {
    if (!vbFocusService) {
      return
    }
    if (props.focus) {
      vbFocusService.focusContainer(id)
    }
  })

  onBeforeUnmount(() => {
    if (!vbFocusService) {
      return
    }
    if (props.focus) {
      vbFocusService.unfocusContainer(id)
    }
  })

  const isHiddenAsUnfocused = computed(() => {
    if (!vbFocusService) {
      return
    }
    return vbFocusService.isUnfocused(id)
  })

  return {
    focus: props.focus,
    isHiddenAsUnfocused,
  }
}
