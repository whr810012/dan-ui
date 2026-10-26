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

export const LoadingIcon: IconSvg = () =>
  h('svg', svgProps, [
    h('path', {
      d: 'M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83',
    }),
  ])

export const CloseIcon: IconSvg = () =>
  h('svg', svgProps, [
    h('path', { d: 'M18 6 6 18' }),
    h('path', { d: 'm6 6 12 12' }),
  ])

export const CheckIcon: IconSvg = () =>
  h('svg', svgProps, [h('path', { d: 'm5 12 5 5L20 7' })])

export const PlusIcon: IconSvg = () =>
  h('svg', svgProps, [
    h('path', { d: 'M12 5v14' }),
    h('path', { d: 'M5 12h14' }),
  ])

export const iconMap = {
  loading: LoadingIcon,
  close: CloseIcon,
  check: CheckIcon,
  plus: PlusIcon,
} as const

export type IconName = keyof typeof iconMap
