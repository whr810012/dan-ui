export interface MessageGlobalConfig {
  /** 默认展示时长 ms；`0` 不自动关闭 */
  duration: number
  /** 同时存在的最大条数；超出时关闭最早的 */
  max: number
  /** 距顶部偏移 */
  offset: number
}

const defaults: MessageGlobalConfig = {
  duration: 3000,
  max: Number.POSITIVE_INFINITY,
  offset: 20,
}

let current: MessageGlobalConfig = { ...defaults }

export function getMessageConfig(): MessageGlobalConfig {
  return current
}

export function setMessageConfig(
  config: Partial<MessageGlobalConfig> | undefined | null,
) {
  current = {
    duration: config?.duration ?? defaults.duration,
    max: config?.max ?? defaults.max,
    offset: config?.offset ?? defaults.offset,
  }
}
