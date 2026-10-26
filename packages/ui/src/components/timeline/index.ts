import { withInstall } from '../../utils/withInstall'
import Timeline from './Timeline.vue'
import TimelineItem from './TimelineItem.vue'

export const DanTimelineItem = withInstall(
  TimelineItem,
  undefined,
  'DanTimelineItem',
)
export const DanTimeline = withInstall(
  Timeline,
  { DanTimelineItem },
  'DanTimeline',
)

export default DanTimeline
export type DanTimelineInstance = InstanceType<typeof Timeline>
export type DanTimelineItemInstance = InstanceType<typeof TimelineItem>
