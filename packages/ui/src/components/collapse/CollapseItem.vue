<script setup lang="ts">
import { computed, inject } from 'vue'
import { useNamespace } from '../../hooks/useNamespace'
import { DanIcon } from '../icon'
import { collapseContextKey } from './collapseContext'
import './style.css'

defineOptions({ name: 'DanCollapseItem' })

const props = withDefaults(
  defineProps<{
    title?: string
    name?: string | number
    disabled?: boolean
  }>(),
  {
    title: '',
    disabled: false,
  },
)

const ns = useNamespace('collapse-item')
const collapse = inject(collapseContextKey)

const itemName = computed(() => props.name ?? props.title)

const isActive = computed(() =>
  collapse ? collapse.activeNames.value.includes(itemName.value) : false,
)

function onClick() {
  if (props.disabled || !collapse) return
  collapse.toggle(itemName.value)
}
</script>

<template>
  <div
    :class="[ns.b(), ns.is('active', isActive), ns.is('disabled', disabled)]"
  >
    <button
      type="button"
      :class="ns.e('header')"
      :disabled="disabled"
      :aria-expanded="isActive"
      @click="onClick"
    >
      <span :class="ns.e('title')">
        <slot name="title">{{ title }}</slot>
      </span>
      <DanIcon
        name="chevron-down"
        :class="[ns.e('arrow'), ns.is('active', isActive)]"
      />
    </button>
    <div v-if="isActive" :class="ns.e('wrap')">
      <div :class="ns.e('content')">
        <slot />
      </div>
    </div>
  </div>
</template>
