import { withInstall } from '../../utils/withInstall'
import Mentions from './Mentions.vue'

export const DanMentions = withInstall(Mentions, undefined, 'DanMentions')
export default DanMentions
export type DanMentionsInstance = InstanceType<typeof Mentions>
export type { MentionOption } from './types'
