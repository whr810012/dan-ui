import { withInstall } from '../../utils/withInstall'
import Step from './Step.vue'
import Steps from './Steps.vue'

export const DanSteps = withInstall(Steps, { DanStep: Step }, 'DanSteps')
export const DanStep = withInstall(Step, undefined, 'DanStep')

export default DanSteps
export type DanStepsInstance = InstanceType<typeof Steps>
export type DanStepInstance = InstanceType<typeof Step>
export type { StepStatus } from './stepsContext'
