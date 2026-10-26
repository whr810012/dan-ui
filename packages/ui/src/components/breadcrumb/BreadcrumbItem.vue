<script setup lang="ts">
import { useNamespace } from '../../hooks/useNamespace'
import { injectBreadcrumb } from './breadcrumbContext'
import './style.css'

defineOptions({ name: 'DanBreadcrumbItem' })

withDefaults(
  defineProps<{
    to?: string
  }>(),
  {
    to: '',
  },
)

defineEmits<{
  click: [event: MouseEvent]
}>()

const ns = useNamespace('breadcrumb-item')
const breadcrumb = injectBreadcrumb()
</script>

<template>
  <li :class="ns.b()">
    <a
      v-if="to"
      :class="ns.e('inner')"
      :href="to"
      @click="$emit('click', $event)"
    >
      <slot />
    </a>
    <span v-else :class="ns.e('inner')">
      <slot />
    </span>
    <span :class="ns.e('separator')" aria-hidden="true">
      <slot name="separator">{{ breadcrumb?.separator.value ?? '/' }}</slot>
    </span>
  </li>
</template>
