<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { useFormItem } from '../../hooks/useFormItem'
import { useNamespace } from '../../hooks/useNamespace'
import { useLocale } from '../../locale'
import { DanCascaderPanel } from '../cascader-panel'
import {
  cascaderPathEqual,
  normalizeCascaderPaths,
  type CascaderModelValue,
  type CascaderOption,
  type CascaderPath,
} from './types'
import './style.css'

defineOptions({ name: 'DanCascader' })

const props = withDefaults(
  defineProps<{
    modelValue?: CascaderModelValue
    options?: CascaderOption[]
    disabled?: boolean
    clearable?: boolean
    placeholder?: string
    filterable?: boolean
    filterPlaceholder?: string
    virtual?: boolean
    multiple?: boolean
    maxTagCount?: number
    /** 是否显示完整路径；false 仅显示末级 */
    showAllLevels?: boolean
    /** 路径展示分隔符 */
    separator?: string
    /** 可选中任意一级（非仅叶子） */
    checkStrictly?: boolean
  }>(),
  {
    modelValue: null,
    options: () => [],
    disabled: false,
    clearable: false,
    filterable: false,
    filterPlaceholder: '搜索',
    virtual: false,
    multiple: false,
    maxTagCount: 0,
    showAllLevels: true,
    separator: ' / ',
    checkStrictly: false,
  },
)

const { t } = useLocale()
const resolvedPlaceholder = computed(
  () => props.placeholder ?? t('cascader.placeholder'),
)

const emit = defineEmits<{
  'update:modelValue': [value: CascaderModelValue]
  change: [value: CascaderModelValue]
  clear: []
}>()

const ns = useNamespace('cascader')
const { form, emitChange } = useFormItem()
const opened = ref(false)
const rootRef = ref<HTMLElement | null>(null)
const panelRef = ref<HTMLElement | null>(null)
const panelStyle = ref<Record<string, string>>({})

const isDisabled = computed(
  () => props.disabled || form?.disabled.value === true,
)

function findPathLabel(path: CascaderPath): string {
  const labels: string[] = []
  let list = props.options
  for (const val of path) {
    const found = list.find((item) => item.value === val)
    if (!found) break
    labels.push(found.label)
    list = found.children || []
  }
  if (!labels.length) return ''
  if (!props.showAllLevels) return labels[labels.length - 1]!
  return labels.join(props.separator)
}

const selectedPaths = computed((): CascaderPath[] =>
  normalizeCascaderPaths(props.modelValue, props.multiple),
)

const tags = computed(() =>
  selectedPaths.value.map((path) => ({
    path,
    label: findPathLabel(path),
  })),
)

const visibleTags = computed(() => {
  if (props.maxTagCount > 0 && tags.value.length > props.maxTagCount) {
    return tags.value.slice(0, props.maxTagCount)
  }
  return tags.value
})

const hiddenTagCount = computed(() => {
  if (!props.multiple || props.maxTagCount <= 0) return 0
  return Math.max(0, tags.value.length - props.maxTagCount)
})

const displayLabel = computed(() => {
  if (props.multiple) return ''
  return tags.value[0]?.label || ''
})

const showClear = computed(
  () =>
    props.clearable && selectedPaths.value.length > 0 && !isDisabled.value,
)

function updatePanelPosition() {
  const rect = rootRef.value?.getBoundingClientRect()
  if (!rect) return
  panelStyle.value = {
    position: 'fixed',
    top: `${rect.bottom + 4}px`,
    left: `${rect.left}px`,
    zIndex: 'var(--dan-z-index-dropdown)',
  }
}

async function openPanel() {
  if (isDisabled.value) return
  opened.value = true
  await nextTick()
  updatePanelPosition()
}

function closePanel() {
  opened.value = false
}

function toggle() {
  if (isDisabled.value) return
  if (opened.value) closePanel()
  else void openPanel()
}

function onPanelChange(value: CascaderModelValue) {
  emit('update:modelValue', value)
  emit('change', value)
  emitChange('change')
  if (!props.multiple && value != null) closePanel()
}

function clear(event: MouseEvent) {
  event.stopPropagation()
  const empty: CascaderModelValue = props.multiple ? [] : null
  emit('update:modelValue', empty)
  emit('change', empty)
  emit('clear')
  emitChange('change')
}

function removeTag(path: CascaderPath, event: MouseEvent) {
  event.stopPropagation()
  if (!props.multiple || isDisabled.value) return
  const next = selectedPaths.value.filter(
    (item) => !cascaderPathEqual(item, path),
  )
  emit('update:modelValue', next)
  emit('change', next)
  emitChange('change')
}

function onDoc(event: MouseEvent) {
  const target = event.target as Node
  if (rootRef.value?.contains(target)) return
  if (panelRef.value?.contains(target)) return
  closePanel()
}

function onKeydown(event: KeyboardEvent) {
  if (isDisabled.value) return
  if (event.key === 'Escape' && opened.value) {
    event.preventDefault()
    closePanel()
    return
  }
  if (event.key === 'ArrowDown' && !opened.value) {
    event.preventDefault()
    void openPanel()
  }
}

function onScrollOrResize() {
  if (opened.value) updatePanelPosition()
}

onMounted(() => {
  document.addEventListener('mousedown', onDoc)
  window.addEventListener('scroll', onScrollOrResize, true)
  window.addEventListener('resize', onScrollOrResize)
})

onBeforeUnmount(() => {
  document.removeEventListener('mousedown', onDoc)
  window.removeEventListener('scroll', onScrollOrResize, true)
  window.removeEventListener('resize', onScrollOrResize)
})
</script>

<template>
  <div
    ref="rootRef"
    :class="[
      ns.b(),
      ns.is('disabled', isDisabled),
      ns.is('opened', opened),
      ns.is('multiple', multiple),
    ]"
  >
    <button
      type="button"
      :class="ns.e('trigger')"
      :disabled="isDisabled"
      :aria-expanded="opened"
      aria-haspopup="listbox"
      @click="toggle"
      @keydown="onKeydown"
    >
      <template v-if="multiple && visibleTags.length">
        <span :class="ns.e('tags')">
          <span
            v-for="tag in visibleTags"
            :key="tag.path.join('/')"
            :class="ns.e('tag')"
          >
            {{ tag.label }}
            <button
              type="button"
              :class="ns.e('tag-close')"
              aria-label="移除"
              @click="removeTag(tag.path, $event)"
            >
              ×
            </button>
          </span>
          <span v-if="hiddenTagCount" :class="ns.e('tag-more')">
            +{{ hiddenTagCount }}
          </span>
        </span>
      </template>
      <span v-else-if="displayLabel" :class="ns.e('value')">{{
        displayLabel
      }}</span>
      <span v-else :class="ns.e('placeholder')">{{ resolvedPlaceholder }}</span>
      <span :class="ns.e('suffix')" aria-hidden="true" />
    </button>
    <button
      v-if="showClear"
      type="button"
      :class="ns.e('clear')"
      aria-label="清除"
      @click="clear"
    >
      ×
    </button>
    <Teleport to="body">
      <div
        v-if="opened"
        ref="panelRef"
        :class="ns.e('dropdown')"
        :style="panelStyle"
      >
        <DanCascaderPanel
          :model-value="modelValue"
          :options="options"
          :filterable="filterable"
          :filter-placeholder="filterPlaceholder"
          :virtual="virtual"
          :multiple="multiple"
          :check-strictly="checkStrictly"
          @change="onPanelChange"
        />
      </div>
    </Teleport>
  </div>
</template>
