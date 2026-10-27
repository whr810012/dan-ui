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
  >
    <slot />
  </ul>
</template>
