<script setup lang="ts">
import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
} from 'vue'
import { useNamespace } from '../../hooks/useNamespace'
import './style.css'

defineOptions({ name: 'DanScrollbar' })

const props = withDefaults(
  defineProps<{
    height?: string | number
    maxHeight?: string | number
    /** 使用原生滚动条 */
    native?: boolean
    /** 始终显示滚动条轨道 */
    always?: boolean
    /** 最小滑块尺寸 px */
    minSize?: number
    tag?: string
    wrapClass?: string | string[] | Record<string, boolean>
    viewClass?: string | string[] | Record<string, boolean>
  }>(),
  {
    native: false,
    always: false,
    minSize: 20,
    tag: 'div',
  },
)

const emit = defineEmits<{
  scroll: [payload: { scrollTop: number; scrollLeft: number }]
}>()

const ns = useNamespace('scrollbar')
const wrapRef = ref<HTMLElement | null>(null)
const viewRef = ref<HTMLElement | null>(null)
const sizeWidth = ref('0')
const sizeHeight = ref('0')
const moveX = ref(0)
const moveY = ref(0)
const hovering = ref(false)

function toCssSize(value?: string | number) {
  if (value == null || value === '') return undefined
  return typeof value === 'number' ? `${value}px` : value
}

const wrapStyle = computed(() => {
  const style: Record<string, string> = {}
  const height = toCssSize(props.height)
  const maxHeight = toCssSize(props.maxHeight)
  if (height) style.height = height
  if (maxHeight) style.maxHeight = maxHeight
  return style
})

const showBar = computed(() => props.always || hovering.value)

function update() {
  const wrap = wrapRef.value
  if (!wrap) return
  const { clientWidth, clientHeight, scrollWidth, scrollHeight, scrollLeft, scrollTop } =
    wrap

  if (scrollHeight > clientHeight) {
    const ratio = (clientHeight / scrollHeight) * 100
    const thumb = Math.max(props.minSize, (clientHeight * ratio) / 100)
    sizeHeight.value = `${thumb}px`
    moveY.value =
      scrollTop /
      Math.max(1, scrollHeight - clientHeight) *
      Math.max(0, clientHeight - thumb)
  } else {
    sizeHeight.value = '0'
    moveY.value = 0
  }

  if (scrollWidth > clientWidth) {
    const ratio = (clientWidth / scrollWidth) * 100
    const thumb = Math.max(props.minSize, (clientWidth * ratio) / 100)
    sizeWidth.value = `${thumb}px`
    moveX.value =
      scrollLeft /
      Math.max(1, scrollWidth - clientWidth) *
      Math.max(0, clientWidth - thumb)
  } else {
    sizeWidth.value = '0'
    moveX.value = 0
  }
}

function onScroll() {
  const wrap = wrapRef.value
  if (!wrap) return
  update()
  emit('scroll', {
    scrollTop: wrap.scrollTop,
    scrollLeft: wrap.scrollLeft,
  })
}

function setScrollTop(value: number) {
  if (wrapRef.value) wrapRef.value.scrollTop = value
}

function setScrollLeft(value: number) {
  if (wrapRef.value) wrapRef.value.scrollLeft = value
}

function onMouseEnter() {
  hovering.value = true
  update()
}

function onMouseLeave() {
  hovering.value = false
}

let resizeObserver: ResizeObserver | null = null

onMounted(async () => {
  await nextTick()
  update()
  if (typeof ResizeObserver !== 'undefined') {
    resizeObserver = new ResizeObserver(() => update())
    if (wrapRef.value) resizeObserver.observe(wrapRef.value)
    if (viewRef.value) resizeObserver.observe(viewRef.value)
  }
  window.addEventListener('resize', update)
})

onBeforeUnmount(() => {
  resizeObserver?.disconnect()
  window.removeEventListener('resize', update)
})

watch(
  () => [props.height, props.maxHeight, props.native] as const,
  () => void nextTick(update),
)

defineExpose({
  wrapRef,
  update,
  setScrollTop,
  setScrollLeft,
})
</script>

<template>
  <div
    :class="[ns.b(), ns.is('native', native), ns.is('always', always)]"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  >
    <div
      ref="wrapRef"
      :class="[ns.e('wrap'), ns.is('hidden-bar', !native), wrapClass]"
      :style="wrapStyle"
      @scroll="onScroll"
    >
      <component
        :is="tag"
        ref="viewRef"
        :class="[ns.e('view'), viewClass]"
      >
        <slot />
      </component>
    </div>
    <template v-if="!native">
      <div
        v-show="sizeHeight !== '0' && showBar"
        :class="[ns.e('bar'), ns.is('vertical', true)]"
      >
        <div
          :class="ns.e('thumb')"
          :style="{ height: sizeHeight, transform: `translateY(${moveY}px)` }"
        />
      </div>
      <div
        v-show="sizeWidth !== '0' && showBar"
        :class="[ns.e('bar'), ns.is('horizontal', true)]"
      >
        <div
          :class="ns.e('thumb')"
          :style="{ width: sizeWidth, transform: `translateX(${moveX}px)` }"
        />
      </div>
    </template>
  </div>
</template>
