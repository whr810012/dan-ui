export type MessageBoxType = 'alert' | 'confirm'

export interface MessageBoxOptions {
  title?: string
  message?: string
  type?: 'info' | 'success' | 'warning' | 'error'
  confirmText?: string
  cancelText?: string
  showCancel?: boolean
  showConfirm?: boolean
  closeOnClickModal?: boolean
  closeOnPressEscape?: boolean
}

export type MessageBoxAction = 'confirm' | 'cancel' | 'close'
