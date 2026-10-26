import { defineComponent, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { DanCarousel, DanCarouselItem } from '../index'

describe('DanCarousel', () => {
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
})
