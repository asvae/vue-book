import Vue from 'vue'

export class ScreenSizeService {
  public width = window.innerWidth
  constructor () {
    window.addEventListener("resize", () => {
      this.width = window.innerWidth
    });
  }

  get widthPx (): string {
    return `${this.width}px`
  }

  get isMobile (): boolean {
    return this.width <= 512
  }
}

export const screenSizeService = Vue.observable(new ScreenSizeService())
