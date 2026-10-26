import { withInstallFunction } from '../../utils/withInstall'
import { DanMessage as messageMethod } from './method'

export const DanMessage = withInstallFunction(messageMethod, '$message')
export default DanMessage
export type { MessageOptions, MessageType, MessageHandler } from './types'
