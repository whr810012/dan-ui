import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

const srcRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const read = (relative: string) =>
  readFileSync(resolve(srcRoot, relative), 'utf8')

const mojibakeMarkers = ['\uFFFD', '锟斤拷', 'ï¿½']

const overlayComponents = [
  ['autocomplete/Autocomplete.vue', '清除'],
  ['date-picker/DatePicker.vue', '日期面板'],
  ['input-number/InputNumber.vue', '减少'],
  ['input-tag/InputTag.vue', '清空'],
  ['select/Select.vue', '远程搜索'],
  ['textarea/Textarea.vue', '展示字数统计'],
  ['time-picker/TimePicker.vue', '选择时间'],
  ['time-select/TimeSelect.vue', '无可用时间'],
] as const

const popperPanels = [
  'autocomplete',
  'cascader',
  'date-picker',
  'select',
  'time-picker',
  'time-select',
  'tree-select',
]

const reducedMotionSelectors = [
  '.dan-select__dropdown',
  '.dan-date-picker__panel',
  '.dan-cascader__panel',
  '.dan-time-picker__panel',
  '.dan-time-select__panel',
  '.dan-autocomplete__panel',
  '.dan-tree-select__panel',
]

describe('popper polish regression', () => {
  describe('form overlay copy', () => {
    it.each(overlayComponents)(
      '%s keeps readable Chinese copy',
      (file, expected) => {
        const source = read(`components/${file}`)
        expect(source).toContain(expected)
        for (const marker of mojibakeMarkers) {
          expect(source).not.toContain(marker)
        }
      },
    )
  })

  it('ships the shared pop animation from the package entry', () => {
    expect(read('index.ts')).toContain("import './styles/animations.css'")

    const css = read('styles/animations.css')
    expect(css).toContain('@keyframes dan-pop')
    expect(css).toContain('prefers-reduced-motion: reduce')
    for (const selector of reducedMotionSelectors) {
      expect(css).toContain(selector)
    }
  })

  it('applies the shared animation to every popper panel', () => {
    for (const panel of popperPanels) {
      expect(read(`components/${panel}/style.css`)).toContain(
        'animation: dan-pop',
      )
    }
  })
})
