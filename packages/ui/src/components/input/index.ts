import { withInstall } from '../../utils/withInstall'
import Input from './Input.vue'

export const DanInput = withInstall(Input, undefined, 'DanInput')
export default DanInput
export type DanInputInstance = InstanceType<typeof Input>
