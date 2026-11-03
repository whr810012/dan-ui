import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import { DanConfigProvider } from '../../components/config-provider'
import { DanDialog } from '../../components/dialog'
import { DanDatePicker } from '../../components/date-picker'
import { DanTable } from '../../components/table'
import en from '../en'

describe('locale via ConfigProvider', () => {
  it('renders Dialog / Table / DatePicker English copy', async () => {
    const wrapper = mount(
      {
        components: {
          DanConfigProvider,
          DanDialog,
          DanTable,
          DanDatePicker,
        },
        setup() {
          return { en }
        },
        template: `
          <DanConfigProvider :locale="en">
            <DanDialog :model-value="true" title="Hello">
              body
            </DanDialog>
            <DanTable :columns="[{ prop: 'name', label: 'Name' }]" :data="[]" />
            <DanDatePicker />
          </DanConfigProvider>
        `,
      },
      { attachTo: document.body },
    )
    await nextTick()

    expect(document.body.textContent).toContain('OK')
    expect(document.body.textContent).toContain('Cancel')
    expect(document.body.textContent).toContain('No data')
    expect(document.body.textContent).toContain('Pick a date')

    wrapper.unmount()
  })
})
