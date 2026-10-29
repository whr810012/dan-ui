import { withInstall } from '../../utils/withInstall'
import ToolCallCard from './ToolCallCard.vue'

export const DanToolCallCard = withInstall(
  ToolCallCard,
  undefined,
  'DanToolCallCard',
)
export default DanToolCallCard
export type DanToolCallCardInstance = InstanceType<typeof ToolCallCard>
