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
    /** 受控展开项；传入后与 v-model:openeds 同步 */
    openeds?: string[]
    collapse?: boolean
    /** 手风琴：同时只展开一个 SubMenu */
    uniqueOpened?: boolean
  }>(),
  {
    mode: 'vertical',
    modelValue: '',
    defaultOpeneds: () => [],
    openeds: undefined,
    collapse: false,
    uniqueOpened: false,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'update:openeds': [value: string[]]
  select: [index: string]
  open: [index: string]
  close: [index: string]
}>()

const ns = useNamespace('menu')
const openedMenus = ref<string[]>(
  props.openeds ? [...props.openeds] : [...props.defaultOpeneds],
)

watch(
  () => props.openeds,
  (value) => {
    if (value) openedMenus.value = [...value]
  },
)

watch(
  () => props.defaultOpeneds,
  (value) => {
    if (props.openeds !== undefined) return
    openedMenus.value = [...value]
  },
)

function setOpeneds(next: string[]) {
  openedMenus.value = next
  emit('update:openeds', next)
}

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
    if (props.uniqueOpened) {
      for (const open of [...set]) {
        if (open === index) continue
        set.delete(open)
        emit('close', open)
      }
    }
    set.add(index)
    emit('open', index)
  }
  setOpeneds([...set])
}

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

provideMenu({
  mode: computed(() => props.mode),
  active: computed(() => props.modelValue),
  select,
  openedMenus,
  toggleOpen,
  collapse: toRef(props, 'collapse'),
})
</script>

<template>
  <ul
    :class="[
      ns.b(),
      ns.m(mode),
      ns.is('collapse', collapse && mode === 'vertical'),
      ns.is('accordion', uniqueOpened),
    ]"
    role="menu"
    :aria-orientation="mode"
    @keydown="onKeydown"
  >
    <slot />
  </ul>
</template>
