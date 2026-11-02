<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
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
    filterPlaceholder?: string
    buttonTexts?: [string, string]
    disabled?: boolean
  }>(),
  {
    modelValue: () => [],
    data: () => [],
    titles: () => ['列表 1', '列表 2'],
    filterable: false,
    filterPlaceholder: '搜索',
    buttonTexts: () => ['', ''],
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
  'left-check-change': [keys: Array<string | number>]
  'right-check-change': [keys: Array<string | number>]
}>()

const ns = useNamespace('transfer')
const { form, emitChange } = useFormItem()
const leftChecked = ref<Array<string | number>>([])
const rightChecked = ref<Array<string | number>>([])
const leftQuery = ref('')
const rightQuery = ref('')
const leftSelectAllRef = ref<HTMLInputElement | null>(null)
const rightSelectAllRef = ref<HTMLInputElement | null>(null)

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

function enabledKeys(list: TransferItem[]) {
  return list.filter((item) => !item.disabled).map((item) => item.key)
}

const leftEnabledKeys = computed(() => enabledKeys(leftView.value))
const rightEnabledKeys = computed(() => enabledKeys(rightView.value))

const leftAllChecked = computed(
  () =>
    leftEnabledKeys.value.length > 0 &&
    leftEnabledKeys.value.every((key) => leftChecked.value.includes(key)),
)
const rightAllChecked = computed(
  () =>
    rightEnabledKeys.value.length > 0 &&
    rightEnabledKeys.value.every((key) => rightChecked.value.includes(key)),
)

const leftIndeterminate = computed(() => {
  const count = leftChecked.value.filter((key) =>
    leftEnabledKeys.value.includes(key),
  ).length
  return count > 0 && count < leftEnabledKeys.value.length
})

const rightIndeterminate = computed(() => {
  const count = rightChecked.value.filter((key) =>
    rightEnabledKeys.value.includes(key),
  ).length
  return count > 0 && count < rightEnabledKeys.value.length
})

watch([leftIndeterminate, leftAllChecked], async () => {
  await nextTick()
  if (leftSelectAllRef.value) {
    leftSelectAllRef.value.indeterminate = leftIndeterminate.value
  }
})

watch([rightIndeterminate, rightAllChecked], async () => {
  await nextTick()
  if (rightSelectAllRef.value) {
    rightSelectAllRef.value.indeterminate = rightIndeterminate.value
  }
})

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
  emit('left-check-change', leftChecked.value)
}

function toggleRight(key: string | number, disabled?: boolean) {
  if (isDisabled.value || disabled) return
  const set = new Set(rightChecked.value)
  if (set.has(key)) set.delete(key)
  else set.add(key)
  rightChecked.value = [...set]
  emit('right-check-change', rightChecked.value)
}

function toggleLeftAll() {
  if (isDisabled.value || !leftEnabledKeys.value.length) return
  leftChecked.value = leftAllChecked.value ? [] : [...leftEnabledKeys.value]
  emit('left-check-change', leftChecked.value)
}

function toggleRightAll() {
  if (isDisabled.value || !rightEnabledKeys.value.length) return
  rightChecked.value = rightAllChecked.value ? [] : [...rightEnabledKeys.value]
  emit('right-check-change', rightChecked.value)
}

const rightButtonText = computed(() => props.buttonTexts[0] || '›')
const leftButtonText = computed(() => props.buttonTexts[1] || '‹')
</script>

<template>
  <div :class="[ns.b(), ns.is('disabled', isDisabled)]">
    <div :class="ns.e('panel')">
      <div :class="ns.e('header')">
        <label :class="ns.e('header-check')">
          <input
            ref="leftSelectAllRef"
            type="checkbox"
            :checked="leftAllChecked"
            :disabled="isDisabled || !leftEnabledKeys.length"
            @change="toggleLeftAll"
          />
          <span>{{ titles[0] }}</span>
        </label>
        <span :class="ns.e('count')">
          {{ leftChecked.length }}/{{ leftView.length }}
        </span>
      </div>
      <input
        v-if="filterable"
        v-model="leftQuery"
        :class="ns.e('filter')"
        :placeholder="filterPlaceholder"
      />
      <ul :class="ns.e('list')">
        <li
          v-if="!leftView.length"
          :class="[ns.e('item'), ns.e('empty')]"
        >
          暂无数据
        </li>
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
        :class="[ns.e('button'), ns.is('with-text', !!buttonTexts[0])]"
        :disabled="isDisabled || !leftChecked.length"
        @click="moveToRight"
      >
        {{ rightButtonText }}
      </button>
      <button
        type="button"
        :class="[ns.e('button'), ns.is('with-text', !!buttonTexts[1])]"
        :disabled="isDisabled || !rightChecked.length"
        @click="moveToLeft"
      >
        {{ leftButtonText }}
      </button>
    </div>

    <div :class="ns.e('panel')">
      <div :class="ns.e('header')">
        <label :class="ns.e('header-check')">
          <input
            ref="rightSelectAllRef"
            type="checkbox"
            :checked="rightAllChecked"
            :disabled="isDisabled || !rightEnabledKeys.length"
            @change="toggleRightAll"
          />
          <span>{{ titles[1] }}</span>
        </label>
        <span :class="ns.e('count')">
          {{ rightChecked.length }}/{{ rightView.length }}
        </span>
      </div>
      <input
        v-if="filterable"
        v-model="rightQuery"
        :class="ns.e('filter')"
        :placeholder="filterPlaceholder"
      />
      <ul :class="ns.e('list')">
        <li
          v-if="!rightView.length"
          :class="[ns.e('item'), ns.e('empty')]"
        >
          暂无数据
        </li>
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
