/** Official docs site (Hub proxy). No trailing slash. */
export const SITE_ORIGIN = 'https://dandanhub.vip'
export const SITE_BASE = '/dan-ui'
export const SITE_URL = `${SITE_ORIGIN}${SITE_BASE}`

export const SITE_NAME = 'dan-ui'
export const SITE_DESCRIPTION =
  'Vue 3 通用 UI 组件库：中后台表单与表格、反馈浮层、AI 对话界面与富文本，npm 包 @dandan-ui/ui / @dandan-ui/theme。'

export const PRODUCT_DEFINITION = `dan-ui 是一套面向中后台与 AI 应用界面的 Vue 3 组件库。npm 包名为 @dandan-ui/ui 与 @dandan-ui/theme，官方文档位于 ${SITE_URL}/。它提供 Layout/Form/Table 等通用组件，以及 Chat、RichText 等界面组件；不内置大模型 SDK，也不绑定云厂商上传 SDK。`

export function pageUrl(relativePath: string): string {
  if (!relativePath || relativePath === 'index.md') {
    return `${SITE_URL}/`
  }
  let path = relativePath.replace(/\\/g, '/').replace(/\.md$/, '')
  if (path.endsWith('/index')) path = path.slice(0, -'/index'.length)
  return `${SITE_URL}/${path}`
}

export function pageTitle(
  title: string | undefined,
  isHome = false,
): string {
  if (isHome) return `${SITE_NAME} · Vue 3 组件库`
  if (!title) return SITE_NAME
  if (title.includes(SITE_NAME)) return title
  return `${title} · ${SITE_NAME}`
}

export type HeadTuple =
  | [string, Record<string, string>]
  | [string, Record<string, string>, string]

export function socialHead(options: {
  title: string
  description: string
  url: string
}): HeadTuple[] {
  const { title, description, url } = options
  return [
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: SITE_NAME }],
    ['meta', { property: 'og:title', content: title }],
    ['meta', { property: 'og:description', content: description }],
    ['meta', { property: 'og:url', content: url }],
    ['meta', { property: 'og:locale', content: 'zh_CN' }],
    ['meta', { name: 'twitter:card', content: 'summary' }],
    ['meta', { name: 'twitter:title', content: title }],
    ['meta', { name: 'twitter:description', content: description }],
    ['link', { rel: 'canonical', href: url }],
  ]
}

export function jsonLdScript(data: Record<string, unknown>): HeadTuple {
  return [
    'script',
    { type: 'application/ld+json' },
    JSON.stringify(data),
  ]
}

export function homeJsonLd(): HeadTuple[] {
  return [
    jsonLdScript({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_NAME,
      url: `${SITE_URL}/`,
      description: SITE_DESCRIPTION,
      inLanguage: 'zh-CN',
    }),
    jsonLdScript({
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: SITE_NAME,
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Web',
      url: `${SITE_URL}/`,
      description: SITE_DESCRIPTION,
      downloadUrl: 'https://www.npmjs.com/package/@dandan-ui/ui',
      softwareVersion: '1.4.0',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      author: {
        '@type': 'Organization',
        name: 'dan-ui',
        url: SITE_ORIGIN,
      },
    }),
  ]
}

export function techArticleJsonLd(options: {
  title: string
  description: string
  url: string
}): HeadTuple {
  return jsonLdScript({
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: options.title,
    description: options.description,
    url: options.url,
    inLanguage: 'zh-CN',
    author: {
      '@type': 'Organization',
      name: SITE_NAME,
    },
  })
}

export const FAQ_ITEMS: Array<{ q: string; a: string }> = [
  {
    q: '如何安装 dan-ui？',
    a: '使用 pnpm add @dandan-ui/ui @dandan-ui/theme，并在入口引入 @dandan-ui/theme 与 @dandan-ui/ui/style.css，再 app.use(DanUI) 或按需导入组件。',
  },
  {
    q: 'dan-ui 支持按需引入吗？',
    a: '支持。可配合 unplugin-vue-components 使用 DanUIResolver；按需时仍需引入主题与样式。',
  },
  {
    q: '如何定制主题与暗色？',
    a: '覆盖 --dan-* CSS 变量，或使用 DanConfigProvider 的 theme；根节点加 class="dark" 或 data-theme="dark" 启用内置暗色 Token。',
  },
  {
    q: 'AI 组件是否内置大模型？',
    a: '不内置。Chat 等组件只提供界面、事件与插槽，SSE/WebSocket 与模型调用由业务侧完成。',
  },
  {
    q: 'npm 包名与文档地址是什么？',
    a: `包名为 @dandan-ui/ui 与 @dandan-ui/theme；官方文档为 ${SITE_URL}/。`,
  },
]

export function faqJsonLd(): HeadTuple {
  return jsonLdScript({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  })
}
