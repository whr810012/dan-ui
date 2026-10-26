import { withInstall } from '../../utils/withInstall'
import Aside from './Aside.vue'
import Footer from './Footer.vue'
import Header from './Header.vue'
import Layout from './Layout.vue'
import Main from './Main.vue'

export const DanLayout = withInstall(Layout, undefined, 'DanLayout')
export const DanHeader = withInstall(Header, undefined, 'DanHeader')
export const DanAside = withInstall(Aside, undefined, 'DanAside')
export const DanMain = withInstall(Main, undefined, 'DanMain')
export const DanFooter = withInstall(Footer, undefined, 'DanFooter')

export default DanLayout
export type DanLayoutInstance = InstanceType<typeof Layout>
export type DanHeaderInstance = InstanceType<typeof Header>
export type DanAsideInstance = InstanceType<typeof Aside>
export type DanMainInstance = InstanceType<typeof Main>
export type DanFooterInstance = InstanceType<typeof Footer>
