import { withInstallFunction } from '../../utils/withInstall'
import { DanNotification as notificationMethod } from './method'

export const DanNotification = withInstallFunction(
  notificationMethod,
  '$notify',
)
export default DanNotification
export type {
  NotificationHandler,
  NotificationOptions,
  NotificationPosition,
  NotificationType,
} from './types'
