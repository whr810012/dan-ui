<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, watch } from 'vue'
import { useNamespace } from '../../hooks/useNamespace'
import { injectAnchor } from './anchorContext'
import './style.css'

defineOptions({ name: 'DanAnchorLink' })

const props = withDefaults(
  defineProps<{
    href: string
    title?: string
  }>(),
  {
    title: '',
  },
)

const ns = useNamespace('anchor-link')
const anchor = injectAnchor()
const active = computed(() => anchor.current.value === props.href)

onMounted(() => {
  anchor.register({
    href: props.href,
    title: props.title || props.href,
  })
})

watch(
  () => [props.href, props.title] as const,
  () => {
    anchor.unregister(props.href)
    anchor.register({
      href: props.href,
      title: props.title || props.href,
    })
  },
)

onBeforeUnmount(() => {
  anchor.unregister(props.href)
})

function onClick(event: MouseEvent) {
  event.preventDefault()
  anchor.scrollTo(props.href, event)
}
</script>

<template>
  <a
    :class="[ns.b(), ns.is('active', active)]"
    :href="href"
    :title="title || undefined"
    @click="onClick"
  >
    <slot>{{ title || href }}</slot>
  </a>
</template>
