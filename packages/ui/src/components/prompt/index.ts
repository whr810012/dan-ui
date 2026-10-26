import { withInstall } from '../../utils/withInstall'
import Prompt from './Prompt.vue'

export const DanPrompt = withInstall(Prompt, undefined, 'DanPrompt')
export default DanPrompt
export type DanPromptInstance = InstanceType<typeof Prompt>
