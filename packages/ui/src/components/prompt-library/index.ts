import { withInstall } from '../../utils/withInstall'
import PromptLibrary from './PromptLibrary.vue'

export const DanPromptLibrary = withInstall(
  PromptLibrary,
  undefined,
  'DanPromptLibrary',
)
export default DanPromptLibrary
export type DanPromptLibraryInstance = InstanceType<typeof PromptLibrary>
export type { PromptTemplate } from './PromptLibrary.vue'
