import { withInstall } from '../../utils/withInstall'
import CodeBlock from './CodeBlock.vue'

export const DanCodeBlock = withInstall(CodeBlock, undefined, 'DanCodeBlock')
export default DanCodeBlock
export type DanCodeBlockInstance = InstanceType<typeof CodeBlock>
