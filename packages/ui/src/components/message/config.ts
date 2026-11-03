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
let ownerId: symbol | null = null
const stack: Array<{ id: symbol; config: MessageGlobalConfig }> = []

function cloneConfig(
  config?: Partial<MessageGlobalConfig> | null,
): MessageGlobalConfig {
  return {
    duration: config?.duration ?? defaults.duration,
    max: config?.max ?? defaults.max,
    offset: config?.offset ?? defaults.offset,
  }
}

export function getMessageConfig(): MessageGlobalConfig {
  return current
}

/** 测试或手动覆盖；会清空嵌套栈 */
export function setMessageConfig(
  config: Partial<MessageGlobalConfig> | undefined | null,
) {
  current = cloneConfig(config)
  ownerId = null
  stack.length = 0
}

export function pushMessageConfig(
  id: symbol,
  config: Partial<MessageGlobalConfig> | undefined | null,
) {
  if (ownerId === id) {
    current = cloneConfig(config)
    return
  }
  if (ownerId) {
    stack.push({ id: ownerId, config: { ...current } })
  }
  current = cloneConfig(config)
  ownerId = id
}

export function popMessageConfig(id: symbol) {
  if (ownerId !== id) {
    const index = stack.findIndex((item) => item.id === id)
    if (index >= 0) stack.splice(index, 1)
    return
  }
  const previous = stack.pop()
  if (previous) {
    current = previous.config
    ownerId = previous.id
  } else {
    current = { ...defaults }
    ownerId = null
  }
}
