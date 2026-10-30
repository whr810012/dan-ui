<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { useNamespace } from '../../hooks/useNamespace'
import { DanIcon } from '../icon'
import './style.css'

defineOptions({ name: 'DanImage' })

const props = withDefaults(
  defineProps<{
    src?: string
    alt?: string
    fit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down'
    lazy?: boolean
    preview?: boolean
    previewSrc?: string
    /** 多图预览列表；未传时仅预览当前图 */
    previewSrcList?: string[]
    /** 打开预览时的初始下标（相对 previewSrcList） */
    initialIndex?: number
  }>(),
  {
    src: '',
    alt: '',
    fit: 'cover',
    lazy: false,
    preview: false,
    previewSrc: '',
    previewSrcList: () => [],
    initialIndex: 0,
  },
)

const emit = defineEmits<{
  load: [event: Event]
  error: [event: Event]
  close: []
  switch: [index: number]
}>()

const ns = useNamespace('image')
const hasError = ref(false)
const previewVisible = ref(false)
const previewIndex = ref(0)

const previewList = computed(() => {
  if (props.previewSrcList.length) return props.previewSrcList
  const single = props.previewSrc || props.src
  return single ? [single] : []
})

const currentPreviewSrc = computed(
  () => previewList.value[previewIndex.value] || props.previewSrc || props.src,
)

const showNav = computed(() => previewList.value.length > 1)

watch(
  () => props.src,
  () => {
    hasError.value = false
  },
)

function onError(event: Event) {
  hasError.value = true
  emit('error', event)
}

function resolveOpenIndex() {
  const list = previewList.value
  if (!list.length) return 0
  if (props.previewSrcList.length) {
    const clamped = Math.min(
      Math.max(0, props.initialIndex),
      list.length - 1,
    )
    const current = props.previewSrc || props.src
    if (current) {
      const hit = list.indexOf(current)
      if (hit >= 0) return hit
    }
    return clamped
  }
  return 0
}

function openPreview() {
  if (!props.preview || hasError.value) return
  if (!previewList.value.length) return
  previewIndex.value = resolveOpenIndex()
  previewVisible.value = true
  document.addEventListener('keydown', onPreviewKeydown)
}

function closePreview() {
  if (!previewVisible.value) return
  previewVisible.value = false
  document.removeEventListener('keydown', onPreviewKeydown)
  emit('close')
}

function setPreviewIndex(index: number) {
  const len = previewList.value.length
  if (!len) return
  const next = ((index % len) + len) % len
  if (next === previewIndex.value) return
  previewIndex.value = next
  emit('switch', next)
}

function prevPreview(event?: Event) {
  event?.stopPropagation()
  setPreviewIndex(previewIndex.value - 1)
}

function nextPreview(event?: Event) {
  event?.stopPropagation()
  setPreviewIndex(previewIndex.value + 1)
}

function onPreviewKeydown(event: KeyboardEvent) {
  if (!previewVisible.value) return
  if (event.key === 'Escape') {
    event.preventDefault()
    closePreview()
  } else if (event.key === 'ArrowLeft' && showNav.value) {
    event.preventDefault()
    prevPreview()
  } else if (event.key === 'ArrowRight' && showNav.value) {
    event.preventDefault()
    nextPreview()
  }
}

onBeforeUnmount(() => {
  document.removeEventListener('keydown', onPreviewKeydown)
})
</script>

<template>
  <div :class="[ns.b(), ns.is('error', hasError)]" @click="openPreview">
    <img
      v-if="src && !hasError"
      :class="ns.e('inner')"
      :src="src"
      :alt="alt"
      :loading="lazy ? 'lazy' : 'eager'"
      :style="{ objectFit: fit }"
      @load="emit('load', $event)"
      @error="onError"
    />
    <div v-else :class="ns.e('placeholder')">
      <slot name="error">
        <DanIcon name="error" :size="28" />
        <span>加载失败</span>
      </slot>
    </div>

    <Teleport to="body">
      <div
        v-if="previewVisible"
        :class="ns.e('preview')"
        role="dialog"
        aria-modal="true"
        @click="closePreview"
      >
        <button
          type="button"
          :class="ns.e('preview-close')"
          aria-label="关闭预览"
          @click.stop="closePreview"
        >
          <DanIcon name="close" :size="20" />
        </button>
        <button
          v-if="showNav"
          type="button"
          :class="[ns.e('preview-nav'), ns.e('preview-prev')]"
          aria-label="上一张"
          @click="prevPreview"
        >
          <DanIcon name="chevron-left" :size="24" />
        </button>
        <img
          :class="ns.e('preview-img')"
          :src="currentPreviewSrc"
          :alt="alt"
          @click.stop
        />
        <button
          v-if="showNav"
          type="button"
          :class="[ns.e('preview-nav'), ns.e('preview-next')]"
          aria-label="下一张"
          @click="nextPreview"
        >
          <DanIcon name="chevron-right" :size="24" />
        </button>
        <div v-if="showNav" :class="ns.e('preview-index')" @click.stop>
          {{ previewIndex + 1 }} / {{ previewList.length }}
        </div>
      </div>
    </Teleport>
  </div>
</template>
