<script setup lang="ts">
import { computed, ref } from 'vue'
import { useNamespace } from '../../hooks/useNamespace'
import './style.css'

defineOptions({ name: 'DanPromptLibrary' })

export interface PromptTemplate {
  id: string
  title: string
  content: string
  description?: string
  group?: string
}

const props = withDefaults(
  defineProps<{
    items?: PromptTemplate[]
    /** 斜杠指令：`/id` 或 title */
    filter?: string
  }>(),
  {
    items: () => [],
    filter: '',
  },
)

const emit = defineEmits<{
  select: [item: PromptTemplate]
}>()

const ns = useNamespace('prompt-library')
const activeGroup = ref<string | 'all'>('all')

const groups = computed(() => {
  const set = new Set<string>()
  for (const item of props.items) {
    if (item.group) set.add(item.group)
  }
  return ['all', ...set]
})

const filtered = computed(() => {
  const keyword = props.filter.trim().replace(/^\//, '').toLowerCase()
  return props.items.filter((item) => {
    if (activeGroup.value !== 'all' && item.group !== activeGroup.value) {
      return false
    }
    if (!keyword) return true
    return (
      item.title.toLowerCase().includes(keyword) ||
      item.id.toLowerCase().includes(keyword) ||
      (item.description ?? '').toLowerCase().includes(keyword)
    )
  })
})
</script>

<template>
  <div :class="ns.b()">
    <div v-if="groups.length > 1" :class="ns.e('groups')">
      <button
        v-for="group in groups"
        :key="group"
        type="button"
        :class="[ns.e('group'), ns.is('active', activeGroup === group)]"
        @click="activeGroup = group"
      >
        {{ group === 'all' ? '全部' : group }}
      </button>
    </div>
    <ul :class="ns.e('list')">
      <li v-if="!filtered.length" :class="ns.e('empty')">暂无模板</li>
      <li
        v-for="item in filtered"
        :key="item.id"
        :class="ns.e('item')"
      >
        <button type="button" :class="ns.e('button')" @click="emit('select', item)">
          <div :class="ns.e('title')">{{ item.title }}</div>
          <div v-if="item.description" :class="ns.e('desc')">
            {{ item.description }}
          </div>
        </button>
      </li>
    </ul>
  </div>
</template>
