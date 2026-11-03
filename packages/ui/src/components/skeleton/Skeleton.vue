<script setup lang="ts">
import { onBeforeUnmount, provide, ref, toRef, watch } from 'vue'
import { useNamespace } from '../../hooks/useNamespace'
import {
  normalizeThrottle,
  skeletonContextKey,
  type SkeletonThrottle,
} from './context'
import './style.css'

defineOptions({ name: 'DanSkeleton' })

const props = withDefaults(
  defineProps<{
    loading?: boolean
    rows?: number
    animated?: boolean
    avatar?: boolean
    count?: number
    /** 延迟显示/隐藏骨架；数字等同 `{ leading }` */
    throttle?: SkeletonThrottle
  }>(),
  {
    loading: true,
    rows: 3,
    animated: true,
    avatar: false,
    count: 1,
    throttle: 0,
  },
)

const ns = useNamespace('skeleton')
provide(skeletonContextKey, {
  animated: toRef(props, 'animated'),
})

const renderSkeleton = ref(false)
let timer: ReturnType<typeof setTimeout> | null = null
let initialized = false

function clearTimer() {
  if (timer) {
    clearTimeout(timer)
    timer = null
  }
}

function showSkeleton() {
  renderSkeleton.value = true
}

function hideSkeleton() {
  renderSkeleton.value = false
}

watch(
  () => [props.loading, props.throttle] as const,
  ([loading]) => {
    clearTimer()
    const { leading, trailing, initVal } = normalizeThrottle(props.throttle)

    if (!initialized) {
      initialized = true
      if (!loading) {
        hideSkeleton()
        return
      }
      if (initVal || leading <= 0) {
        showSkeleton()
        return
      }
      hideSkeleton()
      timer = setTimeout(() => {
        timer = null
        if (props.loading) showSkeleton()
      }, leading)
      return
    }

    if (loading) {
      if (leading <= 0) {
        showSkeleton()
        return
      }
      hideSkeleton()
      timer = setTimeout(() => {
        timer = null
        if (props.loading) showSkeleton()
      }, leading)
      return
    }

    if (trailing <= 0) {
      hideSkeleton()
      return
    }
    timer = setTimeout(() => {
      timer = null
      if (!props.loading) hideSkeleton()
    }, trailing)
  },
  { immediate: true },
)

onBeforeUnmount(clearTimer)
</script>

<template>
  <template v-if="renderSkeleton">
    <div
      v-for="index in Math.max(1, count)"
      :key="index"
      :class="[ns.b(), ns.is('animated', animated)]"
    >
      <slot name="template">
        <div v-if="avatar" :class="ns.e('avatar')" />
        <div :class="ns.e('content')">
          <div :class="[ns.e('item'), ns.e('title')]" />
          <div
            v-for="row in rows"
            :key="row"
            :class="ns.e('item')"
            :style="{ width: row === rows ? '60%' : '100%' }"
          />
        </div>
      </slot>
    </div>
  </template>
  <slot v-else />
</template>
