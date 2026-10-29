export type AgentStepStatus = 'pending' | 'running' | 'done' | 'error' | 'skipped'

export interface AgentStepItem {
  id: string
  title: string
  description?: string
  status?: AgentStepStatus
}
