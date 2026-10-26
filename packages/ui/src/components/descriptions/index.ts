import { withInstall } from '../../utils/withInstall'
import Descriptions from './Descriptions.vue'
import DescriptionsItem from './DescriptionsItem.vue'

export const DanDescriptionsItem = withInstall(
  DescriptionsItem,
  undefined,
  'DanDescriptionsItem',
)
export const DanDescriptions = withInstall(
  Descriptions,
  { DanDescriptionsItem },
  'DanDescriptions',
)

export default DanDescriptions
export type DanDescriptionsInstance = InstanceType<typeof Descriptions>
export type DanDescriptionsItemInstance = InstanceType<typeof DescriptionsItem>
