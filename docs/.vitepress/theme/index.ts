import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import DanUI from '@dan-ui/ui'
import '@dan-ui/theme'

const theme: Theme = {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.use(DanUI)
  },
}

export default theme
