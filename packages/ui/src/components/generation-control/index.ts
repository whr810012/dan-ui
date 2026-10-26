import { withInstall } from '../../utils/withInstall'
import GenerationControl from './GenerationControl.vue'

export const DanGenerationControl = withInstall(
  GenerationControl,
  undefined,
  'DanGenerationControl',
)
export default DanGenerationControl
export type DanGenerationControlInstance = InstanceType<
  typeof GenerationControl
>
