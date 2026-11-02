<script setup lang="ts">
import { computed } from 'vue'
import { useNamespace } from '../../hooks/useNamespace'
import { injectMenu } from './menuContext'
import './style.css'

defineOptions({ name: 'DanSubMenu' })

const props = withDefaults(
  defineProps<{
    index: string
    title?: string
    disabled?: boolean
  }>(),
  {
    title: '',
    disabled: false,
  },
)

const ns = useNamespace('sub-menu')
const menu = injectMenu()
const opened = computed(() => menu.openedMenus.value.includes(props.index))
const showList = computed(() => opened.value && !menu.collapse.value)
const isHorizontal = computed(() => menu.mode.value === 'horizontal')

function onTitleClick() {
  if (props.disabled) return
  menu.toggleOpen(props.index)
}
</script>

<template>
  <li
    :class="[ns.b(), ns.is('opened', opened), ns.is('disabled', disabled)]"
    role="none"
  >
    <div
      :class="ns.e('title')"
      role="menuitem"
      :tabindex="disabled ? -1 : 0"
      :aria-expanded="opened"
      :aria-disabled="disabled || undefined"
      @click="onTitleClick"
      @keydown.enter.prevent="onTitleClick"
      @keydown.space.prevent="onTitleClick"
    >
      <slot name="title">{{ title }}</slot>
      <span :class="ns.e('arrow')" aria-hidden="true" />
    </div>
    <div
      v-if="!isHorizontal"
      :class="[ns.e('collapse'), ns.is('expanded', showList)]"
    >
      <div :class="ns.e('collapse-inner')">
        <ul :class="ns.e('list')" role="menu">
          <slot />
        </ul>
      </div>
    </div>
    <Transition v-else name="dan-sub-menu-fade">
      <ul v-show="showList" :class="ns.e('list')" role="menu">
        <slot />
      </ul>
    </Transition>
  </li>
</template>
