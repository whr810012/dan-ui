<script setup lang="ts">
import { useNamespace } from '../../hooks/useNamespace'
import { DanIcon } from '../icon'
import './style.css'

defineOptions({ name: 'DanPageHeader' })

withDefaults(
  defineProps<{
    title?: string
    subtitle?: string
    /** 是否显示返回按钮 */
    showBack?: boolean
  }>(),
  {
    title: '',
    subtitle: '',
    showBack: true,
  },
)

const emit = defineEmits<{
  back: []
}>()

const ns = useNamespace('page-header')
</script>

<template>
  <div :class="ns.b()">
    <div v-if="$slots.breadcrumb" :class="ns.e('breadcrumb')">
      <slot name="breadcrumb" />
    </div>
    <div :class="ns.e('main')">
      <div :class="ns.e('heading')">
        <button
          v-if="showBack"
          type="button"
          :class="ns.e('back')"
          aria-label="返回"
          @click="emit('back')"
        >
          <DanIcon name="arrow-left" :size="16" />
        </button>
        <div :class="ns.e('titles')">
          <div :class="ns.e('title')">
            <slot name="title">{{ title }}</slot>
          </div>
          <div v-if="subtitle || $slots.subtitle" :class="ns.e('subtitle')">
            <slot name="subtitle">{{ subtitle }}</slot>
          </div>
        </div>
      </div>
      <div v-if="$slots.extra" :class="ns.e('extra')">
        <slot name="extra" />
      </div>
    </div>
    <div v-if="$slots.default" :class="ns.e('content')">
      <slot />
    </div>
  </div>
</template>
