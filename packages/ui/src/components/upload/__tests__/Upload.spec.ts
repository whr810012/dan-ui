import { defineComponent, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { DanUpload } from '../index'
import type { UploadFile } from '../types'

function createFile(name: string, size = 8) {
  return new File([new Uint8Array(size)], name, { type: 'text/plain' })
}

describe('DanUpload', () => {
  it('adds files and removes them', async () => {
    const fileList = ref<UploadFile[]>([])
    const Comp = defineComponent({
      components: { DanUpload },
      setup() {
        return { fileList }
      },
      template: `<DanUpload v-model:file-list="fileList" :auto-upload="false" />`,
    })

    const wrapper = mount(Comp)
    const input = wrapper.get('input[type="file"]')
    const file = createFile('a.txt')
    Object.defineProperty(input.element, 'files', {
      value: [file],
      configurable: true,
    })
    await input.trigger('change')
    await nextTick()
    expect(fileList.value).toHaveLength(1)
    expect(fileList.value[0]?.name).toBe('a.txt')

    await wrapper.get('.dan-upload__item-remove').trigger('click')
    await nextTick()
    expect(fileList.value).toHaveLength(0)
  })

  it('emits exceed when over limit', async () => {
    const onExceed = vi.fn()
    const Comp = defineComponent({
      components: { DanUpload },
      setup() {
        return { onExceed }
      },
      template: `
        <DanUpload
          multiple
          :limit="1"
          :auto-upload="false"
          @exceed="onExceed"
        />
      `,
    })

    const wrapper = mount(Comp)
    const input = wrapper.get('input[type="file"]')
    Object.defineProperty(input.element, 'files', {
      value: [createFile('a.txt'), createFile('b.txt')],
      configurable: true,
    })
    await input.trigger('change')
    expect(onExceed).toHaveBeenCalled()
  })
})
