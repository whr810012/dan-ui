<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useNamespace } from '../../hooks/useNamespace'
import './style.css'

defineOptions({ name: 'DanAffix' })

const props = withDefaults(
  defineProps<{
    offset?: number
    position?: 'top' | 'bottom'
    zIndex?: number
    target?: string | HTMLElement | null
    /** 禁用固钉，始终保持文档流位置 */
    disabled?: boolean
  }>(),
  {
    offset: 0,
    position: 'top',
    zIndex: 100,
    target: null,
    disabled: false,
  },
)

const emit = defineEmits<{
  change: [fixed: boolean]
  scroll: [payload: { scrollTop: number; fixed: boolean }]
}>()

const ns = useNamespace('affix')
const rootRef = ref<HTMLElement | null>(null)
const contentRef = ref<HTMLElement | null>(null)
const fixed = ref(false)
const scrollContainer = ref<Window | HTMLElement | null>(null)
const size = ref({ width: 0, height: 0 })
const fixedStyle = ref<Record<string, string>>({})

const rootStyle = computed(() =>
  fixed.value
    ? {
        width: `${size.value.width}px`,
        height: `${size.value.height}px`,
      }
    : undefined,
)

function resolveTarget(): Window | HTMLElement {
  if (typeof window === 'undefined') return null as unknown as Window
  if (!props.target) return window
  if (typeof props.target === 'string') {
    return (document.querySelector(props.target) as HTMLElement) || window
  }
  return props.target
}

function getScrollTop(el: Window | HTMLElement) {
  if (typeof window === 'undefined') return 0
  if (el === window) {
    return window.scrollY || document.documentElement.scrollTop || 0
  }
  return (el as HTMLElement).scrollTop
}

function update() {
  if (typeof window === 'undefined') return
  const root = rootRef.value
  const content = contentRef.value
  const container = scrollContainer.value
  if (!root || !content || !container) return

  if (props.disabled) {
    if (fixed.value) {
      fixed.value = false
      emit('change', false)
    }
    fixedStyle.value = {}
    emit('scroll', { scrollTop: getScrollTop(container), fixed: false })
    return
  }

  const measureEl = fixed.value ? root : content
  const rect = measureEl.getBoundingClientRect()
  if (!fixed.value) {
    size.value = { width: rect.width, height: rect.height }
  }

  const scrollTop = getScrollTop(container)
  const style: Record<string, string> = {
    zIndex: String(props.zIndex || 100),
  }

  let nextFixed: boolean
  if (props.position === 'top') {
    nextFixed = rect.top <= props.offset
    if (nextFixed) {
      style.position = 'fixed'
      style.top = `${props.offset}px`
      style.width = `${size.value.width}px`
    }
  } else {
    const viewportBottom =
      container === window
        ? window.innerHeight
        : (container as HTMLElement).getBoundingClientRect().bottom
    nextFixed = viewportBottom - rect.bottom <= props.offset
    if (nextFixed) {
      style.position = 'fixed'
      style.bottom = `${props.offset}px`
      style.width = `${size.value.width}px`
    }
  }

  if (nextFixed !== fixed.value) {
    fixed.value = nextFixed
    emit('change', nextFixed)
  }
  fixedStyle.value = nextFixed ? style : {}
  emit('scroll', { scrollTop, fixed: nextFixed })
}

function onScroll() {
  update()
}

function unbindScroll() {
  scrollContainer.value?.removeEventListener('scroll', onScroll)
}

function bindScroll(target: Window | HTMLElement | null) {
  unbindScroll()
  scrollContainer.value = target
  scrollContainer.value?.addEventListener('scroll', onScroll, {
    passive: true,
  })
}

onMounted(async () => {
  await nextTick()
  bindScroll(resolveTarget())
  window.addEventListener('resize', onScroll)
  update()
})

onBeforeUnmount(() => {
  unbindScroll()
  if (typeof window !== 'undefined') {
    window.removeEventListener('resize', onScroll)
  }
})

watch(
  () => props.target,
  async () => {
    if (typeof window === 'undefined') return
    bindScroll(resolveTarget())
    await nextTick()
    update()
  },
)

watch(
  () => [props.offset, props.position, props.zIndex, props.disabled],
  async () => {
    await nextTick()
    update()
  },
)

defineExpose({ update })
</script>

<template>
  <div
    ref="rootRef"
    :class="[ns.b(), ns.is('disabled', disabled)]"
    :style="rootStyle"
  >
    <div
      ref="contentRef"
      :class="[ns.e('content'), ns.is('fixed', fixed)]"
      :style="fixedStyle"
    >
      <slot />
    </div>
  </div>
</template>
