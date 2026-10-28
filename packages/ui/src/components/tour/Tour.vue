<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue'
import { useNamespace } from '../../hooks/useNamespace'
import { DanButton } from '../button'
import './style.css'

defineOptions({ name: 'DanTour' })

export interface TourStep {
  target?: string | HTMLElement
  title?: string
  description?: string
  placement?: 'top' | 'bottom' | 'left' | 'right'
}

const props = withDefaults(
  defineProps<{
    modelValue?: boolean
    current?: number
    steps?: TourStep[]
  }>(),
  {
    modelValue: false,
    current: 0,
    steps: () => [],
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'update:current': [value: number]
  finish: []
  close: []
  change: [current: number]
}>()

const ns = useNamespace('tour')
const highlightStyle = ref<Record<string, string>>({})
const panelStyle = ref<Record<string, string>>({})

const active = computed(() => props.steps[props.current])
const isLast = computed(() => props.current >= props.steps.length - 1)

function resolveTarget(step?: TourStep) {
  if (!step?.target) return null
  if (typeof step.target === 'string') {
    return document.querySelector(step.target) as HTMLElement | null
  }
  return step.target
}

async function updateLayout() {
  await nextTick()
  const el = resolveTarget(active.value)
  if (!el) {
    highlightStyle.value = {
      top: '20%',
      left: '30%',
      width: '40%',
      height: '120px',
    }
    panelStyle.value = { top: 'calc(20% + 140px)', left: '30%' }
    return
  }
  const rect = el.getBoundingClientRect()
  const pad = 6
  highlightStyle.value = {
    top: `${rect.top - pad}px`,
    left: `${rect.left - pad}px`,
    width: `${rect.width + pad * 2}px`,
    height: `${rect.height + pad * 2}px`,
  }
  const placement = active.value?.placement ?? 'bottom'
  let top = rect.bottom + 12
  let left = rect.left
  if (placement === 'top') top = rect.top - 12 - 140
  if (placement === 'left') {
    top = rect.top
    left = rect.left - 280
  }
  if (placement === 'right') {
    top = rect.top
    left = rect.right + 12
  }
  panelStyle.value = {
    top: `${Math.max(12, top)}px`,
    left: `${Math.max(12, Math.min(left, window.innerWidth - 300))}px`,
  }
}

function close() {
  emit('update:modelValue', false)
  emit('close')
}

function next() {
  if (isLast.value) {
    emit('finish')
    close()
    return
  }
  const value = props.current + 1
  emit('update:current', value)
  emit('change', value)
}

function prev() {
  if (props.current <= 0) return
  const value = props.current - 1
  emit('update:current', value)
  emit('change', value)
}

watch(
  () => [props.modelValue, props.current, props.steps] as const,
  ([open]) => {
    if (open) void updateLayout()
  },
  { immediate: true, deep: true },
)

function onResize() {
  if (props.modelValue) void updateLayout()
}

if (typeof window !== 'undefined') {
  window.addEventListener('resize', onResize)
  window.addEventListener('scroll', onResize, true)
}

onBeforeUnmount(() => {
  if (typeof window === 'undefined') return
  window.removeEventListener('resize', onResize)
  window.removeEventListener('scroll', onResize, true)
})
</script>

<template>
  <Teleport to="body">
    <div v-if="modelValue" :class="ns.b()">
      <div :class="ns.e('mask')" @click="close" />
      <div :class="ns.e('highlight')" :style="highlightStyle" />
      <div
        :class="ns.e('panel')"
        :style="panelStyle"
        role="dialog"
        aria-modal="true"
        @click.stop
      >
        <div :class="ns.e('title')">
          <slot name="title" :step="active" :current="current">
            {{ active?.title }}
          </slot>
        </div>
        <div :class="ns.e('desc')">
          <slot name="description" :step="active" :current="current">
            {{ active?.description }}
          </slot>
        </div>
        <div :class="ns.e('footer')">
          <span :class="ns.e('indicator')">
            {{ current + 1 }} / {{ steps.length }}
          </span>
          <div :class="ns.e('actions')">
            <DanButton size="small" text @click="close">跳过</DanButton>
            <DanButton
              v-if="current > 0"
              size="small"
              @click="prev"
            >
              上一步
            </DanButton>
            <DanButton size="small" type="primary" @click="next">
              {{ isLast ? '完成' : '下一步' }}
            </DanButton>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>
