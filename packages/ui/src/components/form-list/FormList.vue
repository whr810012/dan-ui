<script setup lang="ts">
import { computed, inject } from 'vue'
import { formContextKey } from '../../hooks/useFormContext'
import { useNamespace } from '../../hooks/useNamespace'
import { useLocale } from '../../locale'
import { getByPath, setByPath } from '../../utils/path'
import { DanButton } from '../button'
import './style.css'

defineOptions({ name: 'DanFormList' })

const props = withDefaults(
  defineProps<{
    /** 对应 model 上的数组路径，如 `users` */
    prop: string
    addText?: string
    /** 新增行的工厂函数 */
    createItem?: () => Record<string, unknown>
  }>(),
  {},
)

const { t } = useLocale()
const resolvedAddText = computed(() => props.addText ?? t('formList.add'))

const form = inject(formContextKey, undefined)
const ns = useNamespace('form-list')

const list = computed({
  get(): Record<string, unknown>[] {
    if (!form) return []
    const value = getByPath(form.model.value, props.prop)
    return Array.isArray(value) ? (value as Record<string, unknown>[]) : []
  },
  set(next: Record<string, unknown>[]) {
    if (!form) return
    setByPath(form.model.value, props.prop, next)
  },
})

function add() {
  const item = props.createItem ? props.createItem() : {}
  list.value = [...list.value, item]
}

function remove(index: number) {
  const next = [...list.value]
  next.splice(index, 1)
  list.value = next
}
</script>

<template>
  <div :class="ns.b()">
    <div
      v-for="(row, index) in list"
      :key="index"
      :class="ns.e('item')"
    >
      <div :class="ns.e('fields')">
        <slot :row="row" :index="index" :remove="() => remove(index)" />
      </div>
      <DanButton
        size="small"
        type="danger"
        text
        :class="ns.e('remove')"
        @click="remove(index)"
      >
        {{ t('formList.remove') }}
      </DanButton>
    </div>
    <DanButton size="small" :class="ns.e('add')" @click="add">
      {{ resolvedAddText }}
    </DanButton>
  </div>
</template>
