import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineComponent, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { DanCarousel, DanCarouselItem } from '../index'

function makeCarousel(attrs = '') {
  const Comp = defineComponent({
    components: { DanCarousel, DanCarouselItem },
    template: `
      <DanCarousel :autoplay="false" arrow="always" ${attrs}>
        <DanCarouselItem><div class="s1">one</div></DanCarouselItem>
        <DanCarouselItem><div class="s2">two</div></DanCarouselItem>
        <DanCarouselItem><div class="s3">three</div></DanCarouselItem>
      </DanCarousel>
    `,
  })
  return mount(Comp, { attachTo: document.body })
}

describe('DanCarousel direction', () => {
  it('defaults to horizontal', async () => {
    const wrapper = makeCarousel()
    await nextTick()
    const root = wrapper.get('.dan-carousel')
    expect(root.classes()).toContain('dan-carousel--horizontal')
    expect(root.classes()).not.toContain('dan-carousel--vertical')
    wrapper.unmount()
  })

  it('marks the root as vertical and keeps paging working', async () => {
    const wrapper = makeCarousel('direction="vertical"')
    await nextTick()
    const root = wrapper.get('.dan-carousel')
    expect(root.classes()).toContain('dan-carousel--vertical')

    await wrapper.get('[aria-label="下一张"]').trigger('click')
    await nextTick()
    expect(wrapper.find('.dan-carousel-item.is-active .s2').exists()).toBe(true)

    await wrapper.get('[aria-label="上一张"]').trigger('click')
    await nextTick()
    expect(wrapper.find('.dan-carousel-item.is-active .s1').exists()).toBe(true)
    wrapper.unmount()
  })

  it('swaps the arrow glyphs for vertical paging', async () => {
    const horizontal = makeCarousel()
    const vertical = makeCarousel('direction="vertical"')
    await nextTick()

    const horizontalPrev = horizontal
      .get('[aria-label="上一张"] .dan-icon')
      .html()
    const verticalPrev = vertical.get('[aria-label="上一张"] .dan-icon').html()
    const horizontalNext = horizontal
      .get('[aria-label="下一张"] .dan-icon')
      .html()
    const verticalNext = vertical.get('[aria-label="下一张"] .dan-icon').html()

    expect(verticalPrev).not.toBe(horizontalPrev)
    expect(verticalNext).not.toBe(horizontalNext)
    // 上下箭头互为镜像关系，不应与左右箭头相同
    expect(verticalPrev).not.toBe(verticalNext)

    horizontal.unmount()
    vertical.unmount()
  })

  it('keeps the indicator list next to the vertical track', async () => {
    const wrapper = makeCarousel('direction="vertical"')
    await nextTick()
    expect(wrapper.findAll('.dan-carousel__indicator')).toHaveLength(3)
    expect(wrapper.get('.dan-carousel__indicators').element.parentElement).toBe(
      wrapper.get('.dan-carousel').element,
    )
    wrapper.unmount()
  })

  it('ships the vertical layout rules in the component style', () => {
    const css = readFileSync(
      resolve(dirname(fileURLToPath(import.meta.url)), '../style.css'),
      'utf8',
    )
    expect(css).toContain('.dan-carousel--vertical .dan-carousel__arrow')
    expect(css).toContain('.dan-carousel--vertical .dan-carousel__indicators')
    expect(css).toContain('flex-direction: column')
  })
})
