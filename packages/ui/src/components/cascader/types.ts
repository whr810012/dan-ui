export interface CascaderOption {
  value: string | number
  label: string
  disabled?: boolean
  children?: CascaderOption[]
}

export type CascaderPath = Array<string | number>
/** 单选为一条路径；多选为路径数组 */
export type CascaderModelValue = CascaderPath | CascaderPath[] | null

