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

  it('supports abortable httpRequest', async () => {
    const abortFn = vi.fn()
    const httpRequest = vi.fn(({ onProgress }) => {
      onProgress(10)
      return { abort: abortFn }
    })
    const fileList = ref<UploadFile[]>([])
    const Comp = defineComponent({
      components: { DanUpload },
      setup() {
        return { fileList, httpRequest }
      },
      template: `<DanUpload ref="up" v-model:file-list="fileList" :http-request="httpRequest" />`,
    })

    const wrapper = mount(Comp)
    const input = wrapper.get('input[type="file"]')
    Object.defineProperty(input.element, 'files', {
      value: [createFile('slow.bin', 64)],
      configurable: true,
    })
    await input.trigger('change')
    await nextTick()
    expect(httpRequest).toHaveBeenCalled()
    ;(wrapper.findComponent(DanUpload).vm as { abortAll: () => void }).abortAll()
    await nextTick()
    expect(abortFn).toHaveBeenCalled()
    expect(fileList.value[0]?.status).toBe('fail')
  })

  it('uploads in chunks when chunkSize is set', async () => {
    const chunks: number[] = []
    const beforeChunkUpload = vi.fn((chunk) => {
      chunks.push(chunk.index)
      return true
    })
    const httpRequest = vi.fn(({ chunk, onSuccess }) => {
      onSuccess({ index: chunk?.index })
    })
    const fileList = ref<UploadFile[]>([])
    const Comp = defineComponent({
      components: { DanUpload },
      setup() {
        return { fileList, httpRequest, beforeChunkUpload }
      },
      template: `
        <DanUpload
          v-model:file-list="fileList"
          :chunk-size="4"
          :before-chunk-upload="beforeChunkUpload"
          :http-request="httpRequest"
        />
      `,
    })

    const wrapper = mount(Comp)
    const input = wrapper.get('input[type="file"]')
    Object.defineProperty(input.element, 'files', {
      value: [createFile('chunk.bin', 10)],
      configurable: true,
    })
    await input.trigger('change')
    await vi.waitFor(() => {
      expect(fileList.value[0]?.status).toBe('success')
    })
    expect(chunks).toEqual([0, 1, 2])
    expect(httpRequest).toHaveBeenCalledTimes(3)
    expect(beforeChunkUpload).toHaveBeenCalledTimes(3)
  })

  it('retries a failed file', async () => {
    let failOnce = true
    const httpRequest = vi.fn(({ onSuccess, onError }) => {
      if (failOnce) {
        failOnce = false
        onError(new Error('network'))
        return
      }
      onSuccess({ ok: true })
    })
    const fileList = ref<UploadFile[]>([])
    const Comp = defineComponent({
      components: { DanUpload },
      setup() {
        return { fileList, httpRequest }
      },
      template: `<DanUpload ref="up" v-model:file-list="fileList" :http-request="httpRequest" />`,
    })

    const wrapper = mount(Comp)
    const input = wrapper.get('input[type="file"]')
    Object.defineProperty(input.element, 'files', {
      value: [createFile('retry.txt')],
      configurable: true,
    })
    await input.trigger('change')
    await vi.waitFor(() => {
      expect(fileList.value[0]?.status).toBe('fail')
    })
    const upload = wrapper.findComponent(DanUpload).vm as {
      retry: (file: UploadFile) => void
    }
    upload.retry(fileList.value[0]!)
    await vi.waitFor(() => {
      expect(fileList.value[0]?.status).toBe('success')
    })
    expect(httpRequest).toHaveBeenCalledTimes(2)
  })
})
