<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useNamespace } from '../../hooks/useNamespace'
import { DanStatistic } from '../statistic'
import './style.css'

defineOptions({ name: 'DanCountdown' })

const props = withDefaults(
  defineProps<{
    /** 目标时间：时间戳 ms 或 Date */
    value?: number | Date
    title?: string
    format?: string
    prefix?: string
    suffix?: string
  }>(),
  {
    title: '',
    format: 'HH:mm:ss',
    prefix: '',
    suffix: '',
  },
)

const emit = defineEmits<{
  finish: []
  change: [remainMs: number]
}>()

const ns = useNamespace('countdown')
const now = ref(Date.now())
let timer: ReturnType<typeof setInterval> | null = null
let finished = false

const targetMs = computed(() => {
  const v = props.value
  if (v == null) return Date.now() + 60_000
  return v instanceof Date ? v.getTime() : Number(v)
})

const remainMs = computed(() => Math.max(0, targetMs.value - now.value))

function pad(n: number) {
  return String(n).padStart(2, '0')
}

const display = computed(() => {
  let ms = remainMs.value
  const days = Math.floor(ms / 86_400_000)
  ms %= 86_400_000
  const hours = Math.floor(ms / 3_600_000)
  ms %= 3_600_000
  const minutes = Math.floor(ms / 60_000)
  ms %= 60_000
  const seconds = Math.floor(ms / 1000)
  return props.format
    .replace(/DD/g, pad(days))
    .replace(/HH/g, pad(hours))
    .replace(/mm/g, pad(minutes))
    .replace(/ss/g, pad(seconds))
})

function tick() {
  now.value = Date.now()
  emit('change', remainMs.value)
  if (remainMs.value <= 0 && !finished) {
    finished = true
    emit('finish')
    stop()
  }
}

function start() {
  stop()
  finished = false
  tick()
  if (!finished) timer = setInterval(tick, 200)
}

function stop() {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

onMounted(start)
onBeforeUnmount(stop)
watch(targetMs, () => {
  finished = false
  start()
})
</script>

<template>
  <div :class="ns.b()">
    <DanStatistic
      :title="title"
      :value="display"
      :prefix="prefix"
      :suffix="suffix"
    >
      <template v-if="$slots.title" #title>
        <slot name="title" />
      </template>
      <template v-if="$slots.prefix" #prefix>
        <slot name="prefix" />
      </template>
      <template v-if="$slots.suffix" #suffix>
        <slot name="suffix" />
      </template>
    </DanStatistic>
  </div>
</template>
