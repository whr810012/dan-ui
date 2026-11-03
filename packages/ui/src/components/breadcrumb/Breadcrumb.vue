<script setup lang="ts">
import { computed, ref, toRef, useSlots, type Slot } from 'vue'
import { useNamespace } from '../../hooks/useNamespace'
import { provideBreadcrumb } from './breadcrumbContext'
import './style.css'

defineOptions({ name: 'DanBreadcrumb' })

const props = withDefaults(
  defineProps<{
    separator?: string
    /** 超过时中间折叠为 …；至少保留首尾各 1 项 */
    maxItems?: number
  }>(),
  {
    separator: '/',
    maxItems: 0,
  },
)

const ns = useNamespace('breadcrumb')
const slots = useSlots()
const itemUids = ref<number[]>([])

function register(uid: number) {
  if (!itemUids.value.includes(uid)) {
    itemUids.value = [...itemUids.value, uid]
  }
}

function unregister(uid: number) {
  itemUids.value = itemUids.value.filter((id) => id !== uid)
}

const visibleIndexes = computed(() => {
  const total = itemUids.value.length
  const max = props.maxItems
  if (!max || max < 1 || total <= max) {
    return Array.from({ length: total }, (_, i) => i)
  }
  const keepTail = Math.max(1, max - 1)
  const indexes = [0]
  for (let i = total - keepTail; i < total; i += 1) {
    if (i > 0) indexes.push(i)
  }
  return indexes
})

function indexOf(uid: number) {
  return itemUids.value.indexOf(uid)
}

function isVisible(uid: number) {
  const index = indexOf(uid)
  if (index < 0) return true
  return visibleIndexes.value.includes(index)
}

function showEllipsisBefore(uid: number) {
  const total = itemUids.value.length
  const max = props.maxItems
  if (!max || max < 1 || total <= max) return false
  const index = indexOf(uid)
  return index === visibleIndexes.value[1]
}

const lastVisibleUid = computed(() => {
  const indexes = visibleIndexes.value
  if (!indexes.length) return null
  const lastIndex = indexes[indexes.length - 1]!
  return itemUids.value[lastIndex] ?? null
})

function isLastVisible(uid: number) {
  return lastVisibleUid.value === uid
}

provideBreadcrumb({
  separator: toRef(props, 'separator'),
  separatorSlot: computed(() => slots.separator as Slot | undefined),
  register,
  unregister,
  isVisible,
  showEllipsisBefore,
  isLastVisible,
})
</script>

<template>
  <nav :class="ns.b()" aria-label="Breadcrumb">
    <ol :class="ns.e('list')">
      <slot />
    </ol>
  </nav>
</template>
