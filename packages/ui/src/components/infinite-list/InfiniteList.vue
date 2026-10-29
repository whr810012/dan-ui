<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useNamespace } from '../../hooks/useNamespace'
import { useLocale } from '../../locale'
import './style.css'

defineOptions({ name: 'DanInfiniteList' })

const props = withDefaults(
  defineProps<{
    loading?: boolean
    finished?: boolean
    disabled?: boolean
    /** 距底部多少 px 触发 */
    threshold?: number
    height?: number | string
    loadingText?: string
    finishedText?: string
  }>(),
  {
    loading: false,
    finished: false,
    disabled: false,
    threshold: 80,
    height: 320,
  },
)

const { t } = useLocale()
const resolvedLoadingText = computed(
  () => props.loadingText ?? t('infiniteList.loading'),
)
const resolvedFinishedText = computed(
  () => props.finishedText ?? t('infiniteList.finished'),
)

const emit = defineEmits<{
  load: []
}>()

const ns = useNamespace('infinite-list')
const rootRef = ref<HTMLElement>()

function onScroll() {
  const el = rootRef.value
  if (!el || props.loading || props.finished || props.disabled) return
  const remain = el.scrollHeight - el.scrollTop - el.clientHeight
  if (remain <= props.threshold) emit('load')
}

onMounted(() => {
  rootRef.value?.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})

onBeforeUnmount(() => {
  rootRef.value?.removeEventListener('scroll', onScroll)
})

watch(
  () => [props.loading, props.finished, props.disabled] as const,
  () => {
    requestAnimationFrame(onScroll)
  },
)
</script>

<template>
  <div
    ref="rootRef"
    :class="[ns.b(), ns.is('disabled', disabled)]"
    :style="{
      height: typeof height === 'number' ? `${height}px` : height,
    }"
  >
    <div :class="ns.e('content')">
      <slot />
    </div>
    <div :class="ns.e('footer')">
      <slot name="footer">
        <span v-if="loading">{{ resolvedLoadingText }}</span>
        <span v-else-if="finished">{{ resolvedFinishedText }}</span>
      </slot>
    </div>
  </div>
</template>
