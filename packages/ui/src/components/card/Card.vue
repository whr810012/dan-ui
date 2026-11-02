<script setup lang="ts">
import { useNamespace } from '../../hooks/useNamespace'
import './style.css'

defineOptions({ name: 'DanCard' })

withDefaults(
  defineProps<{
    header?: string
    shadow?: 'always' | 'hover' | 'never'
    bodyStyle?: Record<string, string>
    bodyClass?: string | string[] | Record<string, boolean>
    bordered?: boolean
    size?: 'small' | 'default'
  }>(),
  {
    header: '',
    shadow: 'always',
    bodyStyle: () => ({}),
    bodyClass: undefined,
    bordered: true,
    size: 'default',
  },
)

const ns = useNamespace('card')
</script>

<template>
  <div
    :class="[
      ns.b(),
      ns.m(`shadow-${shadow}`),
      ns.m(size),
      ns.is('bordered', bordered),
    ]"
  >
    <div
      v-if="header || $slots.header || $slots.extra"
      :class="ns.e('header')"
    >
      <div :class="ns.e('header-main')">
        <slot name="header">{{ header }}</slot>
      </div>
      <div v-if="$slots.extra" :class="ns.e('extra')">
        <slot name="extra" />
      </div>
    </div>
    <div v-if="$slots.cover" :class="ns.e('cover')">
      <slot name="cover" />
    </div>
    <div :class="[ns.e('body'), bodyClass]" :style="bodyStyle">
      <slot />
    </div>
    <div v-if="$slots.footer" :class="ns.e('footer')">
      <slot name="footer" />
    </div>
  </div>
</template>
