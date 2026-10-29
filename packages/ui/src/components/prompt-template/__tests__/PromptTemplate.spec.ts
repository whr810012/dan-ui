import { defineComponent, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import {
  DanPromptTemplate,
  extractPromptVariables,
  renderPromptTemplate,
} from '../index'

describe('prompt template utils', () => {
  it('extracts and renders variables', () => {
    expect(extractPromptVariables('你好 {{name}}，写 {{topic}}')).toEqual([
      'name',
      'topic',
    ])
    expect(
      renderPromptTemplate('你好 {{name}}', { name: 'Ada' }),
    ).toBe('你好 Ada')
  })
})

describe('DanPromptTemplate', () => {
  it('applies filled template', async () => {
    const Comp = defineComponent({
      components: { DanPromptTemplate },
      setup() {
        const text = ref('')
        return {
          text,
          onApply: (payload: { text: string }) => {
            text.value = payload.text
          },
        }
      },
      template: `
        <DanPromptTemplate
          template="你好 {{name}}"
          :model-value="{ name: 'Ada' }"
          @apply="onApply"
        />
        <span class="out">{{ text }}</span>
      `,
    })
    const wrapper = mount(Comp)
    await wrapper.find('button').trigger('click')
    expect(wrapper.find('.out').text()).toBe('你好 Ada')
  })
})
