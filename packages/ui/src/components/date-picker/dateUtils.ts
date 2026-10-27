export function pad(value: number) {
  return String(value).padStart(2, '0')
}

export function formatDate(date: Date): string {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

export function parseDate(value?: string | null): Date | null {
  if (!value) return null
  const matched = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value.trim())
  if (!matched) return null
  const year = Number(matched[1])
  const month = Number(matched[2])
  const day = Number(matched[3])
  const date = new Date(year, month - 1, day)
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null
  }
  return date
}

export function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

export interface CalendarCell {
  date: Date
  label: number
  inCurrentMonth: boolean
  isToday: boolean
}

export function buildCalendarDays(view: Date): CalendarCell[] {
  const year = view.getFullYear()
  const month = view.getMonth()
  const first = new Date(year, month, 1)
  const startWeekday = first.getDay() // 0 Sun
  const start = new Date(year, month, 1 - startWeekday)
  const today = new Date()
  const cells: CalendarCell[] = []

  for (let i = 0; i < 42; i += 1) {
    const date = new Date(
      start.getFullYear(),
      start.getMonth(),
      start.getDate() + i,
    )
    cells.push({
      date,
      label: date.getDate(),
      inCurrentMonth: date.getMonth() === month,
      isToday: isSameDay(date, today),
    })
  }
  return cells
}

export const WEEK_LABELS = ['日', '一', '二', '三', '四', '五', '六']
