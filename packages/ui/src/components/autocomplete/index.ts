import { withInstall } from '../../utils/withInstall'
import Autocomplete from './Autocomplete.vue'

export const DanAutocomplete = withInstall(
  Autocomplete,
  undefined,
  'DanAutocomplete',
)
export default DanAutocomplete
export type DanAutocompleteInstance = InstanceType<typeof Autocomplete>
export type { AutocompleteSuggestion } from './types'
