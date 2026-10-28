import type { App, Plugin } from 'vue'
import FloatButton from './FloatButton.vue'
import FloatButtonGroup from './FloatButtonGroup.vue'
import { withInstall } from '../../utils/withInstall'

export const DanFloatButton = withInstall(
  FloatButton,
  undefined,
  'DanFloatButton',
)
export const DanFloatButtonGroup = withInstall(
  FloatButtonGroup,
  undefined,
  'DanFloatButtonGroup',
)

const plugin: Plugin = {
  install(app: App) {
    app.component('DanFloatButton', DanFloatButton)
    app.component('DanFloatButtonGroup', DanFloatButtonGroup)
  },
}

export default plugin
export type DanFloatButtonInstance = InstanceType<typeof FloatButton>
export type DanFloatButtonGroupInstance = InstanceType<typeof FloatButtonGroup>
