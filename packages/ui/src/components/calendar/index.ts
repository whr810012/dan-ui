import { withInstall } from '../../utils/withInstall'
import Calendar from './Calendar.vue'

export const DanCalendar = withInstall(Calendar, undefined, 'DanCalendar')
export default DanCalendar
export type DanCalendarInstance = InstanceType<typeof Calendar>
