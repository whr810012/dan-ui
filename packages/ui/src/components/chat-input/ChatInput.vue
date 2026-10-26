<script setup lang="ts">
import { computed, inject, ref, watch } from 'vue'
import { chatContextKey } from '../../hooks/useChatContext'
import { useNamespace } from '../../hooks/useNamespace'
import { DanButton } from '../button'
import { DanTextarea } from '../textarea'
import './style.css'

defineOptions({ name: 'DanChatInput' })

const props = withDefaults(
  defineProps<{
    modelValue?: string
    disabled?: boolean
    placeholder?: string
    submitOnEnter?: boolean
  }>(),
  {
    modelValue: '',
    disabled: false,
    placeholder: '输入消息，Enter 发送，Shift+Enter 换行',
    submitOnEnter: true,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
  send: [value: string]
  stop: []
}>()

const ns = useNamespace('chat-input')
const chat = inject(chatContextKey, undefined)
const localValue = ref(props.modelValue)

watch(
  () => props.modelValue,
  (value) => {
    if (value !== localValue.value) localValue.value = value
  },
)

const generating = computed(() => chat?.generating.value === true)
const canSend = computed(
  () => localValue.value.trim().length > 0 && !props.disabled && !generating.value,
)

function sync(value: string) {
  localValue.value = value
  emit('update:modelValue', value)
}

function onSend() {
  const content = localValue.value.trim()
  if (!content || props.disabled || generating.value) return
  emit('send', content)
  chat?.send(content)
  sync('')
}

function onStop() {
  emit('stop')
  chat?.stop()
}

function onKeydown(event: KeyboardEvent) {
  if (!props.submitOnEnter) return
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault()
    onSend()
  }
}
</script>

<template>
  <div :class="[ns.b(), ns.is('disabled', disabled)]">
    <DanTextarea
      :model-value="localValue"
      :placeholder="placeholder"
      :disabled="disabled || generating"
      :rows="3"
      @update:model-value="sync"
      @keydown="onKeydown"
    />
    <div :class="ns.e('actions')">
      <slot name="actions" />
      <DanButton
        v-if="generating"
        type="danger"
        @click="onStop"
      >
        停止
      </DanButton>
      <DanButton
        v-else
        type="primary"
        :disabled="!canSend"
        @click="onSend"
      >
        发送
      </DanButton>
    </div>
  </div>
</template>
