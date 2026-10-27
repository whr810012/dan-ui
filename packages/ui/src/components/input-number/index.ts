import { withInstall } from '../../utils/withInstall'
import InputNumber from './InputNumber.vue'

export const DanInputNumber = withInstall(
  InputNumber,
  undefined,
  'DanInputNumber',
)
export default DanInputNumber
export type DanInputNumberInstance = InstanceType<typeof InputNumber>
