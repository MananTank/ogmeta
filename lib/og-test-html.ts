import type { Metadata } from 'next'

export type Content = 'none' | 'short' | 'long'

/** Standard aspect ratios; `relative` and `broken` support extra fixture cases. */
export type Image = 'none' | '1/1' | '1200/630' | 'relative' | 'broken'

export type OGType = 'website' | 'article'

export type TwitterCardType = 'summary' | 'summary_large_image' | 'none'

/** Full Open Graph block for a fixture. */
export type OgTestHtmlOgOptions = {
  title: Content
  desc: Content
  image: Image
  type: OGType
  url?: string
}

/** Full Twitter block for a fixture. */
export type OgTestHtmlTwitterOptions = {
  title: Content
  card: TwitterCardType
  /** Use `'none'` to omit the `twitter:description` tag. */
  description: Content
  /** Use `'none'` to omit the `twitter:image` tag. */
  image: Image
  url?: string
  /** `twitter:site` — e.g. `@yourbrand` (optional). */
  site?: string
}

/**
 * Options for test fixtures. Use `og: 'none'` or `twitter: 'none'` as a
 * shorthand for setting every field in that block to `'none'`.
 */
export type OgTestHtmlOptions = {
  title: Content
  desc: Content
  og: OgTestHtmlOgOptions | 'none'
  twitter: OgTestHtmlTwitterOptions | 'none'
}

type OgTestHtmlOptionsResolved = {
  title: Content
  desc: Content
  og: OgTestHtmlOgOptions
  twitter: OgTestHtmlTwitterOptions
}

const OG_NONE: OgTestHtmlOgOptions = {
  title: 'none',
  desc: 'none',
  image: 'none',
  type: 'website',
}

const TWITTER_NONE: OgTestHtmlTwitterOptions = {
  title: 'none',
  card: 'none',
  description: 'none',
  image: 'none',
}

function normalizeOgTestHtmlOptions(
  options: OgTestHtmlOptions
): OgTestHtmlOptionsResolved {
  return {
    title: options.title,
    desc: options.desc,
    og: options.og === 'none' ? OG_NONE : options.og,
    twitter: options.twitter === 'none' ? TWITTER_NONE : options.twitter,
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

function hasAnyOg(og: OgTestHtmlOgOptions): boolean {
  return og.title !== 'none' || og.desc !== 'none' || og.image !== 'none'
}

/** Public path under `/public` for fixture images (resolved with `metadataBase`). */
function ogImagePath(image: Image): string | null {
  switch (image) {
    case 'none':
      return null
    case '1/1':
      return '/og-test/square-1200x1200.jpg'
    case '1200/630':
      return '/og-test/rect-1200x630.jpg'
    case 'relative':
      return '/og-test/rect-1200x630.jpg'
    case 'broken':
      return '/og-test/this-file-does-not-exist-ogmeta.png'
    default:
      return null
  }
}

/** Path for `twitter:image` metadata, or `null` when omitted. */
function twitterImagePath(image: Image): string | null {
  if (image === 'none') return null
  if (image === 'relative') return '/og-test/rect-1200x630.jpg'
  if (image === 'broken') return '/og-test/this-file-does-not-exist-ogmeta.png'
  return ogImagePath(image) ?? '/og-test/rect-1200x630.jpg'
}

function visibleTitle(options: OgTestHtmlOptionsResolved): string {
  const t = resolveContent('title', options.title)
  if (t) return t
  return ''
}

/** Canonical production origin for `/tests/**` metadata (`metadataBase`, `og:url`). */
const OG_METADATA_PROD_BASE = 'https://ogmeta.app/'

/** Vercel often provides hostnames without a scheme; `new URL("ogmeta.app")` throws. */
function normalizeSiteOrigin(raw: string | undefined): string | null {
  const s = raw?.trim()
  if (!s) return null
  const noTrailing = s.replace(/\/+$/, '')
  const withScheme = /^https?:\/\//i.test(noTrailing)
    ? noTrailing
    : `https://${noTrailing}`
  try {
    const u = new URL(withScheme)
    if (u.protocol !== 'http:' && u.protocol !== 'https:') return null
    return u.href.replace(/\/+$/, '')
  } catch {
    return null
  }
}

/**
 * Site origin for `/tests/**` metadata (`metadataBase`, `og:url`).
 * Production on Vercel uses {@link OG_METADATA_PROD_BASE}; preview and local dev use env or localhost.
 */
export function getOgTestsMetadataBase(): URL {
  if (process.env.VERCEL_ENV === 'production') {
    return new URL(OG_METADATA_PROD_BASE)
  }

  const fromEnv =
    normalizeSiteOrigin(process.env.NEXT_PUBLIC_SITE_URL) ??
    normalizeSiteOrigin(process.env.VERCEL_PROJECT_PRODUCTION_URL)
  if (fromEnv) return new URL(fromEnv)

  if (process.env.VERCEL_URL) {
    return new URL(`https://${process.env.VERCEL_URL.replace(/\/+$/, '')}`)
  }

  return new URL('http://localhost:3000')
}

/**
 * Maps {@link OgTestHtmlOptions} to Next.js `Metadata` (used by `generateMetadata` on `/tests/**`).
 */
export function ogTestOptionsToMetadata(
  options: OgTestHtmlOptions,
  pathname: string,
  metadataBase: URL
): Metadata {
  const resolved = normalizeOgTestHtmlOptions(options)

  const title = visibleTitle(resolved)
  const htmlDesc = resolveContent('description', resolved.desc)

  const metadata: Metadata = {
    title,
  }
  if (htmlDesc) metadata.description = htmlDesc

  if (hasAnyOg(resolved.og)) {
    const og = resolved.og
    const ogUrl =
      og.url ??
      new URL(
        pathname.startsWith('/') ? pathname : `/${pathname}`,
        metadataBase
      ).href
    const ogTitle = resolveContent('title', og.title)
    const ogDesc = resolveContent('description', og.desc)

    const ogImagePathname = og.image !== 'none' ? ogImagePath(og.image) : null

    metadata.openGraph = {
      type: og.type,
      url: ogUrl,
      siteName: 'OG Meta Fixtures',
      ...(ogTitle ? { title: ogTitle } : {}),
      ...(ogDesc ? { description: ogDesc } : {}),
      ...(ogImagePathname ? { images: [{ url: ogImagePathname }] } : {}),
    }
  }

  const tw = resolved.twitter
  if (tw.card !== 'none') {
    const twTitle = resolveContent('title', tw.title)
    const twDesc = resolveContent('description', tw.description)
    const twImgPath = twitterImagePath(tw.image)

    metadata.twitter = {
      card: tw.card,
      ...(twTitle ? { title: twTitle } : {}),
      ...(twDesc ? { description: twDesc } : {}),
      ...(twImgPath ? { images: [twImgPath] } : {}),
      ...(tw.url ? { url: tw.url } : {}),
      ...(tw.site?.trim() ? { site: tw.site.trim() } : {}),
    }
  }

  return metadata
}
