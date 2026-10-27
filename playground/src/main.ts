import { createApp } from 'vue'
import DanUI from '@dandan-ui/ui'
import '@dandan-ui/theme'
import App from './App.vue'

const app = createApp(App)
app.use(DanUI)
app.mount('#app')
