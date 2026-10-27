<script setup lang="ts">
import { onBeforeUnmount, watch } from 'vue'
import { useNamespace } from '../../hooks/useNamespace'
import './style.css'

defineOptions({ name: 'DanImagePreview' })

const props = withDefaults(
  defineProps<{
    modelValue?: boolean
    url?: string
    alt?: string
  }>(),
  {
    modelValue: false,
    url: '',
    alt: '',
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  close: []
}>()

const ns = useNamespace('image-preview')

function close() {
  emit('update:modelValue', false)
  emit('close')
}

function onKey(event: KeyboardEvent) {
  if (event.key === 'Escape') close()
}

watch(
  () => props.modelValue,
  (visible) => {
    if (typeof document === 'undefined') return
    if (visible) document.addEventListener('keydown', onKey)
    else document.removeEventListener('keydown', onKey)
  },
)

onBeforeUnmount(() => {
  if (typeof document !== 'undefined') {
    document.removeEventListener('keydown', onKey)
  }
})
</script>

<template>
  <Teleport to="body">
    <div
      v-if="modelValue"
      :class="ns.b()"
      role="dialog"
      aria-modal="true"
      aria-label="图片预览"
      @click="close"
    >
      <button
        type="button"
        :class="ns.e('close')"
        aria-label="关闭"
        @click.stop="close"
      >
        ×
      </button>
      <img v-if="url" :class="ns.e('img')" :src="url" :alt="alt" @click.stop />
    </div>
  </Teleport>
</template>
