<script setup>
import { computed, reactive, ref } from 'vue'
import {
  DanAside,
  DanButton,
  DanForm,
  DanFormItem,
  DanHeader,
  DanInput,
  DanLayout,
  DanMain,
  DanMenu,
  DanMenuItem,
  DanSelect,
  DanTable,
} from '@dandan-ui/ui'

const active = ref('users')
const query = reactive({ keyword: '', role: '' })

const columns = [
  { prop: 'name', label: '姓名', minWidth: 100 },
  { prop: 'role', label: '角色', width: 100 },
  { prop: 'city', label: '城市', minWidth: 100 },
]

const allRows = [
  { id: 1, name: '张三', role: 'admin', city: '上海' },
  { id: 2, name: '李四', role: 'member', city: '杭州' },
  { id: 3, name: '王五', role: 'member', city: '北京' },
]

const roleOptions = [
  { label: '全部', value: '' },
  { label: '管理', value: 'admin' },
  { label: '成员', value: 'member' },
]

const rows = computed(() =>
  allRows.filter((row) => {
    const hitKeyword = !query.keyword || row.name.includes(query.keyword.trim())
    const hitRole = !query.role || row.role === query.role
    return hitKeyword && hitRole
  }),
)

function reset() {
  query.keyword = ''
  query.role = ''
}
</script>

<template>
  <div style="height: 420px; border: 1px solid var(--dan-color-border)">
    <DanLayout style="height: 100%">
      <DanAside width="160px">
        <DanMenu v-model="active" style="border-right: 0">
          <DanMenuItem index="users">用户</DanMenuItem>
          <DanMenuItem index="settings">设置</DanMenuItem>
        </DanMenu>
      </DanAside>
      <DanLayout>
        <DanHeader height="48px">
          <strong>用户管理</strong>
        </DanHeader>
        <DanMain style="padding: 16px; overflow: auto">
          <DanForm
            :model="query"
            label-width="48px"
            style="
              display: flex;
              flex-wrap: wrap;
              gap: 8px 16px;
              align-items: flex-end;
              margin-bottom: 12px;
            "
          >
            <DanFormItem label="姓名">
              <DanInput
                v-model="query.keyword"
                placeholder="搜索姓名"
                clearable
                style="width: 160px"
              />
            </DanFormItem>
            <DanFormItem label="角色">
              <DanSelect
                v-model="query.role"
                :options="roleOptions"
                style="width: 120px"
              />
            </DanFormItem>
            <DanFormItem>
              <DanButton @click="reset">重置</DanButton>
            </DanFormItem>
          </DanForm>
          <DanTable :columns="columns" :data="rows" border stripe />
        </DanMain>
      </DanLayout>
    </DanLayout>
  </div>
</template>
