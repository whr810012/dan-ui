import { withInstall } from '../../utils/withInstall'
import Tour from './Tour.vue'

export const DanTour = withInstall(Tour, undefined, 'DanTour')
export default DanTour
export type DanTourInstance = InstanceType<typeof Tour>
export type { TourStep } from './Tour.vue'
