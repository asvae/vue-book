import DemoFileOptions from '../Main/DemoFileOptions'

declare module 'vue/types/vue' {
  interface Vue {
    $componentTree: DemoFileOptions
  }
}