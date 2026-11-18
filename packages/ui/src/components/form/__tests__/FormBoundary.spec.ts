import { defineComponent, nextTick, reactive, ref } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { DanForm, DanFormItem } from '../index'
import { DanInput } from '../../input'

describe('DanForm boundary cases', () => {
  it('clears validation state only for the given prop', async () => {
    const Comp = defineComponent({
      components: { DanForm, DanFormItem, DanInput },
      setup(_, { expose }) {
        const formRef = ref<InstanceType<typeof DanForm>>()
        const model = reactive({ a: '', b: '' })
        const rules = {
          a: [{ required: true, message: 'A 必填', trigger: 'blur' }],
          b: [{ required: true, message: 'B 必填', trigger: 'blur' }],
        }
        expose({ formRef, model })
        return { formRef, model, rules }
      },
      template: `
        <DanForm ref="formRef" :model="model" :rules="rules">
          <DanFormItem prop="a"><DanInput v-model="model.a" /></DanFormItem>
          <DanFormItem prop="b"><DanInput v-model="model.b" /></DanFormItem>
        </DanForm>
      `,
    })
    const wrapper = mount(Comp)
    await nextTick()
    const formRef = (wrapper.vm as any).formRef

    await formRef.validate()
    await nextTick()
    expect(wrapper.text()).toContain('A 必填')
    expect(wrapper.text()).toContain('B 必填')

    formRef.clearValidate('a')
    await nextTick()
    expect(wrapper.text()).not.toContain('A 必填')
    expect(wrapper.text()).toContain('B 必填')

    formRef.clearValidate(['b'])
    await nextTick()
    expect(wrapper.text()).not.toContain('B 必填')
  })

  it('returns true when validating an unregistered prop', async () => {
    const Comp = defineComponent({
      components: { DanForm, DanFormItem, DanInput },
      setup() {
        const model = reactive({ name: '' })
        return { model }
      },
      template: `
        <DanForm :model="model">
          <DanFormItem prop="name"><DanInput v-model="model.name" /></DanFormItem>
        </DanForm>
      `,
    })
    const wrapper = mount(Comp)
    await nextTick()
    const formRef = wrapper.findComponent(DanForm)
    expect(await (formRef.vm as any).validateField('missing')).toBe(true)
  })

  it('reports per-field state through getFieldsState', async () => {
    const Comp = defineComponent({
      components: { DanForm, DanFormItem, DanInput },
      setup(_, { expose }) {
        const formRef = ref<InstanceType<typeof DanForm>>()
        const model = reactive({ name: '', age: '20' })
        const rules = {
          name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        }
        expose({ formRef, model })
        return { formRef, model, rules }
      },
      template: `
        <DanForm ref="formRef" :model="model" :rules="rules">
          <DanFormItem prop="name"><DanInput v-model="model.name" /></DanFormItem>
          <DanFormItem prop="age"><DanInput v-model="model.age" /></DanFormItem>
        </DanForm>
      `,
    })
    const wrapper = mount(Comp)
    await nextTick()
    const formRef = (wrapper.vm as any).formRef

    const result = await formRef.validate()
    expect(result.valid).toBe(false)
    expect(result.fields).toHaveLength(2)
    expect(result.fields[0]).toMatchObject({
      prop: 'name',
      valid: false,
      validateState: 'error',
      message: '请输入姓名',
    })
    expect(result.fields[1]).toMatchObject({ prop: 'age', valid: true })
  })

  it('propagates disabled to child controls', () => {
    const Comp = defineComponent({
      components: { DanForm, DanFormItem, DanInput },
      setup() {
        const model = reactive({ name: '' })
        return { model }
      },
      template: `
        <DanForm :model="model" disabled>
          <DanFormItem prop="name"><DanInput v-model="model.name" /></DanFormItem>
        </DanForm>
      `,
    })
    const wrapper = mount(Comp)
    expect(wrapper.get('form').classes()).toContain('is-disabled')
    expect(wrapper.get('.dan-input').classes()).toContain('is-disabled')
    expect(wrapper.get('input').attributes('disabled')).toBeDefined()
  })

  it('skips optional rules when the value is empty', async () => {
    const Comp = defineComponent({
      components: { DanForm, DanFormItem, DanInput },
      setup(_, { expose }) {
        const formRef = ref<InstanceType<typeof DanForm>>()
        const model = reactive({ code: '' })
        const rules = {
          code: [
            { min: 3, message: '至少 3 位', trigger: 'blur' },
            { pattern: /^\d+$/, message: '只能是数字', trigger: 'blur' },
          ],
        }
        expose({ formRef, model })
        return { formRef, model, rules }
      },
      template: `
        <DanForm ref="formRef" :model="model" :rules="rules">
          <DanFormItem prop="code"><DanInput v-model="model.code" /></DanFormItem>
        </DanForm>
      `,
    })
    const wrapper = mount(Comp)
    await nextTick()
    const formRef = (wrapper.vm as any).formRef

    expect((await formRef.validate()).valid).toBe(true)
    ;(wrapper.vm as any).model.code = 'ab'
    const tooShort = await formRef.validate()
    expect(tooShort.valid).toBe(false)
    expect(wrapper.text()).toContain('至少 3 位')
  })

  it('respects validateOnRuleChange', async () => {
    const makeHost = (validateOnRuleChange: boolean) => {
      const rules = ref<Record<string, unknown>>({})
      const Comp = defineComponent({
        components: { DanForm, DanFormItem, DanInput },
        setup() {
          const model = reactive({ name: '' })
          return { model, rules }
        },
        template: `
          <DanForm :model="model" :rules="rules" :validate-on-rule-change="${validateOnRuleChange}">
            <DanFormItem prop="name"><DanInput v-model="model.name" /></DanFormItem>
          </DanForm>
        `,
      })
      return { Comp, rules }
    }

    const off = makeHost(false)
    const offWrapper = mount(off.Comp)
    await nextTick()
    off.rules.value = {
      name: [{ required: true, message: '变更后必填', trigger: 'blur' }],
    }
    await flushPromises()
    expect(offWrapper.text()).not.toContain('变更后必填')

    const on = makeHost(true)
    const onWrapper = mount(on.Comp)
    await nextTick()
    on.rules.value = {
      name: [{ required: true, message: '变更后必填', trigger: 'blur' }],
    }
    await flushPromises()
    expect(onWrapper.text()).toContain('变更后必填')
  })
})
