export interface FormRule {
  required?: boolean
  message?: string
  trigger?: string | string[]
  min?: number
  max?: number
  pattern?: RegExp
  type?: 'string' | 'number' | 'boolean' | 'array'
  validator?: (
    rule: FormRule,
    value: unknown,
    callback: (error?: string | Error) => void,
  ) => void | Promise<void>
}

export type FormRules = Record<string, FormRule | FormRule[]>

function normalizeRules(rule?: FormRule | FormRule[]): FormRule[] {
  if (!rule) return []
  return Array.isArray(rule) ? rule : [rule]
}

function isEmpty(value: unknown) {
  if (value === undefined || value === null) return true
  if (typeof value === 'string' && value.trim() === '') return true
  if (Array.isArray(value) && value.length === 0) return true
  return false
}

export async function validateValue(
  value: unknown,
  ruleInput?: FormRule | FormRule[],
  trigger?: string,
): Promise<string[]> {
  const rules = normalizeRules(ruleInput).filter((rule) => {
    if (!trigger || !rule.trigger) return true
    const triggers = Array.isArray(rule.trigger) ? rule.trigger : [rule.trigger]
    return triggers.includes(trigger)
  })

  const errors: string[] = []

  for (const rule of rules) {
    if (rule.required && isEmpty(value)) {
      errors.push(rule.message || '必填项不能为空')
      continue
    }

    if (isEmpty(value) && !rule.required && !rule.validator) {
      continue
    }

    if (rule.type === 'array' && !Array.isArray(value)) {
      errors.push(rule.message || '类型应为数组')
      continue
    }

    if (rule.type === 'number' && typeof value !== 'number') {
      errors.push(rule.message || '类型应为数字')
      continue
    }

    if (typeof value === 'string') {
      if (rule.min != null && value.length < rule.min) {
        errors.push(rule.message || `长度不能少于 ${rule.min}`)
        continue
      }
      if (rule.max != null && value.length > rule.max) {
        errors.push(rule.message || `长度不能超过 ${rule.max}`)
        continue
      }
      if (rule.pattern && !rule.pattern.test(value)) {
        errors.push(rule.message || '格式不正确')
        continue
      }
    }

    if (Array.isArray(value)) {
      if (rule.min != null && value.length < rule.min) {
        errors.push(rule.message || `至少选择 ${rule.min} 项`)
        continue
      }
      if (rule.max != null && value.length > rule.max) {
        errors.push(rule.message || `最多选择 ${rule.max} 项`)
        continue
      }
    }

    if (rule.validator) {
      const message = await new Promise<string | undefined>((resolve) => {
        let settled = false
        const done = (error?: string | Error) => {
          if (settled) return
          settled = true
          if (!error) resolve(undefined)
          else resolve(typeof error === 'string' ? error : error.message)
        }
        try {
          const result = rule.validator?.(rule, value, done)
          if (result && typeof (result as Promise<void>).then === 'function') {
            ;(result as Promise<void>).then(() => done()).catch((err) => done(err))
          }
        } catch (err) {
          done(err as Error)
        }
      })
      if (message) errors.push(message)
    }
  }

  return errors
}
