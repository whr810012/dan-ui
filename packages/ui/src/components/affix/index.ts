import { withInstall } from '../../utils/withInstall'
import Affix from './Affix.vue'

export const DanAffix = withInstall(Affix, undefined, 'DanAffix')
export default DanAffix
export type DanAffixInstance = InstanceType<typeof Affix>
