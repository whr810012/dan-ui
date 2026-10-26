import { withInstall } from '../../utils/withInstall'
import Markdown from './Markdown.vue'

export const DanMarkdown = withInstall(Markdown, undefined, 'DanMarkdown')
export default DanMarkdown
export type DanMarkdownInstance = InstanceType<typeof Markdown>
