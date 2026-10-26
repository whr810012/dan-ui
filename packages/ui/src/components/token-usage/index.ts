import { withInstall } from '../../utils/withInstall'
import TokenUsage from './TokenUsage.vue'

export const DanTokenUsage = withInstall(TokenUsage, undefined, 'DanTokenUsage')
export default DanTokenUsage
export type DanTokenUsageInstance = InstanceType<typeof TokenUsage>
