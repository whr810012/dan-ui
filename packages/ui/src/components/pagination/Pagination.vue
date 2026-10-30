<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useLocale } from '../../locale'
import { useNamespace } from '../../hooks/useNamespace'
import './style.css'

defineOptions({ name: 'DanPagination' })

const props = withDefaults(
  defineProps<{
    total?: number
    pageSize?: number
    currentPage?: number
    pagerCount?: number
    disabled?: boolean
    background?: boolean
    /** 每页条数候选项；layout 含 sizes 时生效 */
    pageSizes?: number[]
    layout?: string
  }>(),
  {
    total: 0,
    pageSize: 10,
    currentPage: 1,
    pagerCount: 7,
    disabled: false,
    background: false,
    pageSizes: () => [10, 20, 50, 100],
    layout: 'prev, pager, next, total',
  },
)

const emit = defineEmits<{
  'update:currentPage': [page: number]
  'update:pageSize': [size: number]
  'current-change': [page: number]
  'size-change': [size: number]
}>()

const ns = useNamespace('pagination')
const { t } = useLocale()
const jumperInput = ref(String(props.currentPage))

const pageCount = computed(() =>
  Math.max(1, Math.ceil(props.total / props.pageSize) || 1),
)

const layoutParts = computed(() =>
  props.layout.split(',').map((item) => item.trim()).filter(Boolean),
)

const sizeOptions = computed(() => {
  const sizes = props.pageSizes.slice()
  if (!sizes.includes(props.pageSize)) sizes.unshift(props.pageSize)
  return sizes
})

const pagers = computed(() => {
  const count = pageCount.value
  const current = props.currentPage
  const pagerCount = Math.max(5, props.pagerCount)
  if (count <= pagerCount) {
    return Array.from({ length: count }, (_, index) => index + 1)
  }

  const half = Math.floor(pagerCount / 2)
  let start = Math.max(1, current - half)
  let end = start + pagerCount - 1
  if (end > count) {
    end = count
    start = end - pagerCount + 1
  }
  return Array.from({ length: end - start + 1 }, (_, index) => start + index)
})

watch(
  () => props.currentPage,
  (page) => {
    jumperInput.value = String(page)
  },
)

function go(page: number) {
  if (props.disabled) return
  const next = Math.min(Math.max(page, 1), pageCount.value)
  if (next === props.currentPage) return
  emit('update:currentPage', next)
  emit('current-change', next)
}

function onSizeChange(event: Event) {
  if (props.disabled) return
  const size = Number((event.target as HTMLSelectElement).value)
  if (!Number.isFinite(size) || size <= 0 || size === props.pageSize) return
  emit('update:pageSize', size)
  emit('size-change', size)
  const maxPage = Math.max(1, Math.ceil(props.total / size) || 1)
  if (props.currentPage > maxPage) {
    emit('update:currentPage', maxPage)
    emit('current-change', maxPage)
  }
}

function onJumperConfirm() {
  if (props.disabled) return
  const page = Number.parseInt(jumperInput.value, 10)
  if (!Number.isFinite(page)) {
    jumperInput.value = String(props.currentPage)
    return
  }
  go(page)
  jumperInput.value = String(
    Math.min(Math.max(page, 1), pageCount.value),
  )
}
</script>

<template>
  <div
    :class="[
      ns.b(),
      ns.is('background', background),
      ns.is('disabled', disabled),
    ]"
  >
    <template v-for="part in layoutParts" :key="part">
      <button
        v-if="part === 'prev'"
        type="button"
        :class="[ns.e('btn'), ns.is('disabled', currentPage <= 1 || disabled)]"
        :disabled="currentPage <= 1 || disabled"
        @click="go(currentPage - 1)"
      >
        {{ t('pagination.prev') }}
      </button>

      <div v-else-if="part === 'pager'" :class="ns.e('pager')" role="list">
        <button
          v-for="page in pagers"
          :key="page"
          type="button"
          role="listitem"
          :class="[
            ns.e('number'),
            ns.is('active', page === currentPage),
            ns.is('disabled', disabled),
          ]"
          :disabled="disabled"
          :aria-current="page === currentPage ? 'page' : undefined"
          @click="go(page)"
        >
          {{ page }}
        </button>
      </div>

      <button
        v-else-if="part === 'next'"
        type="button"
        :class="[
          ns.e('btn'),
          ns.is('disabled', currentPage >= pageCount || disabled),
        ]"
        :disabled="currentPage >= pageCount || disabled"
        @click="go(currentPage + 1)"
      >
        {{ t('pagination.next') }}
      </button>

      <span v-else-if="part === 'total'" :class="ns.e('total')">
        {{ t('pagination.total', { total }) }}
      </span>

      <label v-else-if="part === 'sizes'" :class="ns.e('sizes')">
        <select
          :class="ns.e('sizes-select')"
          :value="pageSize"
          :disabled="disabled"
          @change="onSizeChange"
        >
          <option v-for="size in sizeOptions" :key="size" :value="size">
            {{ t('pagination.pageSize', { size }) }}
          </option>
        </select>
      </label>

      <span v-else-if="part === 'jumper'" :class="ns.e('jumper')">
        {{ t('pagination.goto') }}
        <input
          :class="ns.e('jumper-input')"
          :value="jumperInput"
          :disabled="disabled"
          inputmode="numeric"
          @input="jumperInput = ($event.target as HTMLInputElement).value"
          @keydown.enter.prevent="onJumperConfirm"
          @blur="onJumperConfirm"
        />
        {{ t('pagination.pageClassifier') }}
      </span>
    </template>
  </div>
</template>
