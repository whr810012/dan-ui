<script setup lang="ts">
import { computed, toRef } from 'vue'
import { provideConfig, type DanSize } from '../../hooks/useConfig'
import { useNamespace } from '../../hooks/useNamespace'
import zhCN from '../../locale/zh-CN'
import type { LocaleMessages } from '../../locale/types'
import './style.css'

defineOptions({ name: 'DanConfigProvider' })

const props = withDefaults(
  defineProps<{
    size?: DanSize
    zIndex?: number
    namespace?: string
    /** 轻量文案包；不引入 vue-i18n */
    locale?: LocaleMessages
    /** CSS 变量覆盖，key 可为 `color-primary` 或完整 `--dan-color-primary` */
    theme?: Record<string, string>
  }>(),
  {
    size: 'default',
    zIndex: 2000,
    namespace: 'dan',
    locale: () => zhCN,
    theme: () => ({}),
  },
)

const ns = useNamespace('config-provider')

provideConfig({
  size: toRef(props, 'size'),
  zIndex: toRef(props, 'zIndex'),
  namespace: toRef(props, 'namespace'),
  locale: toRef(props, 'locale'),
})

const themeStyle = computed(() => {
  const style: Record<string, string> = {}
  for (const [key, value] of Object.entries(props.theme)) {
    if (!key || value == null) continue
    const varName = key.startsWith('--') ? key : `--${props.namespace}-${key}`
    style[varName] = value
  }
  return style
})
</script>

<template>
  <div :class="ns.b()" :style="themeStyle">
    <slot />
  </div>
</template>
