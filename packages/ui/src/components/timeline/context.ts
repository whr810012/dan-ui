import type { InjectionKey, Ref } from 'vue'

export type TimelineMode = 'left' | 'right' | 'alternate'

export interface TimelineContext {
  mode: Ref<TimelineMode>
}

export const timelineContextKey: InjectionKey<TimelineContext> =
  Symbol('danTimeline')
