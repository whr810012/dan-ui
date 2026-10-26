import { defineComponent, nextTick, reactive, ref } from 'vue'
import { mount, flushPromises } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { DanRichText } from '../index'
import { DanForm, DanFormItem } from '../../form'

describe('DanRichText', () => {
  it('updates html v-model when typing via commands', async () => {
    const value = ref('<p>hello</p>')
    const Comp = defineComponent({
      components: { DanRichText },
      setup() {
        return { value }
      },
      template: `<DanRichText v-model="value" output="html" />`,
    })

    const wrapper = mount(Comp, { attachTo: document.body })
    await flushPromises()
    await nextTick()

    const exposed = wrapper.findComponent(DanRichText).vm as any
    const editor = exposed.getEditor?.() || exposed.editor
    expect(editor).toBeTruthy()
    editor.commands.setContent('<p>world</p>')
    await nextTick()
    expect(String(value.value)).toContain('world')
    wrapper.unmount()
  })

  it('works with FormItem required validation', async () => {
    const formRef = ref<any>()
    const model = reactive({ content: '' })
    const Comp = defineComponent({
      components: { DanForm, DanFormItem, DanRichText },
      setup() {
        return {
          formRef,
          model,
          rules: {
            content: [{ required: true, message: '请填写正文', trigger: 'blur' }],
          },
        }
      },
      template: `
        <DanForm ref="formRef" :model="model" :rules="rules">
          <DanFormItem label="正文" prop="content">
            <DanRichText v-model="model.content" />
          </DanFormItem>
        </DanForm>
      `,
    })

    const wrapper = mount(Comp, { attachTo: document.body })
    await flushPromises()
    const ok = await (wrapper.vm as any).formRef.validate()
    expect(ok).toBe(false)
    expect(wrapper.text()).toContain('请填写正文')
    wrapper.unmount()
  })
})
