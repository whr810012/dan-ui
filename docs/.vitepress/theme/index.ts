import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import DanUI from '@dandan-ui/ui'
import '@dandan-ui/theme'
import DemoBlock from '../components/DemoBlock.vue'
import './custom.css'

const theme: Theme = {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.use(DanUI)
    app.component('DemoBlock', DemoBlock)
  },
}

export default theme
