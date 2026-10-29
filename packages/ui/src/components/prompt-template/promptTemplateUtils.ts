/** 解析模板中的 {{name}} 变量名（去重保序） */
export function extractPromptVariables(template: string): string[] {
  const seen = new Set<string>()
  const names: string[] = []
  const re = /\{\{\s*([a-zA-Z_][\w]*)\s*\}\}/g
  let match: RegExpExecArray | null
  while ((match = re.exec(template))) {
    const name = match[1]!
    if (!seen.has(name)) {
      seen.add(name)
      names.push(name)
    }
  }
  return names
}

/** 用 values 替换 {{name}}；缺失时保留原占位或替换为空 */
export function renderPromptTemplate(
  template: string,
  values: Record<string, string>,
  options?: { keepMissing?: boolean },
): string {
  const keepMissing = options?.keepMissing ?? false
  return template.replace(/\{\{\s*([a-zA-Z_][\w]*)\s*\}\}/g, (full, name: string) => {
    if (Object.prototype.hasOwnProperty.call(values, name)) {
      return values[name] ?? ''
    }
    return keepMissing ? full : ''
  })
}
