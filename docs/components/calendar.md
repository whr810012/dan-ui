<script setup>
import DemoBlock from '../.vitepress/components/DemoBlock.vue'
import Basic from './demos/calendar/basic.vue'
import basicSrc from './demos/calendar/basic.vue?raw'
</script>

# Calendar 日历

月视图选择日期。

## 基础用法

<DemoBlock :source="basicSrc">
  <Basic />
</DemoBlock>
