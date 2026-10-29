import { withInstall } from '../../utils/withInstall'
import PromptTemplate from './PromptTemplate.vue'

export const DanPromptTemplate = withInstall(
  PromptTemplate,
  undefined,
  'DanPromptTemplate',
)
export default DanPromptTemplate
export type DanPromptTemplateInstance = InstanceType<typeof PromptTemplate>
export {
  extractPromptVariables,
  renderPromptTemplate,
} from './promptTemplateUtils'
