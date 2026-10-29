import { withInstall } from '../../utils/withInstall'
import AgentSteps from './AgentSteps.vue'

export const DanAgentSteps = withInstall(AgentSteps, undefined, 'DanAgentSteps')
export default DanAgentSteps
export type DanAgentStepsInstance = InstanceType<typeof AgentSteps>
export type { AgentStepItem, AgentStepStatus } from './types'
