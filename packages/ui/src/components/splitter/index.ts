import type { App, Plugin } from 'vue'
import { withInstall } from '../../utils/withInstall'
import Splitter from './Splitter.vue'
import SplitterPanel from './SplitterPanel.vue'

export const DanSplitter = withInstall(Splitter, undefined, 'DanSplitter')
export const DanSplitterPanel = withInstall(
  SplitterPanel,
  undefined,
  'DanSplitterPanel',
)

const plugin: Plugin = {
  install(app: App) {
    app.component('DanSplitter', DanSplitter)
    app.component('DanSplitterPanel', DanSplitterPanel)
  },
}

export default plugin
export type DanSplitterInstance = InstanceType<typeof Splitter>
export type DanSplitterPanelInstance = InstanceType<typeof SplitterPanel>
