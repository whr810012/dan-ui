<script setup>
import { ref } from 'vue'
import { DanButton, DanMessage, DanSpace, DanTable } from '@dandan-ui/ui'

const tableRef = ref()
const loading = ref(false)
const data = ref([
  { id: 1, name: 'Ada', score: 96 },
  { id: 2, name: 'Grace', score: 88 },
  { id: 3, name: 'Alan', score: 91 },
])
const columns = [
  { prop: 'name', label: '姓名', sortable: true },
  { prop: 'score', label: '分数', sortable: true },
]

function reload() {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 800)
}

function onExport(csv) {
  DanMessage.success(`已导出 ${csv.split('\n').length - 1} 行`)
}
</script>

<template>
  <DanSpace direction="vertical" style="width: 100%">
    <DanSpace>
      <DanButton size="small" @click="reload">模拟加载</DanButton>
      <DanButton size="small" type="primary" @click="tableRef?.exportCsv()">
        导出 CSV
      </DanButton>
    </DanSpace>
    <DanTable
      ref="tableRef"
      :data="data"
      :columns="columns"
      :loading="loading"
      multi-sort
      @export-csv="onExport"
    />
    <p style="margin: 0; color: var(--dan-color-text-secondary); font-size: 13px">
      开启 multi-sort 后，按住 Shift 点击表头可叠加多列排序。
    </p>
  </DanSpace>
</template>
