<script setup lang="ts">
import { computed, ref } from 'vue'
import { DanCheckbox, DanCheckboxGroup } from '@dan-ui/ui'

const cities = ['上海', '北京', '广州', '深圳']
const checked = ref(['上海', '北京'])
const checkAll = computed({
  get: () => checked.value.length === cities.length,
  set: (val: boolean) => {
    checked.value = val ? [...cities] : []
  },
})
const indeterminate = computed(
  () => checked.value.length > 0 && checked.value.length < cities.length,
)
</script>

<template>
  <div style="display: grid; gap: 12px">
    <DanCheckbox v-model="checkAll" :indeterminate="indeterminate">
      全选
    </DanCheckbox>
    <DanCheckboxGroup v-model="checked">
      <DanCheckbox v-for="city in cities" :key="city" :label="city">
        {{ city }}
      </DanCheckbox>
    </DanCheckboxGroup>
  </div>
</template>
