import { withInstall } from '../../utils/withInstall'
import Image from './Image.vue'

export const DanImage = withInstall(Image, undefined, 'DanImage')
export default DanImage
export type DanImageInstance = InstanceType<typeof Image>
