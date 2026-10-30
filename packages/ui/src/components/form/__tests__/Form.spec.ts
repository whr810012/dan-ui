import { defineComponent, nextTick, reactive, ref } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { DanForm, DanFormItem } from '../index'
import { DanInput } from '../../input'

describe('DanForm', () => {
  it('applies asterisk position class', () => {
    const Comp = defineComponent({
      components: { DanForm, DanFormItem, DanInput },
      setup() {
        const model = reactive({ name: '' })
        return { model }
      },
      template: `
        <DanForm :model="model" require-asterisk-position="right">
          <DanFormItem label="姓名" prop="name" required>
            <DanInput v-model="model.name" />
          </DanFormItem>
        </DanForm>
      `,
    })
    const wrapper = mount(Comp)
    expect(wrapper.find('form').classes()).toContain('dan-form--asterisk-right')
  })

  it('validates required fields', async () => {
    const Comp = defineComponent({
      components: { DanForm, DanFormItem, DanInput },
      setup(_, { expose }) {
        const formRef = ref<InstanceType<typeof DanForm>>()
        const model = reactive({ name: '' })
        const rules = {
          name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        }
        expose({ formRef, model })
        return { formRef, model, rules }
      },
      template: `
        <DanForm ref="formRef" :model="model" :rules="rules">
          <DanFormItem label="姓名" prop="name">
            <DanInput v-model="model.name" />
          </DanFormItem>
        </DanForm>
      `,
    })

    const wrapper = mount(Comp)
    const formRef = (wrapper.vm as any).formRef
    const valid = await formRef.validate()
    expect(valid.valid).toBe(false)
    expect(valid.fields[0]?.message).toContain('请输入姓名')
    await nextTick()
    expect(wrapper.text()).toContain('请输入姓名')

    ;(wrapper.vm as any).model.name = 'Ada'
    const ok = await formRef.validate()
    expect(ok.valid).toBe(true)
  })

  it('supports nested field path', async () => {
    const Comp = defineComponent({
      components: { DanForm, DanFormItem, DanInput },
      setup(_, { expose }) {
        const formRef = ref<InstanceType<typeof DanForm>>()
        const model = reactive({ user: { email: '' } })
        const rules = {
          'user.email': [
            { required: true, message: '请输入邮箱', trigger: 'blur' },
          ],
        }
        expose({ formRef, model })
        return { formRef, model, rules }
      },
      template: `
        <DanForm ref="formRef" :model="model" :rules="rules">
          <DanFormItem label="邮箱" prop="user.email">
            <DanInput v-model="model.user.email" />
          </DanFormItem>
        </DanForm>
      `,
    })

    const wrapper = mount(Comp)
    const formRef = (wrapper.vm as any).formRef
    expect((await formRef.validate()).valid).toBe(false)
    ;(wrapper.vm as any).model.user.email = 'a@b.com'
    expect((await formRef.validate()).valid).toBe(true)
  })

  it('resetFields restores initial values', async () => {
    const Comp = defineComponent({
      components: { DanForm, DanFormItem, DanInput },
      setup(_, { expose }) {
        const formRef = ref<InstanceType<typeof DanForm>>()
        const model = reactive({ title: 'init' })
        expose({ formRef, model })
        return { formRef, model }
      },
      template: `
        <DanForm ref="formRef" :model="model">
          <DanFormItem prop="title">
            <DanInput v-model="model.title" />
          </DanFormItem>
        </DanForm>
      `,
    })

    const wrapper = mount(Comp)
    await nextTick()
    ;(wrapper.vm as any).model.title = 'changed'
    ;(wrapper.vm as any).formRef.resetFields()
    expect((wrapper.vm as any).model.title).toBe('init')
  })

  it('revalidates when dependencies change', async () => {
    const Comp = defineComponent({
      components: { DanForm, DanFormItem, DanInput },
      setup(_, { expose }) {
        const formRef = ref<InstanceType<typeof DanForm>>()
        const model = reactive({ password: '', confirm: 'x' })
        const rules = {
          confirm: [
            {
              validator: (
                _rule: unknown,
                value: unknown,
                callback: (error?: string) => void,
              ) => {
                if (value !== model.password) callback('两次输入不一致')
                else callback()
              },
              trigger: 'change',
            },
          ],
        }
        expose({ formRef, model })
        return { formRef, model, rules }
      },
      template: `
        <DanForm ref="formRef" :model="model" :rules="rules">
          <DanFormItem prop="password">
            <DanInput v-model="model.password" />
          </DanFormItem>
          <DanFormItem prop="confirm" :dependencies="['password']">
            <DanInput v-model="model.confirm" />
          </DanFormItem>
        </DanForm>
      `,
    })
    const wrapper = mount(Comp)
    await (wrapper.vm as any).formRef.validateField('confirm')
    expect(wrapper.text()).toContain('两次输入不一致')
    ;(wrapper.vm as any).model.password = 'x'
    await flushPromises()
    expect(wrapper.text()).not.toContain('两次输入不一致')
  })

  it('scrollToField scrolls the form item into view', async () => {
    const Comp = defineComponent({
      components: { DanForm, DanFormItem, DanInput },
      setup(_, { expose }) {
        const formRef = ref<InstanceType<typeof DanForm>>()
        const model = reactive({ name: '' })
        expose({ formRef })
        return { formRef, model }
      },
      template: `
        <DanForm ref="formRef" :model="model" scroll-to-error>
          <DanFormItem label="姓名" prop="name">
            <DanInput v-model="model.name" />
          </DanFormItem>
        </DanForm>
      `,
    })
    const wrapper = mount(Comp, { attachTo: document.body })
    await nextTick()
    const item = wrapper.find('.dan-form-item').element as HTMLElement
    let called = false
    item.scrollIntoView = () => {
      called = true
    }
    ;(wrapper.vm as any).formRef.scrollToField('name')
    expect(called).toBe(true)
    wrapper.unmount()
  })
})
