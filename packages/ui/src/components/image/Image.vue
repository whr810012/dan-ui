<script setup lang="ts">
import { ref, watch } from 'vue'
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
  }>(),
  {
    src: '',
    alt: '',
    fit: 'cover',
    lazy: false,
    preview: false,
    previewSrc: '',
  },
)

const emit = defineEmits<{
  load: [event: Event]
  error: [event: Event]
  close: []
}>()

const ns = useNamespace('image')
const hasError = ref(false)
const previewVisible = ref(false)

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

function openPreview() {
  if (!props.preview || hasError.value) return
  previewVisible.value = true
}

function closePreview() {
  previewVisible.value = false
  emit('close')
}
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
        <img
          :class="ns.e('preview-img')"
          :src="previewSrc || src"
          :alt="alt"
          @click.stop
        />
      </div>
    </Teleport>
  </div>
</template>
