import { withInstall } from '../../utils/withInstall'
import ModelSelect from './ModelSelect.vue'

export const DanModelSelect = withInstall(
  ModelSelect,
  undefined,
  'DanModelSelect',
)
export default DanModelSelect
export type DanModelSelectInstance = InstanceType<typeof ModelSelect>
