import { withInstall } from '../../utils/withInstall'
import Suggestion from './Suggestion.vue'

export const DanSuggestion = withInstall(Suggestion, undefined, 'DanSuggestion')
export default DanSuggestion
export type DanSuggestionInstance = InstanceType<typeof Suggestion>
