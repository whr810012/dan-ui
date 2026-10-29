<script setup>
import { computed, ref } from 'vue'
import {
  DanAside,
  DanAvatar,
  DanButton,
  DanDropdown,
  DanDropdownItem,
  DanDropdownMenu,
  DanHeader,
  DanIcon,
  DanInput,
  DanLayout,
  DanMain,
  DanMenu,
  DanMenuItem,
  DanSubMenu,
  DanTag,
} from '@dandan-ui/ui'

/** 演示用：不接后端的「会话 / 权限」壳 */
const session = ref(null)

const catalog = [
  {
    index: 'dashboard',
    label: '工作台',
    icon: 'home',
    permission: 'dashboard:view',
  },
  {
    index: 'users',
    label: '用户',
    icon: 'user',
    permission: 'user:list',
  },
  {
    index: 'settings',
    label: '设置',
    icon: 'setting',
    permission: 'settings:view',
    children: [
      { index: 'profile', label: '个人资料', permission: 'settings:view' },
      { index: 'security', label: '安全', permission: 'settings:security' },
    ],
  },
]

const roles = {
  admin: ['dashboard:view', 'user:list', 'settings:view', 'settings:security'],
  editor: ['dashboard:view', 'user:list', 'settings:view'],
  viewer: ['dashboard:view'],
}

const active = ref('dashboard')
const username = ref('admin')
const password = ref('demo')

const menus = computed(() => {
  if (!session.value) return []
  const perms = new Set(session.value.permissions)
  return catalog
    .filter((item) => perms.has(item.permission))
    .map((item) => ({
      ...item,
      children: item.children?.filter((c) => perms.has(c.permission)),
    }))
})

const pageTitle = computed(() => {
  for (const item of menus.value) {
    if (item.index === active.value) return item.label
    const child = item.children?.find((c) => c.index === active.value)
    if (child) return `${item.label} / ${child.label}`
  }
  return '工作台'
})

function loginAs(role) {
  session.value = {
    name: role === 'admin' ? '管理员' : role === 'editor' ? '编辑' : '访客',
    role,
    permissions: roles[role],
  }
  active.value = menus.value[0]?.index ?? 'dashboard'
}

function onLogin() {
  if (!username.value.trim()) return
  const role = username.value.includes('view')
    ? 'viewer'
    : username.value.includes('edit')
      ? 'editor'
      : 'admin'
  loginAs(role)
}

function logout() {
  session.value = null
  password.value = 'demo'
}
</script>

<template>
  <div
    style="
      height: 480px;
      border: 1px solid var(--dan-color-border);
      border-radius: var(--dan-radius-md);
      overflow: hidden;
      background: var(--dan-color-bg);
    "
  >
    <!-- 未登录：登录壳 -->
    <div
      v-if="!session"
      style="
        height: 100%;
        display: grid;
        place-items: center;
        padding: 24px;
        background: linear-gradient(
          160deg,
          var(--dan-color-fill) 0%,
          var(--dan-color-bg) 45%
        );
      "
    >
      <div style="width: min(360px, 100%); display: grid; gap: 12px">
        <div>
          <div style="font-size: 20px; font-weight: 600">dan-ui Admin 壳</div>
          <div
            style="
              margin-top: 4px;
              color: var(--dan-color-text-secondary);
              font-size: 13px;
            "
          >
            演示登录与权限菜单（不请求后端）。用户名含 edit / view 切换角色。
          </div>
        </div>
        <DanInput v-model="username" placeholder="用户名，如 admin / editor / viewer" />
        <DanInput v-model="password" type="password" placeholder="任意密码" />
        <DanButton type="primary" style="width: 100%" @click="onLogin">
          登录
        </DanButton>
        <div style="display: flex; flex-wrap: wrap; gap: 8px">
          <DanButton size="small" @click="loginAs('admin')">一键管理员</DanButton>
          <DanButton size="small" @click="loginAs('editor')">一键编辑</DanButton>
          <DanButton size="small" @click="loginAs('viewer')">一键访客</DanButton>
        </div>
      </div>
    </div>

    <!-- 已登录：Layout + 权限菜单 -->
    <DanLayout v-else style="height: 100%">
      <DanAside
        width="200px"
        style="border-right: 1px solid var(--dan-color-border)"
      >
        <div
          style="
            padding: 14px 16px;
            font-weight: 600;
            border-bottom: 1px solid var(--dan-color-border-light);
          "
        >
          Acme Admin
        </div>
        <DanMenu v-model="active" style="border-right: 0">
          <template v-for="item in menus" :key="item.index">
            <DanSubMenu v-if="item.children?.length" :index="item.index">
              <template #title>
                <span style="display: inline-flex; gap: 8px; align-items: center">
                  <DanIcon :name="item.icon" />
                  {{ item.label }}
                </span>
              </template>
              <DanMenuItem
                v-for="child in item.children"
                :key="child.index"
                :index="child.index"
              >
                {{ child.label }}
              </DanMenuItem>
            </DanSubMenu>
            <DanMenuItem v-else :index="item.index">
              <span style="display: inline-flex; gap: 8px; align-items: center">
                <DanIcon :name="item.icon" />
                {{ item.label }}
              </span>
            </DanMenuItem>
          </template>
        </DanMenu>
      </DanAside>

      <DanLayout>
        <DanHeader
          height="52px"
          style="
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 16px;
            border-bottom: 1px solid var(--dan-color-border);
          "
        >
          <strong>{{ pageTitle }}</strong>
          <div style="display: flex; align-items: center; gap: 10px">
            <DanTag size="small">{{ session.role }}</DanTag>
            <DanDropdown @command="(cmd) => cmd === 'logout' && logout()">
              <span
                style="
                  display: inline-flex;
                  align-items: center;
                  gap: 8px;
                  cursor: pointer;
                "
              >
                <DanAvatar size="small">{{ session.name.slice(0, 1) }}</DanAvatar>
                {{ session.name }}
              </span>
              <template #dropdown>
                <DanDropdownMenu>
                  <DanDropdownItem command="logout">退出登录</DanDropdownItem>
                </DanDropdownMenu>
              </template>
            </DanDropdown>
          </div>
        </DanHeader>
        <DanMain style="padding: 16px; overflow: auto">
          <p style="margin: 0 0 8px; color: var(--dan-color-text-secondary)">
            当前路由占位：<code>{{ active }}</code>
          </p>
          <p style="margin: 0; line-height: 1.6">
            菜单由 <code>permission</code> 过滤。业务侧把 permissions
            换成接口返回即可，dan-ui 只提供 Layout / Menu / 表单表格等壳。
          </p>
          <ul style="margin: 12px 0 0; padding-left: 18px; color: var(--dan-color-text-secondary)">
            <li v-for="p in session.permissions" :key="p">{{ p }}</li>
          </ul>
        </DanMain>
      </DanLayout>
    </DanLayout>
  </div>
</template>
