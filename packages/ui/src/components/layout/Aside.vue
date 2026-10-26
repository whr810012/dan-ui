<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted } from 'vue'
import { useNamespace } from '../../hooks/useNamespace'
import { injectLayout } from './layoutContext'
import './style.css'

defineOptions({ name: 'DanAside' })

const props = withDefaults(
  defineProps<{
    width?: string
    collapsed?: boolean
    collapsedWidth?: string
  }>(),
  {
    width: '220px',
    collapsed: false,
    collapsedWidth: '64px',
  },
)

const emit = defineEmits<{
  'update:collapsed': [value: boolean]
}>()

const ns = useNamespace('aside')
const layout = injectLayout({
  hasAside: computed(() => true),
  registerAside: () => undefined,
  unregisterAside: () => undefined,
})

onMounted(() => {
  layout.registerAside()
})

onBeforeUnmount(() => {
  layout.unregisterAside()
})

const resolvedWidth = computed(() =>
  props.collapsed ? props.collapsedWidth : props.width,
)

const style = computed(() => ({
  width: resolvedWidth.value,
  flexBasis: resolvedWidth.value,
  maxWidth: resolvedWidth.value,
  minWidth: resolvedWidth.value,
}))

function toggleCollapse() {
  emit('update:collapsed', !props.collapsed)
}

defineExpose({ toggleCollapse })
</script>

<template>
  <aside :class="[ns.b(), ns.is('collapsed', collapsed)]" :style="style">
    <slot />
  </aside>
</template>
