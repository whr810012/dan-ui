import { withInstall } from '../../utils/withInstall'
import Dialog from './Dialog.vue'

export const DanDialog = withInstall(Dialog, undefined, 'DanDialog')
export default DanDialog
export type DanDialogInstance = InstanceType<typeof Dialog>
