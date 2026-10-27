<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useNamespace } from '../../hooks/useNamespace'
import './style.css'

defineOptions({ name: 'DanBackTop' })

const props = withDefaults(
  defineProps<{
    visibilityHeight?: number
    right?: number
    bottom?: number
    target?: string | HTMLElement | null
  }>(),
  {
    visibilityHeight: 200,
    right: 40,
    bottom: 40,
    target: null,
  },
)

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const ns = useNamespace('back-top')
const visible = ref(false)
const mounted = ref(false)
let scrollEl: Window | HTMLElement | null = null

function resolveTarget(): Window | HTMLElement | null {
  if (typeof window === 'undefined') return null
  if (!props.target) return window
  if (typeof props.target === 'string') {
    return (document.querySelector(props.target) as HTMLElement) || window
  }
  return props.target
}

function getScrollTop() {
  if (!scrollEl || typeof window === 'undefined') return 0
  if (scrollEl === window) {
    return window.scrollY || document.documentElement.scrollTop || 0
  }
  return (scrollEl as HTMLElement).scrollTop
}

function onScroll() {
  visible.value = getScrollTop() >= props.visibilityHeight
}

function scrollToTop(event: MouseEvent) {
  emit('click', event)
  if (!scrollEl || typeof window === 'undefined') return
  if (scrollEl === window) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  } else {
    ;(scrollEl as HTMLElement).scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const style = computed(() => ({
  right: `${props.right}px`,
  bottom: `${props.bottom}px`,
}))

onMounted(() => {
  mounted.value = true
  scrollEl = resolveTarget()
  scrollEl?.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})

onBeforeUnmount(() => {
  scrollEl?.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <Teleport v-if="mounted" to="body">
    <transition name="dan-fade">
      <button
        v-show="visible"
        type="button"
        :class="ns.b()"
        :style="style"
        aria-label="回到顶部"
        @click="scrollToTop"
      >
        <slot>↑</slot>
      </button>
    </transition>
  </Teleport>
</template>
