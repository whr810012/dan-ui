<script setup lang="ts">
import { computed } from 'vue'
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
    layout?: string
  }>(),
  {
    total: 0,
    pageSize: 10,
    currentPage: 1,
    pagerCount: 7,
    disabled: false,
    background: false,
    layout: 'prev, pager, next, total',
  },
)

const emit = defineEmits<{
  'update:currentPage': [page: number]
  'current-change': [page: number]
}>()

const ns = useNamespace('pagination')

const pageCount = computed(() =>
  Math.max(1, Math.ceil(props.total / props.pageSize) || 1),
)

const layoutParts = computed(() =>
  props.layout.split(',').map((item) => item.trim()),
)

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

function go(page: number) {
  if (props.disabled) return
  const next = Math.min(Math.max(page, 1), pageCount.value)
  if (next === props.currentPage) return
  emit('update:currentPage', next)
  emit('current-change', next)
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
        上一页
      </button>

      <ul v-else-if="part === 'pager'" :class="ns.e('pager')">
        <li
          v-for="page in pagers"
          :key="page"
          :class="[
            ns.e('number'),
            ns.is('active', page === currentPage),
            ns.is('disabled', disabled),
          ]"
          @click="go(page)"
        >
          {{ page }}
        </li>
      </ul>

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
        下一页
      </button>

      <span v-else-if="part === 'total'" :class="ns.e('total')">
        共 {{ total }} 条
      </span>
    </template>
  </div>
</template>
