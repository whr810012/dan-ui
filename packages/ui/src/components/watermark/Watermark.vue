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
    /** 图片水印地址；设置后以图片替代文字水印 */
    image?: string
    /** 图片水印渲染宽度上限 */
    imageWidth?: number
    /** 图片水印渲染高度上限 */
    imageHeight?: number
    /** 图片水印透明度 */
    imageOpacity?: number
    /** 跨域图片需要服务端允许，并在此声明 crossOrigin */
    crossOrigin?: '' | 'anonymous' | 'use-credentials'
  }>(),
  {
    content: 'dan-ui',
    fontSize: 14,
    color: 'rgba(0, 0, 0, 0.12)',
    rotate: -22,
    gap: () => [100, 100],
    zIndex: 9,
    image: '',
    imageWidth: 60,
    imageHeight: 60,
    imageOpacity: 1,
    crossOrigin: '',
  },
)

const ns = useNamespace('watermark')
const rootRef = ref<HTMLElement | null>(null)
const bgUrl = ref('')

/** 已加载完成的图片，非响应式，避免把 HTMLImageElement 塞进响应式系统 */
let imageEl: HTMLImageElement | null = null
let imageSrc = ''
/** idle 无图片 / loading 加载中（不绘制）/ ready 可绘制 / failed 退回文字 */
let imageState: 'idle' | 'loading' | 'ready' | 'failed' = 'idle'

function lines() {
  return Array.isArray(props.content) ? props.content : [props.content]
}

function drawTextLayer(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = props.color
  ctx.font = `${props.fontSize}px var(--dan-font-family, sans-serif)`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  const textLines = lines()
  textLines.forEach((line, index) => {
    const y = (index - (textLines.length - 1) / 2) * (props.fontSize + 4)
    ctx.fillText(line, 0, y)
  })
}

function drawImageLayer(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
) {
  if (!imageEl) return
  const naturalWidth = imageEl.naturalWidth || props.imageWidth
  const naturalHeight = imageEl.naturalHeight || props.imageHeight
  if (!naturalWidth || !naturalHeight) return

  // 先按 imageWidth / imageHeight 的盒模型等比适配，再保证不超出单个平铺单元
  const fit = Math.min(
    props.imageWidth / naturalWidth,
    props.imageHeight / naturalHeight,
  )
  let drawWidth = naturalWidth * fit
  let drawHeight = naturalHeight * fit
  const tileScale = Math.min(
    1,
    (width - 8) / Math.max(drawWidth, 1),
    (height - 8) / Math.max(drawHeight, 1),
  )
  drawWidth *= tileScale
  drawHeight *= tileScale

  ctx.globalAlpha = Math.min(Math.max(props.imageOpacity, 0), 1)
  ctx.drawImage(imageEl, -drawWidth / 2, -drawHeight / 2, drawWidth, drawHeight)
  ctx.globalAlpha = 1
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
    if (width <= 0 || height <= 0) return
    canvas.width = width * ratio
    canvas.height = height * ratio
    ctx.scale(ratio, ratio)
    ctx.clearRect(0, 0, width, height)
    ctx.translate(width / 2, height / 2)
    ctx.rotate((Math.PI / 180) * props.rotate)

    if (imageState === 'ready' && imageEl) {
      drawImageLayer(ctx, width, height)
    } else if (imageState === 'failed' || !props.image) {
      drawTextLayer(ctx)
    }
    // loading 阶段不绘制，避免文字水印闪一下再被图片替换

    bgUrl.value = canvas.toDataURL()
  } catch {
    /* jsdom 等环境可能无 canvas 实现 */
  }
}

function loadImage() {
  const src = props.image
  if (!src) {
    imageEl = null
    imageSrc = ''
    imageState = 'idle'
    paint()
    return
  }
  if (src === imageSrc && imageState === 'ready') {
    paint()
    return
  }
  imageState = 'loading'
  imageSrc = src
  try {
    const img = new Image()
    if (props.crossOrigin) img.crossOrigin = props.crossOrigin
    img.onload = () => {
      if (props.image !== src) return
      imageEl = img
      imageState = 'ready'
      paint()
    }
    img.onerror = () => {
      if (props.image !== src) return
      // 图片失败时退回文字水印，避免整层空白
      imageEl = null
      imageState = 'failed'
      paint()
    }
    img.src = src
  } catch {
    imageEl = null
    imageState = 'failed'
    paint()
  }
}

const layerStyle = computed(() => ({
  zIndex: String(props.zIndex),
  backgroundImage: bgUrl.value ? `url(${bgUrl.value})` : undefined,
}))

onMounted(loadImage)

watch(
  () => props.image,
  () => loadImage(),
)

watch(
  () => [
    props.content,
    props.fontSize,
    props.color,
    props.rotate,
    props.gap[0],
    props.gap[1],
    props.imageWidth,
    props.imageHeight,
    props.imageOpacity,
  ],
  paint,
  { deep: true },
)

onBeforeUnmount(() => {
  bgUrl.value = ''
  imageEl = null
  imageSrc = ''
  imageState = 'idle'
})
</script>

<template>
  <div ref="rootRef" :class="ns.b()">
    <slot />
    <div :class="ns.e('layer')" :style="layerStyle" aria-hidden="true" />
  </div>
</template>
