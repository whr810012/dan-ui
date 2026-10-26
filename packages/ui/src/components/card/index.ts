import { withInstall } from '../../utils/withInstall'
import Card from './Card.vue'

export const DanCard = withInstall(Card, undefined, 'DanCard')
export default DanCard
export type DanCardInstance = InstanceType<typeof Card>
