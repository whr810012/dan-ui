import { withInstall } from '../../utils/withInstall'
import Checkbox from './Checkbox.vue'
import CheckboxGroup from './CheckboxGroup.vue'

export const DanCheckbox = withInstall(Checkbox, undefined, 'DanCheckbox')
export const DanCheckboxGroup = withInstall(
  CheckboxGroup,
  undefined,
  'DanCheckboxGroup',
)
export default DanCheckbox
export type DanCheckboxInstance = InstanceType<typeof Checkbox>
export type DanCheckboxGroupInstance = InstanceType<typeof CheckboxGroup>
