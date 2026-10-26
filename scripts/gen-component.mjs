#!/usr/bin/env node
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')

function toPascalCase(input) {
  return input
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('')
}

function toKebabCase(input) {
  return input
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/[_\s]+/g, '-')
    .toLowerCase()
}

const rawName = process.argv[2]
if (!rawName) {
  console.error('Usage: pnpm gen <component-name>')
  console.error('Example: pnpm gen button')
  process.exit(1)
}

const kebab = toKebabCase(rawName)
const pascal = toPascalCase(kebab)
const exportName = `Dan${pascal}`
const blockName = kebab

const componentDir = join(root, 'packages/ui/src/components', kebab)
const vueFile = join(componentDir, `${pascal}.vue`)
const styleFile = join(componentDir, 'style.css')
const indexFile = join(componentDir, 'index.ts')
const componentsBarrel = join(root, 'packages/ui/src/components/index.ts')
const docFile = join(root, 'docs/components', `${kebab}.md`)
const demoDir = join(root, 'docs/components/demos', kebab)
const demoFile = join(demoDir, 'basic.vue')

if (existsSync(componentDir)) {
  console.error(`[gen] Component already exists: ${componentDir}`)
  process.exit(1)
}

mkdirSync(componentDir, { recursive: true })
mkdirSync(demoDir, { recursive: true })

writeFileSync(
  vueFile,
  `<script setup lang="ts">
import { useNamespace } from '../../hooks/useNamespace'
import './style.css'

defineOptions({ name: '${exportName}' })

const ns = useNamespace('${blockName}')
</script>

<template>
  <div :class="ns.b()">
    <slot />
  </div>
</template>
`,
)

writeFileSync(
  styleFile,
  `.dan-${blockName} {
  /* TODO: styles */
}
`,
)

writeFileSync(
  indexFile,
  `import { withInstall } from '../../utils/withInstall'
import ${pascal} from './${pascal}.vue'

export const ${exportName} = withInstall(${pascal}, undefined, '${exportName}')
export default ${exportName}
export type ${exportName}Instance = InstanceType<typeof ${pascal}>
`,
)

writeFileSync(
  demoFile,
  `<script setup lang="ts">
import { ${exportName} } from '@dan-ui/ui'
</script>

<template>
  <${exportName}>${pascal}</${exportName}>
</template>
`,
)

writeFileSync(
  docFile,
  `# ${exportName}

## 何时使用

在需要 ${pascal} 能力时使用。

## 基础用法

<<< @/components/demos/${kebab}/basic.vue

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| — | — | — | — |

### Events

| 事件名 | 说明 | 参数 |
|--------|------|------|
| — | — | — |

### Slots

| 插槽名 | 说明 |
|--------|------|
| default | 默认内容 |

### Token

继承全局 \`@dan-ui/theme\` CSS 变量。
`,
)

// Update components barrel
let barrel = readFileSync(componentsBarrel, 'utf8')
if (barrel.includes('export {}')) {
  barrel = ''
}
const exportLine = `export { ${exportName} } from './${kebab}'\n`
if (!barrel.includes(exportLine)) {
  barrel = `${barrel.trimEnd()}\n${exportLine}`.replace(/^\n+/, '')
  writeFileSync(
    componentsBarrel,
    barrel.endsWith('\n') ? barrel : `${barrel}\n`,
  )
}

console.log(`[gen] created ${exportName}`)
console.log(`  - packages/ui/src/components/${kebab}/`)
console.log(`  - docs/components/${kebab}.md`)
console.log(`  - docs/components/demos/${kebab}/basic.vue`)
console.log(
  '  Remember: packages/ui/src/index.ts already re-exports ./components',
)
