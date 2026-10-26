import { withInstallFunction } from '../../utils/withInstall'
import { DanMessageBox as messageBoxMethod } from './method'

export const DanMessageBox = withInstallFunction(
  messageBoxMethod,
  '$messageBox',
)
export default DanMessageBox
export type {
  MessageBoxAction,
  MessageBoxOptions,
  MessageBoxType,
} from './types'
