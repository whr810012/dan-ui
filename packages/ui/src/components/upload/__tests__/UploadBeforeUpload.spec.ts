import { defineComponent, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { DanUpload } from '../index'
import type { UploadFile } from '../types'

function createFile(name: string, size = 8) {
  return new File([new Uint8Array(size)], name, { type: 'text/plain' })
}

function mountUpload(template: string, setup: () => Record<string, unknown>) {
  const Comp = defineComponent({
    components: { DanUpload },
    setup,
    template,
  })
  return mount(Comp)
}

async function pick(wrapper: ReturnType<typeof mountUpload>, files: File[]) {
  const input = wrapper.get('input[type="file"]')
  Object.defineProperty(input.element, 'files', {
    value: files,
    configurable: true,
  })
  await input.trigger('change')
  // 异步钩子可能跨宏任务，等一轮定时器再断言
  await new Promise((resolve) => setTimeout(resolve, 0))
  await nextTick()
}

describe('DanUpload beforeUpload', () => {
  it('drops files the hook rejects', async () => {
    const fileList = ref<UploadFile[]>([])
    const beforeUpload = vi.fn((file: File) => file.name !== 'bad.txt')
    const wrapper = mountUpload(
      `<DanUpload v-model:file-list="fileList" :auto-upload="false" :before-upload="beforeUpload" />`,
      () => ({ fileList, beforeUpload }),
    )

    await pick(wrapper, [createFile('ok.txt'), createFile('bad.txt')])

    expect(beforeUpload).toHaveBeenCalledTimes(2)
    expect(fileList.value.map((file) => file.name)).toEqual(['ok.txt'])
  })

  it('supports an async hook and awaits it before adding', async () => {
    const fileList = ref<UploadFile[]>([])
    const beforeUpload = vi.fn(
      (file: File) =>
        new Promise<boolean>((resolve) =>
          setTimeout(() => resolve(file.size <= 4), 0),
        ),
    )
    const wrapper = mountUpload(
      `<DanUpload v-model:file-list="fileList" :auto-upload="false" :before-upload="beforeUpload" />`,
      () => ({ fileList, beforeUpload }),
    )

    await pick(wrapper, [
      createFile('small.txt', 4),
      createFile('big.txt', 121),
    ])

    expect(fileList.value.map((file) => file.name)).toEqual(['small.txt'])
  })

  it('treats a thrown error as a rejection instead of crashing', async () => {
    const fileList = ref<UploadFile[]>([])
    const beforeUpload = vi.fn(() => {
      throw new Error('nope')
    })
    const wrapper = mountUpload(
      `<DanUpload v-model:file-list="fileList" :auto-upload="false" :before-upload="beforeUpload" />`,
      () => ({ fileList, beforeUpload }),
    )

    await pick(wrapper, [createFile('a.txt')])
    expect(fileList.value).toHaveLength(0)
  })

  it('counts only the files that survive the hook against limit', async () => {
    const fileList = ref<UploadFile[]>([])
    const onExceed = vi.fn()
    const beforeUpload = vi.fn((file: File) => file.name === 'keep.txt')
    const wrapper = mountUpload(
      `<DanUpload
        multiple
        :limit="1"
        :auto-upload="false"
        :before-upload="beforeUpload"
        v-model:file-list="fileList"
        @exceed="onExceed"
      />`,
      () => ({ fileList, beforeUpload, onExceed }),
    )

    await pick(wrapper, [createFile('keep.txt'), createFile('drop.txt')])

    expect(onExceed).not.toHaveBeenCalled()
    expect(fileList.value).toHaveLength(1)
  })

  it('still reports exceed when every file passes but the list is full', async () => {
    const fileList = ref<UploadFile[]>([])
    const onExceed = vi.fn()
    const beforeUpload = vi.fn(() => true)
    const wrapper = mountUpload(
      `<DanUpload
        multiple
        :limit="1"
        :auto-upload="false"
        :before-upload="beforeUpload"
        v-model:file-list="fileList"
        @exceed="onExceed"
      />`,
      () => ({ fileList, beforeUpload, onExceed }),
    )

    await pick(wrapper, [createFile('a.txt'), createFile('b.txt')])

    expect(onExceed).toHaveBeenCalledTimes(1)
    expect(onExceed.mock.calls[0][0]).toHaveLength(2)
    expect(fileList.value).toHaveLength(0)
  })
})
