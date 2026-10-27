<script setup lang="ts">
import { computed, ref, toRef, watch } from 'vue'
import { useNamespace } from '../../hooks/useNamespace'
import { provideMenu } from './menuContext'
import './style.css'

defineOptions({ name: 'DanMenu' })

const props = withDefaults(
  defineProps<{
    mode?: 'vertical' | 'horizontal'
    modelValue?: string
    defaultOpeneds?: string[]
    collapse?: boolean
  }>(),
  {
    mode: 'vertical',
    modelValue: '',
    defaultOpeneds: () => [],
    collapse: false,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
  select: [index: string]
  open: [index: string]
  close: [index: string]
}>()

const ns = useNamespace('menu')
const openedMenus = ref<string[]>([...props.defaultOpeneds])

watch(
  () => props.defaultOpeneds,
  (value) => {
    openedMenus.value = [...value]
  },
)

function select(index: string) {
  emit('update:modelValue', index)
  emit('select', index)
}

function toggleOpen(index: string) {
  const set = new Set(openedMenus.value)
  if (set.has(index)) {
    set.delete(index)
    emit('close', index)
  } else {
    set.add(index)
    emit('open', index)
  }
  openedMenus.value = [...set]
}

provideMenu({
  mode: computed(() => props.mode),
  active: computed(() => props.modelValue),
  select,
  openedMenus,
  toggleOpen,
  collapse: toRef(props, 'collapse'),
})

function focusableItems(root: HTMLElement) {
  return Array.from(
    root.querySelectorAll<HTMLElement>(
      '[role="menuitem"]:not([aria-disabled="true"])',
    ),
  )
}

function onKeydown(event: KeyboardEvent) {
  const root = event.currentTarget as HTMLElement
  const items = focusableItems(root)
  if (!items.length) return

  const vertical = props.mode === 'vertical'
  const nextKey = vertical ? 'ArrowDown' : 'ArrowRight'
  const prevKey = vertical ? 'ArrowUp' : 'ArrowLeft'
  const index = items.indexOf(document.activeElement as HTMLElement)

  if (event.key === nextKey) {
    event.preventDefault()
    const next = items[(index + 1 + items.length) % items.length]
    next?.focus()
  } else if (event.key === prevKey) {
    event.preventDefault()
    const prev = items[(index - 1 + items.length) % items.length]
    prev?.focus()
  } else if (event.key === 'Home') {
    event.preventDefault()
    items[0]?.focus()
  } else if (event.key === 'End') {
    event.preventDefault()
    items[items.length - 1]?.focus()
  }
}
</script>

<template>
  <ul
    :class="[
      ns.b(),
      ns.m(mode),
      ns.is('collapse', collapse && mode === 'vertical'),
    ]"
    role="menu"
    :aria-orientation="mode"
    @keydown="onKeydown"
  >
    <slot />
  </ul>
</template>
