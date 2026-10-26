import { withInstall } from '../../utils/withInstall'
import Form from './Form.vue'
import FormItem from './FormItem.vue'

export const DanForm = withInstall(Form, undefined, 'DanForm')
export const DanFormItem = withInstall(FormItem, undefined, 'DanFormItem')
export default DanForm
export type DanFormInstance = InstanceType<typeof Form>
export type DanFormItemInstance = InstanceType<typeof FormItem>
