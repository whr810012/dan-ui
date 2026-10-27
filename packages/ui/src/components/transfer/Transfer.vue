<script setup lang="ts">
import { computed, ref } from 'vue'
import { useFormItem } from '../../hooks/useFormItem'
import { useNamespace } from '../../hooks/useNamespace'
import type { TransferItem } from './types'
import './style.css'

defineOptions({ name: 'DanTransfer' })

const props = withDefaults(
  defineProps<{
    modelValue?: Array<string | number>
    data?: TransferItem[]
    titles?: [string, string]
    filterable?: boolean
    disabled?: boolean
  }>(),
  {
    modelValue: () => [],
    data: () => [],
    titles: () => ['列表 1', '列表 2'],
    filterable: false,
    disabled: false,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: Array<string | number>]
  change: [
    value: Array<string | number>,
    direction: 'left' | 'right',
    moved: Array<string | number>,
  ]
}>()

const ns = useNamespace('transfer')
const { form, emitChange } = useFormItem()
const leftChecked = ref<Array<string | number>>([])
const rightChecked = ref<Array<string | number>>([])
const leftQuery = ref('')
const rightQuery = ref('')

const isDisabled = computed(
  () => props.disabled || form?.disabled.value === true,
)

const leftData = computed(() =>
  props.data.filter((item) => !props.modelValue.includes(item.key)),
)
const rightData = computed(() =>
  props.data.filter((item) => props.modelValue.includes(item.key)),
)

function filtered(list: TransferItem[], query: string) {
  const q = query.trim().toLowerCase()
  if (!q) return list
  return list.filter((item) => item.label.toLowerCase().includes(q))
}

const leftView = computed(() => filtered(leftData.value, leftQuery.value))
const rightView = computed(() => filtered(rightData.value, rightQuery.value))

function moveToRight() {
  if (isDisabled.value || !leftChecked.value.length) return
  const moved = [...leftChecked.value]
  const next = [...props.modelValue, ...moved]
  leftChecked.value = []
  emit('update:modelValue', next)
  emit('change', next, 'right', moved)
  emitChange('change')
}

function moveToLeft() {
  if (isDisabled.value || !rightChecked.value.length) return
  const moved = [...rightChecked.value]
  const next = props.modelValue.filter((key) => !moved.includes(key))
  rightChecked.value = []
  emit('update:modelValue', next)
  emit('change', next, 'left', moved)
  emitChange('change')
}

function toggleLeft(key: string | number, disabled?: boolean) {
  if (isDisabled.value || disabled) return
  const set = new Set(leftChecked.value)
  if (set.has(key)) set.delete(key)
  else set.add(key)
  leftChecked.value = [...set]
}

function toggleRight(key: string | number, disabled?: boolean) {
  if (isDisabled.value || disabled) return
  const set = new Set(rightChecked.value)
  if (set.has(key)) set.delete(key)
  else set.add(key)
  rightChecked.value = [...set]
}
</script>

<template>
  <div :class="[ns.b(), ns.is('disabled', isDisabled)]">
    <div :class="ns.e('panel')">
      <div :class="ns.e('header')">{{ titles[0] }}</div>
      <input
        v-if="filterable"
        v-model="leftQuery"
        :class="ns.e('filter')"
        placeholder="搜索"
      />
      <ul :class="ns.e('list')">
        <li v-for="item in leftView" :key="item.key" :class="ns.e('item')">
          <label>
            <input
              type="checkbox"
              :checked="leftChecked.includes(item.key)"
              :disabled="item.disabled || isDisabled"
              @change="toggleLeft(item.key, item.disabled)"
            />
            <span>{{ item.label }}</span>
          </label>
        </li>
      </ul>
    </div>

    <div :class="ns.e('buttons')">
      <button
        type="button"
        :class="ns.e('button')"
        :disabled="isDisabled || !leftChecked.length"
        @click="moveToRight"
      >
        ›
      </button>
      <button
        type="button"
        :class="ns.e('button')"
        :disabled="isDisabled || !rightChecked.length"
        @click="moveToLeft"
      >
        ‹
      </button>
    </div>

    <div :class="ns.e('panel')">
      <div :class="ns.e('header')">{{ titles[1] }}</div>
      <input
        v-if="filterable"
        v-model="rightQuery"
        :class="ns.e('filter')"
        placeholder="搜索"
      />
      <ul :class="ns.e('list')">
        <li v-for="item in rightView" :key="item.key" :class="ns.e('item')">
          <label>
            <input
              type="checkbox"
              :checked="rightChecked.includes(item.key)"
              :disabled="item.disabled || isDisabled"
              @change="toggleRight(item.key, item.disabled)"
            />
            <span>{{ item.label }}</span>
          </label>
        </li>
      </ul>
    </div>
  </div>
</template>
