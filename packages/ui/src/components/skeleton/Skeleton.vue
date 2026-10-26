<script setup lang="ts">
import { useNamespace } from '../../hooks/useNamespace'
import './style.css'

defineOptions({ name: 'DanSkeleton' })

withDefaults(
  defineProps<{
    loading?: boolean
    rows?: number
    animated?: boolean
    avatar?: boolean
  }>(),
  {
    loading: true,
    rows: 3,
    animated: true,
    avatar: false,
  },
)

const ns = useNamespace('skeleton')
</script>

<template>
  <div v-if="loading" :class="[ns.b(), ns.is('animated', animated)]">
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
