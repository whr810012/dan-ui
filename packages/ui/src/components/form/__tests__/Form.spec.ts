import { defineComponent, nextTick, reactive, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { DanForm, DanFormItem } from '../index'
import { DanInput } from '../../input'

describe('DanForm', () => {
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
    expect(valid).toBe(false)
    await nextTick()
    expect(wrapper.text()).toContain('请输入姓名')

    ;(wrapper.vm as any).model.name = 'Ada'
    const ok = await formRef.validate()
    expect(ok).toBe(true)
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
    expect(await formRef.validate()).toBe(false)
    ;(wrapper.vm as any).model.user.email = 'a@b.com'
    expect(await formRef.validate()).toBe(true)
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
})
