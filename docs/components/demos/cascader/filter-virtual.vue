<script setup>
import { ref } from 'vue'
import { DanCascader, DanSpace } from '@dandan-ui/ui'

const value = ref(null)

const cities = Array.from({ length: 40 }, (_, i) => ({
  value: `c-${i}`,
  label: `城市 ${i + 1}`,
}))

const options = [
  {
    value: 'east',
    label: '华东',
    children: cities,
  },
  {
    value: 'north',
    label: '华北',
    children: [
      { value: 'beijing', label: '北京' },
      { value: 'tianjin', label: '天津' },
    ],
  },
]
</script>

<template>
  <DanSpace direction="vertical" style="width: 100%">
    <DanCascader
      v-model="value"
      :options="options"
      filterable
      virtual
      clearable
      placeholder="可搜索 + 长列表虚拟"
    />
    <span style="color: var(--dan-color-text-secondary); font-size: 13px">
      当前：{{ value ? value.join(' / ') : '未选择' }}
    </span>
  </DanSpace>
</template>
