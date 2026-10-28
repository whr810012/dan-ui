<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useNamespace } from '../../hooks/useNamespace'
import './style.css'

defineOptions({ name: 'DanWatermark' })

const props = withDefaults(
  defineProps<{
    content?: string | string[]
    fontSize?: number
    color?: string
    rotate?: number
    gap?: [number, number]
    zIndex?: number
  }>(),
  {
    content: 'dan-ui',
    fontSize: 14,
    color: 'rgba(0, 0, 0, 0.12)',
    rotate: -22,
    gap: () => [100, 100],
    zIndex: 9,
  },
)

const ns = useNamespace('watermark')
const rootRef = ref<HTMLElement | null>(null)
const bgUrl = ref('')

function lines() {
  return Array.isArray(props.content) ? props.content : [props.content]
}

function paint() {
  try {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext?.('2d')
    if (!ctx) return
    const ratio = window.devicePixelRatio || 1
    const [gapX, gapY] = props.gap
    const width = gapX * 2
    const height = gapY * 2
    canvas.width = width * ratio
    canvas.height = height * ratio
    ctx.scale(ratio, ratio)
    ctx.clearRect(0, 0, width, height)
    ctx.fillStyle = props.color
    ctx.font = `${props.fontSize}px var(--dan-font-family, sans-serif)`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.translate(width / 2, height / 2)
    ctx.rotate((Math.PI / 180) * props.rotate)
    const textLines = lines()
    textLines.forEach((line, index) => {
      const y = (index - (textLines.length - 1) / 2) * (props.fontSize + 4)
      ctx.fillText(line, 0, y)
    })
    bgUrl.value = canvas.toDataURL()
  } catch {
    /* jsdom 等环境可能无 canvas 实现 */
  }
}

const layerStyle = computed(() => ({
  zIndex: String(props.zIndex),
  backgroundImage: bgUrl.value ? `url(${bgUrl.value})` : undefined,
}))

onMounted(paint)
watch(
  () => [
    props.content,
    props.fontSize,
    props.color,
    props.rotate,
    props.gap[0],
    props.gap[1],
  ],
  paint,
  { deep: true },
)

onBeforeUnmount(() => {
  bgUrl.value = ''
})
</script>

<template>
  <div ref="rootRef" :class="ns.b()">
    <slot />
    <div :class="ns.e('layer')" :style="layerStyle" aria-hidden="true" />
  </div>
</template>
