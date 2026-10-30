<script setup lang="ts">
import { useNamespace } from '../../hooks/useNamespace'
import { DanIcon } from '../icon'
import './style.css'

defineOptions({ name: 'DanTag' })

const props = withDefaults(
  defineProps<{
    type?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info'
    size?: 'small' | 'default' | 'large'
    effect?: 'light' | 'dark' | 'plain'
    round?: boolean
    /** 描边强调（边框跟随时文字色） */
    hit?: boolean
    closable?: boolean
    disabled?: boolean
  }>(),
  {
    type: 'default',
    size: 'default',
    effect: 'light',
    round: false,
    hit: false,
    closable: false,
    disabled: false,
  },
)

const emit = defineEmits<{
  close: [event: MouseEvent]
  click: [event: MouseEvent]
}>()

const ns = useNamespace('tag')

function onClose(event: MouseEvent) {
  if (props.disabled) return
  event.stopPropagation()
  emit('close', event)
}
</script>

<template>
  <span
    :class="[
      ns.b(),
      ns.m(type),
      ns.m(size),
      ns.m(effect),
      ns.is('round', round),
      ns.is('hit', hit),
      ns.is('closable', closable),
      ns.is('disabled', disabled),
    ]"
    @click="emit('click', $event)"
  >
    <span :class="ns.e('content')"><slot /></span>
    <button
      v-if="closable"
      type="button"
      :class="ns.e('close')"
      :disabled="disabled"
      aria-label="关闭"
      @click="onClose"
    >
      <DanIcon name="close" :size="12" />
    </button>
  </span>
</template>
