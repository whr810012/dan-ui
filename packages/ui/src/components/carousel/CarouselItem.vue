<script setup lang="ts">
import { computed, inject, onBeforeUnmount, onMounted } from 'vue'
import { useNamespace } from '../../hooks/useNamespace'
import { carouselContextKey } from './carouselContext'
import './style.css'

defineOptions({ name: 'DanCarouselItem' })

const ns = useNamespace('carousel-item')
const carousel = inject(carouselContextKey)
const id = Symbol('carousel-item')

const index = computed(() => carousel?.items.value.indexOf(id) ?? -1)
const isActive = computed(() => carousel?.activeIndex.value === index.value)

let unregister: (() => void) | undefined

onMounted(() => {
  unregister = carousel?.registerItem(id)
})

onBeforeUnmount(() => {
  unregister?.()
})
</script>

<template>
  <div :class="[ns.b(), ns.is('active', isActive)]" :aria-hidden="!isActive">
    <slot />
  </div>
</template>
