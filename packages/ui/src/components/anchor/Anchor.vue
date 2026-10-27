<script setup lang="ts">
import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  provide,
  ref,
  watch,
} from 'vue'
import { useNamespace } from '../../hooks/useNamespace'
import { anchorContextKey, type AnchorLinkItem } from './anchorContext'
import './style.css'

defineOptions({ name: 'DanAnchor' })

const props = withDefaults(
  defineProps<{
    offset?: number
    bound?: number
    type?: 'default' | 'underline'
    direction?: 'vertical' | 'horizontal'
  }>(),
  {
    offset: 0,
    bound: 15,
    type: 'default',
    direction: 'vertical',
  },
)

const emit = defineEmits<{
  change: [href: string]
  click: [event: MouseEvent, href: string]
}>()

const ns = useNamespace('anchor')
const current = ref('')
const links = ref<AnchorLinkItem[]>([])

function register(link: AnchorLinkItem) {
  if (!links.value.some((item) => item.href === link.href)) {
    links.value = [...links.value, link]
  }
}

function unregister(href: string) {
  links.value = links.value.filter((item) => item.href !== href)
}

function getScrollTop() {
  return window.scrollY || document.documentElement.scrollTop || 0
}

function updateActive() {
  const scrollTop = getScrollTop() + props.offset + props.bound
  let active = ''
  for (const link of links.value) {
    const id = link.href.startsWith('#') ? link.href.slice(1) : link.href
    const el = document.getElementById(id)
    if (!el) continue
    const top = el.getBoundingClientRect().top + window.scrollY
    if (top <= scrollTop) {
      active = link.href
    }
  }
  if (active && active !== current.value) {
    current.value = active
    emit('change', active)
  }
}

function scrollTo(href: string, event?: MouseEvent) {
  if (event) emit('click', event, href)
  const id = href.startsWith('#') ? href.slice(1) : href
  const el = document.getElementById(id)
  if (!el) return
  const top = el.getBoundingClientRect().top + window.scrollY - props.offset
  window.scrollTo({ top, behavior: 'smooth' })
  current.value = href
  emit('change', href)
}

provide(anchorContextKey, {
  current: computed(() => current.value),
  register,
  unregister,
  scrollTo,
})

onMounted(async () => {
  await nextTick()
  window.addEventListener('scroll', updateActive, { passive: true })
  updateActive()
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', updateActive)
})

watch(
  () => links.value.length,
  () => updateActive(),
)
</script>

<template>
  <div
    :class="[ns.b(), ns.m(type), ns.m(direction)]"
    role="navigation"
    aria-label="Anchor"
  >
    <div :class="ns.e('marker')" aria-hidden="true" />
    <div :class="ns.e('list')">
      <slot />
    </div>
  </div>
</template>
