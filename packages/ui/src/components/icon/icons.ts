import { h, type FunctionalComponent } from 'vue'

type IconSvg = FunctionalComponent

const svgProps = {
  xmlns: 'http://www.w3.org/2000/svg',
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  'stroke-width': 2,
  'stroke-linecap': 'round' as const,
  'stroke-linejoin': 'round' as const,
  'aria-hidden': true,
}

function icon(paths: string[]): IconSvg {
  return () => h('svg', svgProps, paths.map((d) => h('path', { d })))
}

export const LoadingIcon = icon([
  'M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83',
])
export const CloseIcon = icon(['M18 6 6 18', 'm6 6 12 12'])
export const CheckIcon = icon(['m5 12 5 5L20 7'])
export const PlusIcon = icon(['M12 5v14', 'M5 12h14'])
export const MinusIcon = icon(['M5 12h14'])
export const SearchIcon = icon(['m21 21-4.3-4.3', 'M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z'])
export const EditIcon = icon([
  'M12 20h9',
  'M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z',
])
export const DeleteIcon = icon([
  'M3 6h18',
  'M8 6V4h8v2',
  'M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6',
  'M10 11v6',
  'M14 11v6',
])
export const DownloadIcon = icon([
  'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4',
  'm7 10 5 5 5-5',
  'M12 15V3',
])
export const UploadIcon = icon([
  'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4',
  'm17 8-5-5-5 5',
  'M12 3v12',
])
export const ArrowLeftIcon = icon(['M19 12H5', 'm12 19-7-7 7-7'])
export const ArrowRightIcon = icon(['M5 12h14', 'm12 5 7 7-7 7'])
export const ArrowUpIcon = icon(['M12 19V5', 'm5 12 7-7 7 7'])
export const ArrowDownIcon = icon(['M12 5v14', 'm19 12-7 7-7-7'])
export const ChevronLeftIcon = icon(['m15 18-6-6 6-6'])
export const ChevronRightIcon = icon(['m9 18 6-6-6-6'])
export const ChevronUpIcon = icon(['m18 15-6-6-6 6'])
export const ChevronDownIcon = icon(['m6 9 6 6 6-6'])
export const InfoIcon = icon([
  'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z',
  'M12 16v-4',
  'M12 8h.01',
])
export const WarningIcon = icon([
  'm10.3 3.9-8.1 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.8-3.1l-8.1-14a2 2 0 0 0-3.4 0Z',
  'M12 9v4',
  'M12 17h.01',
])
export const SuccessIcon = icon([
  'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z',
  'm9 12 2 2 4-4',
])
export const ErrorIcon = icon([
  'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z',
  'm15 9-6 6',
  'm9 9 6 6',
])
export const UserIcon = icon([
  'M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2',
  'M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
])
export const SettingIcon = icon([
  'M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z',
  'M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9c.3.6.9 1 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z',
])
export const HomeIcon = icon([
  'm3 9 9-7 9 7',
  'M9 22V12h6v10',
])
export const MenuIcon = icon(['M4 6h16', 'M4 12h16', 'M4 18h16'])
export const MoreIcon = icon([
  'M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2z',
  'M19 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2z',
  'M5 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2z',
])
export const CopyIcon = icon([
  'M8 8h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2z',
  'M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2',
])
export const LinkIcon = icon([
  'M10 13a5 5 0 0 0 7.5.5l2-2a5 5 0 0 0-7.1-7.1l-1.2 1.2',
  'M14 11a5 5 0 0 0-7.5-.5l-2 2a5 5 0 0 0 7.1 7.1l1.2-1.2',
])
export const EyeIcon = icon([
  'M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z',
  'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z',
])
export const EyeOffIcon = icon([
  'M10.7 5.1A10.7 10.7 0 0 1 12 5c6.5 0 10 7 10 7a17.4 17.4 0 0 1-3.2 4.1',
  'M6.6 6.6C3.9 8.3 2 12 2 12s3.5 7 10 7a9.8 9.8 0 0 0 4.4-1',
  'M14 14.1A3 3 0 0 1 9.9 10',
  'm2 2 20 20',
])
export const StarIcon = icon([
  'm12 3 2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 18.8l-5.8 3.1 1.1-6.5L2.6 9.8l6.5-.9L12 3z',
])
export const HeartIcon = icon([
  'M20.8 5.6a5.1 5.1 0 0 0-7.2 0L12 7.2l-1.6-1.6a5.1 5.1 0 0 0-7.2 7.2l1.6 1.6L12 21.3l6.4-6.9 1.6-1.6a5.1 5.1 0 0 0 0-7.2z',
])
export const CalendarIcon = icon([
  'M8 2v4',
  'M16 2v4',
  'M3 10h18',
  'M5 6h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z',
])
export const MailIcon = icon([
  'M4 6h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z',
  'm22 8-10 7L2 8',
])
export const RefreshIcon = icon([
  'M21 12a9 9 0 1 1-2.6-6.4',
  'M21 3v6h-6',
])
export const FilterIcon = icon(['M22 3H2l8 9.5V19l4 2v-8.5L22 3z'])
export const SendIcon = icon(['m22 2-7 20-4-9-9-4Z', 'M22 2 11 13'])
export const StopIcon = icon([
  'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z',
  'M9 9h6v6H9z',
])
export const AttachIcon = icon([
  'm21.4 11.6-8.8 8.8a5 5 0 0 1-7.1-7.1l8.8-8.8a3.3 3.3 0 0 1 4.7 4.7l-8.8 8.8a1.7 1.7 0 1 1-2.3-2.3l7.8-7.8',
])

export const iconMap = {
  loading: LoadingIcon,
  close: CloseIcon,
  check: CheckIcon,
  plus: PlusIcon,
  minus: MinusIcon,
  search: SearchIcon,
  edit: EditIcon,
  delete: DeleteIcon,
  download: DownloadIcon,
  upload: UploadIcon,
  'arrow-left': ArrowLeftIcon,
  'arrow-right': ArrowRightIcon,
  'arrow-up': ArrowUpIcon,
  'arrow-down': ArrowDownIcon,
  'chevron-left': ChevronLeftIcon,
  'chevron-right': ChevronRightIcon,
  'chevron-up': ChevronUpIcon,
  'chevron-down': ChevronDownIcon,
  info: InfoIcon,
  warning: WarningIcon,
  success: SuccessIcon,
  error: ErrorIcon,
  user: UserIcon,
  setting: SettingIcon,
  home: HomeIcon,
  menu: MenuIcon,
  more: MoreIcon,
  copy: CopyIcon,
  link: LinkIcon,
  eye: EyeIcon,
  'eye-off': EyeOffIcon,
  star: StarIcon,
  heart: HeartIcon,
  calendar: CalendarIcon,
  mail: MailIcon,
  refresh: RefreshIcon,
  filter: FilterIcon,
  send: SendIcon,
  stop: StopIcon,
  attach: AttachIcon,
} as const

export type IconName = keyof typeof iconMap

export const iconNames = Object.keys(iconMap) as IconName[]
