import { createApp, h, ref } from 'vue'
import MessageBoxHost from './MessageBoxHost.vue'
import type { MessageBoxAction, MessageBoxOptions } from './types'

function open(
  boxType: 'alert' | 'confirm',
  message: string,
  title?: string,
  options: MessageBoxOptions = {},
): Promise<MessageBoxAction> {
  if (typeof document === 'undefined') {
    return Promise.reject(new Error('DanMessageBox requires document'))
  }

  return new Promise((resolve, reject) => {
    const container = document.createElement('div')
    document.body.appendChild(container)
    const visible = ref(true)

    const app = createApp({
      setup() {
        function onAction(action: MessageBoxAction) {
          visible.value = false
          app.unmount()
          container.remove()
          if (action === 'confirm') resolve(action)
          else reject(action)
        }

        return () =>
          visible.value
            ? h(MessageBoxHost, {
                visible: visible.value,
                boxType,
                message: options.message ?? message,
                title: options.title ?? title ?? '提示',
                type: options.type ?? 'info',
                confirmText: options.confirmText ?? '确定',
                cancelText: options.cancelText ?? '取消',
                showCancel: options.showCancel ?? boxType === 'confirm',
                showConfirm: options.showConfirm ?? true,
                closeOnClickModal: options.closeOnClickModal ?? false,
                closeOnPressEscape: options.closeOnPressEscape ?? true,
                onAction,
              })
            : null
      },
    })

    app.mount(container)
  })
}

function alert(message: string, title?: string, options?: MessageBoxOptions) {
  return open('alert', message, title, options)
}

function confirm(message: string, title?: string, options?: MessageBoxOptions) {
  return open('confirm', message, title, {
    ...options,
    showCancel: options?.showCancel ?? true,
  })
}

export const DanMessageBox = Object.assign(alert, {
  alert,
  confirm,
})
