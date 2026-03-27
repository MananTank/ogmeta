import type { NextRequest } from 'next/server'

/** Escape text for HTML text nodes (title, body). */
export function escapeHtmlText(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

/** Escape for double-quoted HTML attributes (e.g. meta content). */
export function escapeHtmlAttr(s: string): string {
  return escapeHtmlText(s).replace(/"/g, '&quot;')
}

export function metaProperty(property: string, content: string): string {
  return `<meta property="${escapeHtmlAttr(property)}" content="${escapeHtmlAttr(content)}">`
}

export function metaName(name: string, content: string): string {
  return `<meta name="${escapeHtmlAttr(name)}" content="${escapeHtmlAttr(content)}">`
}

export type Content = 'none' | 'short' | 'long'

/** Standard aspect ratios; `relative`, `broken`, and `multiple` support extra fixture cases. */
export type Image =
  | 'none'
  | '1/1'
  | '1200/630'
  | 'relative'
  | 'broken'
  | 'multiple'

export type OGType = 'website' | 'article'

export type TwitterCardType = 'summary' | 'summary_large_image' | 'none'

export type OgTestHtmlOptions = {
  title: Content
  desc: Content
  og: {
    title: Content
    desc: Content
    image: Image
    type: OGType
    url?: string
  }
  twitter: {
    title: Content
    card: TwitterCardType
    description: Content
    url?: string
  }
}

export const SHORT_TITLE = 'Sample short title'
export const SHORT_DESCRIPTION = 'Sample short description for the fixture.'

export const LONG_OG_TITLE =
  'This is an intentionally long Open Graph title used to test truncation and layout in previews. '
    .repeat(5)
    .trim()

export const LONG_OG_DESCRIPTION =
  'This is an intentionally long Open Graph description used to test truncation in link previews across platforms. '
    .repeat(12)
    .trim()

function resolveContent(
  kind: 'title' | 'description',
  c: Content
): string | null {
  if (c === 'none') return null
  if (c === 'short') {
    return kind === 'title' ? SHORT_TITLE : SHORT_DESCRIPTION
  }
  return kind === 'title' ? LONG_OG_TITLE : LONG_OG_DESCRIPTION
}

function hasAnyOg(og: OgTestHtmlOptions['og']): boolean {
  return og.title !== 'none' || og.desc !== 'none' || og.image !== 'none'
}

function absoluteOgImageUrl(origin: string, image: Image): string | null {
  switch (image) {
    case 'none':
      return null
    case '1/1':
      return `${origin}/og-test/square-1200x1200.jpg`
    case '1200/630':
      return `${origin}/og-test/rect-1200x630.jpg`
    case 'relative':
      return '/og-test/rect-1200x630.jpg'
    case 'broken':
      return `${origin}/og-test/this-file-does-not-exist-ogmeta.png`
    case 'multiple':
      return null
    default:
      return null
  }
}

/** First og:image URL for Twitter when og:image is multiple or relative. */
function twitterImageUrl(origin: string, og: OgTestHtmlOptions['og']): string {
  if (og.image === 'none') {
    return `${origin}/og-test/rect-1200x630.jpg`
  }
  if (og.image === 'relative') {
    return `${origin}/og-test/rect-1200x630.jpg`
  }
  if (og.image === 'broken') {
    return `${origin}/og-test/this-file-does-not-exist-ogmeta.png`
  }
  if (og.image === 'multiple') {
    return `${origin}/og-test/rect-1200x630.jpg`
  }
  const abs = absoluteOgImageUrl(origin, og.image)
  if (abs) return abs.startsWith('http') ? abs : new URL(abs, origin).href
  return `${origin}/og-test/rect-1200x630.jpg`
}

function buildHeadExtra(
  origin: string,
  path: string,
  options: OgTestHtmlOptions
): string[] {
  const lines: string[] = []

  const htmlDesc = resolveContent('description', options.desc)
  if (htmlDesc) {
    lines.push(metaName('description', htmlDesc))
  }

  const ogUrl = options.og.url ?? `${origin}${path}`

  if (hasAnyOg(options.og)) {
    const ogTitle = resolveContent('title', options.og.title)
    if (ogTitle) lines.push(metaProperty('og:title', ogTitle))

    const ogDesc = resolveContent('description', options.og.desc)
    if (ogDesc) lines.push(metaProperty('og:description', ogDesc))

    if (options.og.image === 'multiple') {
      lines.push(
        metaProperty('og:image', `${origin}/og-test/rect-1200x630.jpg`)
      )
      lines.push(
        metaProperty('og:image', `${origin}/og-test/second-800x600.jpg`)
      )
    } else if (options.og.image !== 'none') {
      const url = absoluteOgImageUrl(origin, options.og.image)
      if (url) lines.push(metaProperty('og:image', url))
    }

    lines.push(metaProperty('og:type', options.og.type))
    lines.push(metaProperty('og:url', ogUrl))
    lines.push(metaProperty('og:site_name', 'OG Meta Fixtures'))
  }

  if (options.twitter.card !== 'none') {
    lines.push(metaName('twitter:card', options.twitter.card))
    const twTitle = resolveContent('title', options.twitter.title)
    if (twTitle) lines.push(metaName('twitter:title', twTitle))
    const twDesc = resolveContent('description', options.twitter.description)
    if (twDesc) lines.push(metaName('twitter:description', twDesc))
    lines.push(metaName('twitter:image', twitterImageUrl(origin, options.og)))
    if (options.twitter.url) {
      lines.push(metaName('twitter:url', options.twitter.url))
    }
  }

  return lines
}

function visibleTitle(options: OgTestHtmlOptions): string {
  const t = resolveContent('title', options.title)
  if (t) return t
  return 'Untitled fixture'
}

export function ogTestHtml(
  request: NextRequest,
  path: string,
  options: OgTestHtmlOptions
): Response {
  const origin = request.nextUrl.origin
  const headExtra = buildHeadExtra(origin, path, options).join('\n    ')
  const htmlTitle = visibleTitle(options)
  const body = `<main style="font-family:system-ui,sans-serif;max-width:42rem;padding:1.5rem;line-height:1.5">
      <h1>${escapeHtmlText(htmlTitle)}</h1>
      <p>This page is an OG Meta test fixture. Path: <code>${escapeHtmlText(path)}</code></p>
    </main>`
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex, nofollow">
  <title>${escapeHtmlText(htmlTitle)}</title>
    ${headExtra}
</head>
<body>
${body}
</body>
</html>`

  return new Response(html, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'X-Robots-Tag': 'noindex, nofollow',
    },
  })
}
