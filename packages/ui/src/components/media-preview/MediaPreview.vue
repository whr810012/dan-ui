<script setup lang="ts">
import { computed } from 'vue'
import { useNamespace } from '../../hooks/useNamespace'
import { useLocale } from '../../locale'
import './style.css'

defineOptions({ name: 'DanMediaPreview' })

const props = withDefaults(
  defineProps<{
    src?: string
    /** image | pdf | file */
    type?: 'image' | 'pdf' | 'file' | 'auto'
    name?: string
    alt?: string
  }>(),
  {
    type: 'auto',
    name: '',
    alt: '',
  },
)

const emit = defineEmits<{
  open: []
  error: [event: Event]
}>()

const ns = useNamespace('media-preview')
const { t } = useLocale()

const resolvedType = computed(() => {
  if (props.type !== 'auto') return props.type
  const src = (props.src || '').toLowerCase()
  const name = (props.name || '').toLowerCase()
  const hay = `${src} ${name}`
  if (/\.(png|jpe?g|gif|webp|svg|bmp)(?:\?|#|$|\s)/i.test(hay)) return 'image'
  if (/\.pdf(?:\?|#|$|\s)/i.test(hay) || hay.includes('application/pdf'))
    return 'pdf'
  return 'file'
})

const displayName = computed(
  () => props.name || props.src?.split('/').pop() || t('mediaPreview.attachment'),
)
</script>

<template>
  <div :class="[ns.b(), ns.m(resolvedType)]">
    <div v-if="resolvedType === 'image' && src" :class="ns.e('frame')">
      <img
        :src="src"
        :alt="alt || displayName"
        :class="ns.e('img')"
        @click="emit('open')"
        @error="emit('error', $event)"
      />
    </div>
    <div v-else-if="resolvedType === 'pdf'" :class="ns.e('pdf')">
      <div :class="ns.e('icon')" aria-hidden="true">PDF</div>
      <div :class="ns.e('meta')">
        <div :class="ns.e('name')">{{ displayName }}</div>
        <div :class="ns.e('hint')">{{ t('mediaPreview.pdfHint') }}</div>
      </div>
      <button type="button" :class="ns.e('action')" @click="emit('open')">
        {{ t('mediaPreview.open') }}
      </button>
    </div>
    <div v-else :class="ns.e('file')">
      <div :class="ns.e('icon')" aria-hidden="true">FILE</div>
      <div :class="ns.e('meta')">
        <div :class="ns.e('name')">{{ displayName }}</div>
        <div :class="ns.e('hint')">{{ t('mediaPreview.fileHint') }}</div>
      </div>
      <button
        v-if="src"
        type="button"
        :class="ns.e('action')"
        @click="emit('open')"
      >
        {{ t('mediaPreview.open') }}
      </button>
    </div>
    <slot />
  </div>
</template>
