<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useNamespace } from '../../hooks/useNamespace'
import './style.css'

defineOptions({ name: 'DanQRCode' })

const props = withDefaults(
  defineProps<{
    value?: string
    size?: number
    color?: string
    background?: string
    errorLevel?: 'L' | 'M' | 'Q' | 'H'
  }>(),
  {
    value: '',
    size: 128,
    color: '#000000',
    background: '#ffffff',
    errorLevel: 'M',
  },
)

const ns = useNamespace('qrcode')
const canvasRef = ref<HTMLCanvasElement>()
const errorText = ref('')

async function render() {
  errorText.value = ''
  const canvas = canvasRef.value
  if (!canvas) return
  if (!props.value) {
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.fillStyle = props.background
    ctx.fillRect(0, 0, props.size, props.size)
    return
  }
  try {
    const QRCode = (await import('qrcode')).default
    await QRCode.toCanvas(canvas, props.value, {
      width: props.size,
      margin: 1,
      errorCorrectionLevel: props.errorLevel,
      color: {
        dark: props.color,
        light: props.background,
      },
    })
  } catch (error) {
    errorText.value = error instanceof Error ? error.message : 'QR render failed'
  }
}

onMounted(() => {
  void render()
})

watch(
  () =>
    [
      props.value,
      props.size,
      props.color,
      props.background,
      props.errorLevel,
    ] as const,
  () => {
    void render()
  },
)
</script>

<template>
  <div :class="ns.b()" :style="{ width: `${size}px`, height: `${size}px` }">
    <canvas
      ref="canvasRef"
      :class="ns.e('canvas')"
      :width="size"
      :height="size"
      role="img"
      :aria-label="value ? `QR code for ${value}` : 'Empty QR code'"
    />
    <div v-if="errorText" :class="ns.e('error')">{{ errorText }}</div>
  </div>
</template>
