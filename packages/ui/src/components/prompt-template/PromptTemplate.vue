<script setup lang="ts">
import { computed, reactive, watch } from 'vue'
import { useNamespace } from '../../hooks/useNamespace'
import { DanButton } from '../button'
import { DanInput } from '../input'
import {
  extractPromptVariables,
  renderPromptTemplate,
} from './promptTemplateUtils'
import './style.css'

defineOptions({ name: 'DanPromptTemplate' })

const props = withDefaults(
  defineProps<{
    template?: string
    title?: string
    /** 受控变量值 */
    modelValue?: Record<string, string>
    applyText?: string
  }>(),
  {
    template: '',
    title: '提示词模板',
    applyText: '填入',
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: Record<string, string>]
  apply: [payload: { text: string; values: Record<string, string> }]
  change: [values: Record<string, string>]
}>()

const ns = useNamespace('prompt-template')

const variables = computed(() => extractPromptVariables(props.template))

const localValues = reactive<Record<string, string>>({})

watch(
  () => [props.template, props.modelValue] as const,
  () => {
    for (const name of variables.value) {
      if (!(name in localValues)) {
        localValues[name] = props.modelValue?.[name] ?? ''
      }
    }
    if (props.modelValue) {
      for (const [key, value] of Object.entries(props.modelValue)) {
        localValues[key] = value
      }
    }
  },
  { immediate: true, deep: true },
)

const preview = computed(() =>
  renderPromptTemplate(props.template, { ...localValues }, { keepMissing: true }),
)

function onField(name: string, value: string) {
  localValues[name] = value
  const next = { ...localValues }
  emit('update:modelValue', next)
  emit('change', next)
}

function onApply() {
  const values = { ...localValues }
  emit('apply', {
    text: renderPromptTemplate(props.template, values),
    values,
  })
}
</script>

<template>
  <div :class="ns.b()">
    <header :class="ns.e('header')">
      <div :class="ns.e('title')">
        <slot name="title">{{ title }}</slot>
      </div>
      <DanButton size="small" type="primary" @click="onApply">
        {{ applyText }}
      </DanButton>
    </header>
    <div v-if="variables.length" :class="ns.e('fields')">
      <label
        v-for="name in variables"
        :key="name"
        :class="ns.e('field')"
      >
        <span :class="ns.e('label')">{{ name }}</span>
        <DanInput
          :model-value="localValues[name] ?? ''"
          size="small"
          :placeholder="`{{${name}}}`"
          @update:model-value="onField(name, String($event ?? ''))"
        />
      </label>
    </div>
    <div v-else :class="ns.e('hint')">模板中无双花括号变量占位</div>
    <pre :class="ns.e('preview')">{{ preview }}</pre>
  </div>
</template>
