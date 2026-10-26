import { withInstall } from '../../utils/withInstall'
import Radio from './Radio.vue'
import RadioGroup from './RadioGroup.vue'

export const DanRadio = withInstall(Radio, undefined, 'DanRadio')
export const DanRadioGroup = withInstall(RadioGroup, undefined, 'DanRadioGroup')
export default DanRadio
export type DanRadioInstance = InstanceType<typeof Radio>
export type DanRadioGroupInstance = InstanceType<typeof RadioGroup>
