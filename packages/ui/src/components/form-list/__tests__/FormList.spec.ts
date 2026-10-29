import { defineComponent, nextTick, reactive, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { DanForm, DanFormItem } from '../../form'
import { DanInput } from '../../input'
import { DanFormList } from '../index'

describe('DanFormList', () => {
  it('adds and removes rows on model array', async () => {
    const Comp = defineComponent({
      components: { DanForm, DanFormItem, DanFormList, DanInput },
      setup() {
        const model = reactive({ users: [{ name: 'Ada' }] })
        return { model }
      },
      template: `
        <DanForm :model="model">
          <DanFormList prop="users">
            <template #default="{ row, index }">
              <DanFormItem :label="'成员' + (index + 1)" :prop="'users.' + index + '.name'">
                <DanInput v-model="row.name" />
              </DanFormItem>
            </template>
          </DanFormList>
        </DanForm>
      `,
    })
    const wrapper = mount(Comp)
    expect(wrapper.vm.model.users).toHaveLength(1)
    await wrapper.find('.dan-form-list__add').trigger('click')
    expect(wrapper.vm.model.users).toHaveLength(2)
    await wrapper.find('.dan-form-list__remove').trigger('click')
    expect(wrapper.vm.model.users).toHaveLength(1)
  })
})
