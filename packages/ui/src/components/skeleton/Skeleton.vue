<script setup lang="ts">
import { onBeforeUnmount, ref, watch } from 'vue'
import { useNamespace } from '../../hooks/useNamespace'
import './style.css'

defineOptions({ name: 'DanSkeleton' })

const props = withDefaults(
  defineProps<{
    loading?: boolean
    rows?: number
    animated?: boolean
    avatar?: boolean
    /** 延迟显示骨架的毫秒数，避免短暂 loading 闪烁 */
    throttle?: number
  }>(),
  {
    loading: true,
    rows: 3,
    animated: true,
    avatar: false,
    throttle: 0,
  },
)

const ns = useNamespace('skeleton')
const renderSkeleton = ref(props.loading && props.throttle <= 0)
let timer: ReturnType<typeof setTimeout> | null = null

function clearTimer() {
  if (timer) {
    clearTimeout(timer)
    timer = null
  }
}

watch(
  () => [props.loading, props.throttle] as const,
  ([loading, throttle]) => {
    clearTimer()
    if (!loading) {
      renderSkeleton.value = false
      return
    }
    if (!throttle || throttle <= 0) {
      renderSkeleton.value = true
      return
    }
    renderSkeleton.value = false
    timer = setTimeout(() => {
      timer = null
      if (props.loading) renderSkeleton.value = true
    }, throttle)
  },
  { immediate: true },
)

onBeforeUnmount(clearTimer)
</script>

<template>
  <div v-if="renderSkeleton" :class="[ns.b(), ns.is('animated', animated)]">
    <div v-if="avatar" :class="ns.e('avatar')" />
    <div :class="ns.e('content')">
      <div :class="[ns.e('item'), ns.e('title')]" />
      <div
        v-for="index in rows"
        :key="index"
        :class="ns.e('item')"
        :style="{ width: index === rows ? '60%' : '100%' }"
      />
    </div>
  </div>
  <slot v-else />
</template>
