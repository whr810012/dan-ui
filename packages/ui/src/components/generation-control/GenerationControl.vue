<script setup lang="ts">
import { DanButton } from '../button'
import { useNamespace } from '../../hooks/useNamespace'
import './style.css'

defineOptions({ name: 'DanGenerationControl' })

withDefaults(
  defineProps<{
    generating?: boolean
    stopText?: string
    regenerateText?: string
  }>(),
  {
    generating: false,
    stopText: '停止生成',
    regenerateText: '重新生成',
  },
)

const emit = defineEmits<{
  stop: []
  regenerate: []
}>()

const ns = useNamespace('generation-control')
</script>

<template>
  <div :class="ns.b()">
    <DanButton
      v-if="generating"
      type="danger"
      plain
      size="small"
      @click="emit('stop')"
    >
      {{ stopText }}
    </DanButton>
    <DanButton
      v-else
      type="primary"
      plain
      size="small"
      @click="emit('regenerate')"
    >
      {{ regenerateText }}
    </DanButton>
    <slot />
  </div>
</template>
