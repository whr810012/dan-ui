/** Minimal HTML sanitizer for markdown output (strips script/style and on* handlers). */
export function sanitizeHtml(html: string): string {
  return html
    .replace(/<(script|style)[\s\S]*?>[\s\S]*?<\/\1>/gi, '')
    .replace(/\son\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, '')
    .replace(/javascript:/gi, '')
}
