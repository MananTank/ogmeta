'use server'

import { unstable_cache } from 'next/cache'
import * as cheerio from 'cheerio'

export interface OGMetadata {
  title: string
  description: string
  image: string
  isValidImage: boolean
  url: string
  siteName?: string
  type?: string
  favicon?: string
}

export type FetchOGDataResult =
  | { type: 'success'; data: OGMetadata }
  | { type: 'error'; error: string }

/** Cached OG fetches (shared by RSC + server actions). */
const REVALIDATE_SECONDS = 60 * 5 // 5 mins

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

async function validateImageAndFavicon(
  imageUrl: string,
  faviconUrl: string
): Promise<{ isValidImage: boolean; isValidFavicon: boolean }> {
  const hasImage = Boolean(imageUrl)
  const hasFavicon = Boolean(faviconUrl)

  if (!hasImage && !hasFavicon) {
    return { isValidImage: false, isValidFavicon: false }
  }

  if (hasImage && hasFavicon && imageUrl === faviconUrl) {
    const ok = await validateImage(imageUrl)
    return { isValidImage: ok, isValidFavicon: ok }
  }

  const [isValidImage, isValidFavicon] = await Promise.all([
    hasImage ? validateImage(imageUrl) : Promise.resolve(false),
    hasFavicon ? validateImage(faviconUrl) : Promise.resolve(false),
  ])

  return { isValidImage, isValidFavicon }
}

async function parseOGMetadata(html: string, url: string): Promise<OGMetadata> {
  const $ = cheerio.load(html)

  const getMetaContent = (selectors: string[]): string => {
    for (const selector of selectors) {
      const content = $(selector).attr('content')
      if (content) return content
    }
    return ''
  }

  const title =
    getMetaContent([
      'meta[property="og:title"]',
      'meta[name="og:title"]',
      'meta[name="twitter:title"]',
    ]) ||
    $('title').text() ||
    'No title found'

  const description = getMetaContent([
    'meta[property="og:description"]',
    'meta[name="og:description"]',
    'meta[name="twitter:description"]',
    'meta[name="description"]',
  ])

  const image = getMetaContent([
    'meta[property="og:image"]',
    'meta[name="og:image"]',
    'meta[name="twitter:image"]',
    'meta[name="twitter:image:src"]',
  ])

  const siteName = getMetaContent([
    'meta[property="og:site_name"]',
    'meta[name="og:site_name"]',
  ])

  const type =
    getMetaContent(['meta[property="og:type"]', 'meta[name="og:type"]']) ||
    'website'

  // Resolve relative image URLs
  let resolvedImage = image
  if (image && !image.startsWith('http')) {
    try {
      resolvedImage = new URL(image, url).href
    } catch {
      resolvedImage = image
    }
  }

  // Extract favicon
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

  // Fallback to /favicon.ico if no favicon found in HTML
  if (!faviconUrl) {
    try {
      const baseUrl = new URL(url)
      faviconUrl = `${baseUrl.origin}/favicon.ico`
    } catch {
      // ignore
    }
  }

  // Resolve relative favicon URL
  let resolvedFavicon = faviconUrl
  if (
    faviconUrl &&
    !faviconUrl.startsWith('http') &&
    !faviconUrl.startsWith('data:')
  ) {
    try {
      resolvedFavicon = new URL(faviconUrl, url).href
    } catch {
      resolvedFavicon = faviconUrl
    }
  }

  const { isValidImage, isValidFavicon } = await validateImageAndFavicon(
    resolvedImage,
    resolvedFavicon
  )

  return {
    title,
    description,
    image: resolvedImage,
    isValidImage,
    url,
    siteName,
    type,
    favicon: isValidFavicon ? resolvedFavicon : undefined,
  }
}

async function fetchOGDataUncached(url: string): Promise<FetchOGDataResult> {
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
    const data = await parseOGMetadata(html, url)
    return { type: 'success', data }
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Failed to fetch metadata'
    return { type: 'error', error: message }
  }
}

const getCachedOGData = unstable_cache(
  async (url: string) => fetchOGDataUncached(url),
  ['og-metadata'],
  { revalidate: REVALIDATE_SECONDS, tags: ['og-metadata'] }
)

export async function fetchOGData(url: string): Promise<FetchOGDataResult> {
  return getCachedOGData(url)
}
