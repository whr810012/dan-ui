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
import { DanIcon } from '../icon'
import { carouselContextKey } from './carouselContext'
import './style.css'

defineOptions({ name: 'DanCarousel' })

const props = withDefaults(
  defineProps<{
    modelValue?: number
    height?: string
    autoplay?: boolean
    interval?: number
    loop?: boolean
    arrow?: 'always' | 'hover' | 'never'
    indicator?: boolean
  }>(),
  {
    modelValue: 0,
    height: '220px',
    autoplay: true,
    interval: 3000,
    loop: true,
    arrow: 'hover',
    indicator: true,
  },
)

const emit = defineEmits<{
  'update:modelValue': [index: number]
  change: [index: number]
}>()

const ns = useNamespace('carousel')
const items = ref<symbol[]>([])
const activeIndex = ref(props.modelValue)
const hover = ref(false)
let timer: number | null = null

const count = computed(() => items.value.length)

function registerItem(id: symbol) {
  items.value.push(id)
  return () => {
    items.value = items.value.filter((item) => item !== id)
  }
}

function setActive(index: number) {
  if (!count.value) return
  const target = props.loop
    ? ((index % count.value) + count.value) % count.value
    : Math.min(Math.max(index, 0), count.value - 1)
  if (target === activeIndex.value) return
  activeIndex.value = target
  emit('update:modelValue', target)
  emit('change', target)
}

function prev() {
  setActive(activeIndex.value - 1)
}

function nextSlide() {
  setActive(activeIndex.value + 1)
}

function clearTimer() {
  if (timer != null) {
    window.clearInterval(timer)
    timer = null
  }
}

function startTimer() {
  clearTimer()
  if (!props.autoplay || count.value <= 1) return
  timer = window.setInterval(() => {
    nextSlide()
  }, props.interval)
}

watch(
  () => props.modelValue,
  (value) => {
    if (value !== activeIndex.value) activeIndex.value = value
  },
)

watch([() => props.autoplay, () => props.interval, count], () => {
  startTimer()
})

onMounted(async () => {
  await nextTick()
  startTimer()
})

onBeforeUnmount(clearTimer)

provide(carouselContextKey, {
  activeIndex,
  items,
  registerItem,
})

function onMouseEnter() {
  hover.value = true
  clearTimer()
}

function onMouseLeave() {
  hover.value = false
  startTimer()
}

defineExpose({
  setActive,
  prev,
  next: nextSlide,
})
</script>

<template>
  <div
    :class="[ns.b(), ns.m(`arrow-${arrow}`), ns.is('hover', hover)]"
    :style="{ height }"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  >
    <div :class="ns.e('container')">
      <slot />
    </div>

    <button
      v-if="arrow !== 'never' && count > 1"
      type="button"
      :class="[ns.e('arrow'), ns.e('arrow-left')]"
      aria-label="上一张"
      @click="prev"
    >
      <DanIcon name="chevron-left" />
    </button>
    <button
      v-if="arrow !== 'never' && count > 1"
      type="button"
      :class="[ns.e('arrow'), ns.e('arrow-right')]"
      aria-label="下一张"
      @click="nextSlide"
    >
      <DanIcon name="chevron-right" />
    </button>

    <ul v-if="indicator && count > 1" :class="ns.e('indicators')">
      <li
        v-for="(_, index) in count"
        :key="index"
        :class="[ns.e('indicator'), ns.is('active', index === activeIndex)]"
      >
        <button
          type="button"
          :aria-label="`切换到第 ${index + 1} 张`"
          @click="setActive(index)"
        />
      </li>
    </ul>
  </div>
</template>
