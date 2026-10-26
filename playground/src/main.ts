import { createApp } from 'vue'
import DanUI from '@dan-ui/ui'
import '@dan-ui/theme'
import App from './App.vue'

const app = createApp(App)
app.use(DanUI)
app.mount('#app')
