import { withInstall } from '../../utils/withInstall'
import DatePicker from './DatePicker.vue'

export const DanDatePicker = withInstall(DatePicker, undefined, 'DanDatePicker')
export default DanDatePicker
export type DanDatePickerInstance = InstanceType<typeof DatePicker>
export type { DatePickerShortcut } from './DatePicker.vue'
export {
  WEEK_LABELS,
  buildCalendarDays,
  formatDate,
  formatDateTime,
  formatTime,
  isInRange,
  isSameDay,
  parseDate,
  parseDateLike,
  parseDateTime,
  parseTime,
} from './dateUtils'
export type { CalendarCell } from './dateUtils'
