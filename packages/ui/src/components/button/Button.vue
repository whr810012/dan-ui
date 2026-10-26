<script setup lang="ts">
import { computed } from 'vue'
import { injectConfig } from '../../hooks/useConfig'
import { useNamespace } from '../../hooks/useNamespace'
import { DanIcon } from '../icon'
import type { ButtonNativeType, ButtonSize, ButtonType } from './types'
import './style.css'

defineOptions({ name: 'DanButton' })

const props = withDefaults(
  defineProps<{
    type?: ButtonType
    size?: ButtonSize
    nativeType?: ButtonNativeType
    plain?: boolean
    round?: boolean
    circle?: boolean
    text?: boolean
    link?: boolean
    disabled?: boolean
    loading?: boolean
    autofocus?: boolean
  }>(),
  {
    type: 'default',
    nativeType: 'button',
    plain: false,
    round: false,
    circle: false,
    text: false,
    link: false,
    disabled: false,
    loading: false,
    autofocus: false,
  },
)

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const config = injectConfig()
const ns = useNamespace('button')

const resolvedSize = computed(() => props.size ?? config.size.value)

const classes = computed(() => [
  ns.b(),
  ns.m(props.type),
  ns.m(resolvedSize.value),
  ns.is('plain', props.plain),
  ns.is('round', props.round),
  ns.is('circle', props.circle),
  ns.is('text', props.text),
  ns.is('link', props.link),
  ns.is('disabled', props.disabled || props.loading),
  ns.is('loading', props.loading),
])

function onClick(event: MouseEvent) {
  if (props.disabled || props.loading) {
    event.preventDefault()
    return
  }
  emit('click', event)
}
</script>

<template>
  <button
    :class="classes"
    :type="nativeType"
    :disabled="disabled || loading"
    :autofocus="autofocus"
    :aria-disabled="disabled || loading || undefined"
    :aria-busy="loading || undefined"
    @click="onClick"
  >
    <DanIcon v-if="loading" name="loading" spin :class="ns.e('icon')" />
    <span v-if="$slots.icon && !loading" :class="ns.e('icon')">
      <slot name="icon" />
    </span>
    <span v-if="$slots.default" :class="ns.e('text')">
      <slot />
    </span>
  </button>
</template>
