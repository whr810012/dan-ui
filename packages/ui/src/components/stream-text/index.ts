import { withInstall } from '../../utils/withInstall'
import StreamText from './StreamText.vue'

export const DanStreamText = withInstall(StreamText, undefined, 'DanStreamText')
export default DanStreamText
export type DanStreamTextInstance = InstanceType<typeof StreamText>
