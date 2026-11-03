import { defineComponent, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { DanCarousel, DanCarouselItem } from '../index'

describe('DanCarousel', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('switches to next slide', async () => {
    const Comp = defineComponent({
      components: { DanCarousel, DanCarouselItem },
      template: `
        <DanCarousel :autoplay="false" arrow="always">
          <DanCarouselItem><div class="s1">one</div></DanCarouselItem>
          <DanCarouselItem><div class="s2">two</div></DanCarouselItem>
        </DanCarousel>
      `,
    })

    const wrapper = mount(Comp, { attachTo: document.body })
    await nextTick()
    expect(wrapper.find('.s1').exists()).toBe(true)
    await wrapper.get('[aria-label="下一张"]').trigger('click')
    await nextTick()
    expect(wrapper.find('.dan-carousel-item.is-active .s2').exists()).toBe(true)
    wrapper.unmount()
  })

  it('keeps autoplay on hover when pauseOnHover is false', async () => {
    const Comp = defineComponent({
      components: { DanCarousel, DanCarouselItem },
      template: `
        <DanCarousel :interval="1000" :pause-on-hover="false" arrow="never">
          <DanCarouselItem><div class="s1">one</div></DanCarouselItem>
          <DanCarouselItem><div class="s2">two</div></DanCarouselItem>
        </DanCarousel>
      `,
    })
    const wrapper = mount(Comp, { attachTo: document.body })
    await nextTick()
    await wrapper.get('.dan-carousel').trigger('mouseenter')
    await vi.advanceTimersByTimeAsync(1000)
    expect(wrapper.find('.dan-carousel-item.is-active .s2').exists()).toBe(true)
    wrapper.unmount()
  })

  it('switches indicator on hover when trigger is hover', async () => {
    const Comp = defineComponent({
      components: { DanCarousel, DanCarouselItem },
      template: `
        <DanCarousel :autoplay="false" trigger="hover">
          <DanCarouselItem><div class="s1">one</div></DanCarouselItem>
          <DanCarouselItem><div class="s2">two</div></DanCarouselItem>
        </DanCarousel>
      `,
    })
    const wrapper = mount(Comp, { attachTo: document.body })
    await nextTick()
    const buttons = wrapper.findAll('.dan-carousel__indicator button')
    await buttons[1].trigger('mouseenter')
    await nextTick()
    expect(wrapper.find('.dan-carousel-item.is-active .s2').exists()).toBe(true)
    wrapper.unmount()
  })
})
