<script setup>
import { ref } from 'vue'
import { DanSelect } from '@dandan-ui/ui'

const value = ref(null)
const options = ref([])
const loading = ref(false)

const source = [
  { label: '上海', value: 'sh' },
  { label: '北京', value: 'bj' },
  { label: '深圳', value: 'sz' },
  { label: '杭州', value: 'hz' },
  { label: '成都', value: 'cd' },
]

function remoteMethod(query) {
  loading.value = true
  window.setTimeout(() => {
    const q = String(query || '').trim().toLowerCase()
    options.value = q
      ? source.filter((item) => item.label.toLowerCase().includes(q))
      : source.slice(0, 3)
    loading.value = false
  }, 280)
}
</script>

<template>
  <DanSelect
    v-model="value"
    :options="options"
    remote
    :remote-method="remoteMethod"
    :loading="loading"
    clearable
    placeholder="输入城市名搜索"
    style="width: 260px"
  />
</template>
