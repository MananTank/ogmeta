import type { Metadata } from 'next'
import type { Metadata } from '@/lib/og-types'
import { siteNameLabelFromUrl } from '@/lib/site-name'

export type Content = 'none' | 'short' | 'long'

/** Standard aspect ratios; `broken` is a deliberately missing file for error cases. */
export type Image = 'none' | '1/1' | '1200/630' | 'broken'

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
  /** `twitter:site` e.g. `@yourbrand` (optional). */
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

/** `<title>` and standalone meta description, distinct from OG/Twitter strings. */
export const HTML_SHORT_TITLE = 'Document title (short)'
export const HTML_LONG_TITLE =
  'Document title long: ' +
  'A long HTML document title for the <title> element. '.repeat(14).trim()

export const HTML_SHORT_DESCRIPTION = 'Meta description (short)'
export const HTML_LONG_DESCRIPTION =
  'Meta description long: ' +
  'A long HTML meta description (name=description). '.repeat(18).trim()

/** `og:title` / `og:description` */
export const OG_SHORT_TITLE = 'og:title (short)'
export const OG_LONG_TITLE =
  'og:title long: ' + 'A long Open Graph title for og:title. '.repeat(14).trim()

export const OG_SHORT_DESCRIPTION = 'og:description (short)'
export const OG_LONG_DESCRIPTION =
  'og:description long: ' +
  'A long Open Graph description for og:description. '.repeat(18).trim()

/** `twitter:title` / `twitter:description` */
export const TWITTER_SHORT_TITLE = 'twitter:title (short)'
export const TWITTER_LONG_TITLE =
  'twitter:title long: ' +
  'A long Twitter Card title for twitter:title. '.repeat(14).trim()

export const TWITTER_SHORT_DESCRIPTION = 'twitter:description (short)'
export const TWITTER_LONG_DESCRIPTION =
  'twitter:description long: ' +
  'A long Twitter Card description for twitter:description. '.repeat(18).trim()

type ContentSource = 'html' | 'og' | 'twitter'

function resolveContent(
  kind: 'title' | 'description',
  c: Content,
  source: ContentSource
): string | null {
  if (c === 'none') return null
  if (c === 'short') {
    if (kind === 'title') {
      if (source === 'html') return HTML_SHORT_TITLE
      if (source === 'og') return OG_SHORT_TITLE
      return TWITTER_SHORT_TITLE
    }
    if (source === 'html') return HTML_SHORT_DESCRIPTION
    if (source === 'og') return OG_SHORT_DESCRIPTION
    return TWITTER_SHORT_DESCRIPTION
  }
  if (kind === 'title') {
    if (source === 'html') return HTML_LONG_TITLE
    if (source === 'og') return OG_LONG_TITLE
    return TWITTER_LONG_TITLE
  }
  if (source === 'html') return HTML_LONG_DESCRIPTION
  if (source === 'og') return OG_LONG_DESCRIPTION
  return TWITTER_LONG_DESCRIPTION
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
      return '/og-test/1200-1200.png'
    case '1200/630':
      return '/og-test/1200-630.png'
    case 'broken':
      return '/og-test/this-file-does-not-exist-ogmeta.png'
    default:
      return null
  }
}

/** Path for `twitter:image` metadata, or `null` when omitted. */
function twitterImagePath(image: Image): string | null {
  if (image === 'none') return null
  if (image === 'broken') return '/og-test/this-file-does-not-exist-ogmeta.png'
  return ogImagePath(image) ?? '/og-test/1200-630.png'
}

function visibleTitle(options: OgTestHtmlOptionsResolved): string {
  const t = resolveContent('title', options.title, 'html')
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
 * Safe when `process` is undefined (e.g. some client bundles).
 */
export function getOgTestsMetadataBase(): URL {
  const env =
    typeof process !== 'undefined' && process.env ? process.env : undefined

  if (env?.VERCEL_ENV === 'production') {
    return new URL(OG_METADATA_PROD_BASE)
  }

  const fromEnv =
    normalizeSiteOrigin(env?.NEXT_PUBLIC_SITE_URL) ??
    normalizeSiteOrigin(env?.VERCEL_PROJECT_PRODUCTION_URL)
  if (fromEnv) return new URL(fromEnv)

  if (env?.VERCEL_URL) {
    return new URL(`https://${env.VERCEL_URL.replace(/\/+$/, '')}`)
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
  const htmlDesc = resolveContent('description', resolved.desc, 'html')

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
    const ogTitle = resolveContent('title', og.title, 'og')
    const ogDesc = resolveContent('description', og.desc, 'og')

    const ogImagePathname = og.image !== 'none' ? ogImagePath(og.image) : null

    metadata.openGraph = {
      type: og.type,
      url: ogUrl,
      siteName: 'Site Name',
      ...(ogTitle ? { title: ogTitle } : {}),
      ...(ogDesc ? { description: ogDesc } : {}),
      ...(ogImagePathname ? { images: [{ url: ogImagePathname }] } : {}),
    }
  }

  const tw = resolved.twitter
  if (tw.card !== 'none') {
    const twTitle = resolveContent('title', tw.title, 'twitter')
    const twDesc = resolveContent('description', tw.description, 'twitter')
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

/**
 * Builds {@link Metadata} the same way fixture pages expose tags (doc / og / twitter),
 * for previews and tests. Image URLs are absolute using `metadataBase`.
 */
export function ogTestOptionsToOgMetadata(
  options: OgTestHtmlOptions,
  pathname: string,
  metadataBase: URL
): Metadata {
  const resolved = normalizeOgTestHtmlOptions(options)
  const pageUrl = new URL(
    pathname.startsWith('/') ? pathname : `/${pathname}`,
    metadataBase
  ).href

  const og = resolved.og
  const doc = {
    title: resolveContent('title', resolved.title, 'html') ?? '',
    description: resolveContent('description', resolved.desc, 'html') ?? '',
  }

  const openGraph: Metadata['openGraph'] = {
    title: '',
    description: '',
    image: '',
    isValidImage: false,
    type: 'website',
  }
  if (hasAnyOg(og)) {
    openGraph.title = resolveContent('title', og.title, 'og') ?? ''
    openGraph.description = resolveContent('description', og.desc, 'og') ?? ''
    const ogPath = og.image !== 'none' ? ogImagePath(og.image) : null
    openGraph.image = ogPath ? new URL(ogPath, metadataBase).href : ''
    openGraph.isValidImage = og.image !== 'none' && og.image !== 'broken'
    openGraph.siteName = 'Site Name'
    openGraph.type = og.type
  } else {
    // openGraph.siteName = 'Site Name'
  }

  const tw = resolved.twitter
  const twitter: Metadata['twitter'] = {
    title: '',
    description: '',
    image: '',
    isValidImage: false,
  }
  if (tw.card !== 'none') {
    twitter.title = resolveContent('title', tw.title, 'twitter') ?? ''
    twitter.description =
      resolveContent('description', tw.description, 'twitter') ?? ''
    const twPath = twitterImagePath(tw.image)
    twitter.image = twPath ? new URL(twPath, metadataBase).href : ''
    twitter.isValidImage = tw.image !== 'none' && tw.image !== 'broken'
    twitter.card = tw.card
    if (tw.site?.trim()) twitter.site = tw.site.trim()
  }

  return {
    url: pageUrl,
    doc,
    openGraph,
    twitter,
  }
}
