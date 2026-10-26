import type { DanSize } from '../../hooks/useConfig'

export type ButtonType =
  | 'default'
  | 'primary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'

export type ButtonNativeType = 'button' | 'submit' | 'reset'

export type ButtonSize = DanSize
