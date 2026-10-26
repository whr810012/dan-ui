import type { InjectionKey, Ref } from 'vue'

export interface CarouselContext {
  activeIndex: Ref<number>
  items: Ref<symbol[]>
  registerItem: (id: symbol) => () => void
}

export const carouselContextKey: InjectionKey<CarouselContext> =
  Symbol('DanCarousel')
