'use server'

import { unstable_cache } from 'next/cache'
import * as cheerio from 'cheerio'
import { type DocumentMetadata } from '@/lib/og-types'

type DocumentMetadataResult =
  | { type: 'success'; data: DocumentMetadata }
  | { type: 'error'; error: string }

export const fetchDocumentMetadata = unstable_cache(
  async (url: string) => fetchDocumentMetadata_Uncached(url),
  ['og-metadata'],
  {
    revalidate: 60 * 5, // 5 mins
    tags: ['og-metadata'],
  }
)

async function fetchDocumentMetadata_Uncached(
  url: string
): Promise<DocumentMetadataResult> {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; OG-Preview/1.0)',
      },
      redirect: 'follow',
    })

    if (!response.ok) {
      return {
        type: 'error',
        error: `Failed to fetch URL: ${response.statusText}`,
      }
    }

    const html = await response.text()
    let data = await parsePageMetadata(html, url)

    if (isTwitterProfileUrl(url) && needsTwitterSyntheticFallback(data)) {
      data = await twitterProfileDocumentMetadata(url)
    }

    return { type: 'success', data }
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Failed to fetch metadata'
    return { type: 'error', error: message }
  }
}

async function parsePageMetadata(
  html: string,
  pageUrl: string
): Promise<DocumentMetadata> {
  const $ = cheerio.load(html)
  const title = $('title').first().text().trim()
  const description = getContentFromSelectors($, [
    'meta[name="description"]',
  ]).trim()

  const [openGraph, twitter, favicon] = await Promise.all([
    parseOpenGraphSlice($),
    parseTwitterSlice($),
    extractFavicon($, pageUrl),
  ])

  return {
    url: pageUrl,
    doc: { title, description },
    openGraph,
    twitter,
    favicon: favicon || null,
  }
}

async function extractFavicon(
  $: cheerio.CheerioAPI,
  pageUrl: string
): Promise<string | undefined> {
  const faviconSelectors = [
    'link[rel="icon"]',
    'link[rel="shortcut icon"]',
    'link[rel="apple-touch-icon"]',
    'link[rel="apple-touch-icon-precomposed"]',
  ]

  let faviconUrl = ''
  for (const selector of faviconSelectors) {
    const href = $(selector).attr('href')
    if (href) {
      faviconUrl = href
      break
    }
  }

  if (!faviconUrl) {
    try {
      const baseUrl = new URL(pageUrl)
      faviconUrl = `${baseUrl.origin}/favicon.ico`
    } catch {
      return undefined
    }
  }

  let resolvedFavicon = faviconUrl
  if (
    faviconUrl &&
    !faviconUrl.startsWith('http') &&
    !faviconUrl.startsWith('data:')
  ) {
    try {
      resolvedFavicon = new URL(faviconUrl, pageUrl).href
    } catch {
      resolvedFavicon = faviconUrl
    }
  }

  const isValidFavicon = await validateImage(resolvedFavicon)
  return isValidFavicon ? resolvedFavicon : undefined
}

async function parseOpenGraphSlice(
  $: cheerio.CheerioAPI
): Promise<DocumentMetadata['openGraph']> {
  const title = getContentFromSelectors($, [
    'meta[property="og:title"]',
    'meta[name="og:title"]',
  ]).trim()

  const description = getContentFromSelectors($, [
    'meta[property="og:description"]',
    'meta[name="og:description"]',
  ]).trim()

  const image = getContentFromSelectors($, [
    'meta[property="og:image"]',
    'meta[name="og:image"]',
  ]).trim()

  const ogSiteName = getContentFromSelectors($, [
    'meta[property="og:site_name"]',
    'meta[name="og:site_name"]',
  ]).trim()

  const applicationName = getContentFromSelectors($, [
    'meta[name="application-name"]',
  ]).trim()

  const isValidImage = await validateImage(image)

  return {
    title,
    description,
    image,
    isValidImage,
    siteName: ogSiteName || applicationName || '',
  }
}

async function parseTwitterSlice(
  $: cheerio.CheerioAPI
): Promise<DocumentMetadata['twitter']> {
  const title = getContentFromSelectors($, [
    'meta[name="twitter:title"]',
  ]).trim()

  const description = getContentFromSelectors($, [
    'meta[name="twitter:description"]',
  ]).trim()

  const image = getContentFromSelectors($, [
    'meta[name="twitter:image"]',
    'meta[name="twitter:image:src"]',
  ]).trim()

  const card = getContentFromSelectors($, ['meta[name="twitter:card"]']).trim()
  const site = getContentFromSelectors($, ['meta[name="twitter:site"]']).trim()

  const isValidImage = await validateImage(image)

  return {
    title,
    description,
    image,
    isValidImage,
    card: card || '',
    site: site || '',
  }
}

const TWITTER_PROFILE_HOSTS = new Set([
  'x.com',
  'twitter.com',
  'mobile.twitter.com',
])

function isTwitterProfileUrl(urlString: string): boolean {
  try {
    const url = new URL(urlString)
    const hostname = url.hostname.replace(/^www\./, '')
    if (!TWITTER_PROFILE_HOSTS.has(hostname)) return false

    const segments = url.pathname.split('/').filter(Boolean)
    return segments.length === 1
  } catch {
    return false
  }
}

function needsTwitterSyntheticFallback(data: DocumentMetadata): boolean {
  return !data.doc.title && !data.doc.description
}

function profileHandleFromUrl(urlString: string): string {
  try {
    const seg = new URL(urlString).pathname.split('/').filter(Boolean)[0] ?? ''
    return seg.replace(/^@/, '')
  } catch {
    return ''
  }
}

async function twitterProfileDocumentMetadata(pageUrl: string) {
  const handle = profileHandleFromUrl(pageUrl)
  const title = handle ? `@${handle} on X` : 'Profile on X'
  const description = '' // todo - fetch bio using twitter APi

  let avatar = `https://unavatar.io/twitter/${encodeURIComponent(handle)}`

  const isValidImage = await validateImage(avatar)

  const result: DocumentMetadata = {
    favicon: null,
    url: pageUrl,
    doc: { title, description },
    openGraph: {
      title,
      description,
      image: avatar,
      isValidImage: isValidImage,
      siteName: 'X',
    },
    twitter: {
      title,
      description,
      image: avatar,
      isValidImage: isValidImage,
      card: 'summary',
      site: `https://x.com/${handle}`,
    },
  }

  return result
}

async function validateImage(imageUrl: string): Promise<boolean> {
  if (!imageUrl) return false

  try {
    const response = await fetch(imageUrl, {
      method: 'HEAD',
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; OG-Preview/1.0)',
      },
    })

    if (!response.ok) return false

    const contentType = response.headers.get('content-type')
    if (!contentType) return false

    return contentType.startsWith('image/')
  } catch {
    return false
  }
}

function getContentFromSelectors(
  $: cheerio.CheerioAPI,
  selectors: string[]
): string {
  for (const selector of selectors) {
    const content = $(selector).attr('content')
    if (content) return content
  }
  return ''
}
