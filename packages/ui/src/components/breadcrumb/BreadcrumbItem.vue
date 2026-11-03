<script setup lang="ts">
import {
  computed,
  defineComponent,
  getCurrentInstance,
  onBeforeUnmount,
} from 'vue'
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
const uid = getCurrentInstance()?.uid ?? Math.floor(Math.random() * 1e9)

breadcrumb?.register(uid)
onBeforeUnmount(() => {
  breadcrumb?.unregister(uid)
})

const visible = computed(() => breadcrumb?.isVisible(uid) ?? true)
const showEllipsis = computed(
  () => breadcrumb?.showEllipsisBefore(uid) ?? false,
)
const isLast = computed(() => breadcrumb?.isLastVisible(uid) ?? false)

const ParentSeparator = defineComponent({
  name: 'DanBreadcrumbParentSeparator',
  setup() {
    return () => {
      const slot = breadcrumb?.separatorSlot.value
      if (slot) return slot()
      return breadcrumb?.separator.value ?? '/'
    }
  },
})
</script>

<template>
  <li
    v-if="showEllipsis && visible"
    :class="[ns.b(), ns.m('ellipsis')]"
    aria-hidden="true"
  >
    <span :class="ns.e('ellipsis')">…</span>
    <span :class="ns.e('separator')">
      <ParentSeparator />
    </span>
  </li>
  <li v-if="visible" :class="[ns.b(), ns.is('last', isLast)]">
    <a
      v-if="to"
      :class="ns.e('inner')"
      :href="to"
      :aria-current="isLast ? 'page' : undefined"
      @click="$emit('click', $event)"
    >
      <slot />
    </a>
    <span
      v-else
      :class="ns.e('inner')"
      :aria-current="isLast ? 'page' : undefined"
    >
      <slot />
    </span>
    <span :class="ns.e('separator')" aria-hidden="true">
      <slot name="separator">
        <ParentSeparator />
      </slot>
    </span>
  </li>
</template>
