<script setup>
import { ref } from 'vue'
import { DanSelect, DanSpace } from '@dandan-ui/ui'

const value = ref(['sh', 'bj', 'hz'])
const options = [
  { label: '上海', value: 'sh' },
  { label: '北京', value: 'bj' },
  { label: '杭州', value: 'hz' },
  { label: '成都', value: 'cd' },
]
</script>

<template>
  <DanSpace direction="vertical" style="width: 100%">
    <DanSelect
      v-model="value"
      multiple
      filterable
      collapse-tags
      :options="options"
      placeholder="默认折叠为 1 个标签"
    />
    <DanSelect
      v-model="value"
      multiple
      collapse-tags
      :max-collapse-tags="2"
      :options="options"
      placeholder="最多展示 2 个标签"
    />
  </DanSpace>
</template>
