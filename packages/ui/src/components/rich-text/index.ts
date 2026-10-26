import { withInstall } from '../../utils/withInstall'
import RichText from './RichText.vue'
import EditorToolbar from './EditorToolbar.vue'
import EditorBubbleMenu from './EditorBubbleMenu.vue'

export const DanRichText = withInstall(RichText, undefined, 'DanRichText')
export const DanEditorToolbar = withInstall(
  EditorToolbar,
  undefined,
  'DanEditorToolbar',
)
export const DanEditorBubbleMenu = withInstall(
  EditorBubbleMenu,
  undefined,
  'DanEditorBubbleMenu',
)

export default DanRichText
export type DanRichTextInstance = InstanceType<typeof RichText>
export type DanEditorToolbarInstance = InstanceType<typeof EditorToolbar>
export type DanEditorBubbleMenuInstance = InstanceType<typeof EditorBubbleMenu>
export type { RichTextOutput } from './types'
