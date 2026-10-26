import { withInstall } from '../../utils/withInstall'
import Menu from './Menu.vue'
import MenuItem from './MenuItem.vue'
import SubMenu from './SubMenu.vue'

export const DanMenu = withInstall(
  Menu,
  { DanMenuItem: MenuItem, DanSubMenu: SubMenu },
  'DanMenu',
)
export const DanMenuItem = withInstall(MenuItem, undefined, 'DanMenuItem')
export const DanSubMenu = withInstall(SubMenu, undefined, 'DanSubMenu')

export default DanMenu
export type DanMenuInstance = InstanceType<typeof Menu>
export type DanMenuItemInstance = InstanceType<typeof MenuItem>
export type DanSubMenuInstance = InstanceType<typeof SubMenu>
