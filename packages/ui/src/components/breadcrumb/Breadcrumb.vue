<script setup lang="ts">
import { provide, toRef } from 'vue'
import { useNamespace } from '../../hooks/useNamespace'
import { breadcrumbContextKey } from './breadcrumbContext'
import './style.css'

defineOptions({ name: 'DanBreadcrumb' })

const props = withDefaults(
  defineProps<{
    separator?: string
  }>(),
  {
    separator: '/',
  },
)

const ns = useNamespace('breadcrumb')

provide(breadcrumbContextKey, {
  separator: toRef(props, 'separator'),
})
</script>

<template>
  <nav :class="ns.b()" aria-label="Breadcrumb">
    <ol :class="ns.e('list')">
      <slot />
    </ol>
  </nav>
</template>
