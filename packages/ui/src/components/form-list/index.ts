import { withInstall } from '../../utils/withInstall'
import FormList from './FormList.vue'

export const DanFormList = withInstall(FormList, undefined, 'DanFormList')
export default DanFormList
export type DanFormListInstance = InstanceType<typeof FormList>
