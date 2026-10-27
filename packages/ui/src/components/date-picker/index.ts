import { withInstall } from '../../utils/withInstall'
import DatePicker from './DatePicker.vue'

export const DanDatePicker = withInstall(DatePicker, undefined, 'DanDatePicker')
export default DanDatePicker
export type DanDatePickerInstance = InstanceType<typeof DatePicker>
export {
  WEEK_LABELS,
  buildCalendarDays,
  formatDate,
  formatTime,
  isInRange,
  isSameDay,
  parseDate,
  parseTime,
} from './dateUtils'
export type { CalendarCell } from './dateUtils'
