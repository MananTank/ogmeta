'use server'

import { unstable_cache } from 'next/cache'
import * as cheerio from 'cheerio'
import { type DocumentMetadata } from '@/lib/og-types'
import { effectiveTwitterPreview } from '../components/previews/twitter/utils'

const REVALIDATE_SECONDS = 60 * 5 // 5 mins

type FetchOGDataResult =
  | { type: 'success'; data: DocumentMetadata }
  | { type: 'error'; error: string }

function isTwitterHost(hostname: string): boolean {
  const h = hostname.replace(/^www\./, '')
  return h === 'twitter.com' || h === 'x.com' || h === 'mobile.twitter.com'
}

function isTwitterUrl(urlString: string): boolean {
  try {
    return isTwitterHost(new URL(urlString).hostname)
  } catch {
    return false
  }
}

function needsTwitterSyntheticFallback(data: DocumentMetadata): boolean {
  const t = effectiveTwitterPreview(data)
  const noTitle = !t.title?.trim()
  const noImage = !t.image?.trim() || !t.isValidImage
  return noTitle && noImage
}

function profileHandleFromUrl(urlString: string): string {
  try {
    const seg = new URL(urlString).pathname.split('/').filter(Boolean)[0] ?? ''
    return seg.replace(/^@/, '')
  } catch {
    return ''
  }
}

async function syntheticTwitterProfileMetadata(
  pageUrl: string
): Promise<DocumentMetadata> {
  const handle = profileHandleFromUrl(pageUrl)
  const title = handle ? `@${handle} on X` : 'Profile on X'
  const description = handle ? `X profile @${handle}` : 'X profile'
  const emptyTwitter: DocumentMetadata['twitter'] = {
    title: '',
    description: '',
    image: '',
    isValidImage: false,
    card: undefined,
  }
  const base: DocumentMetadata = {
    favicon: null,
    url: pageUrl,
    doc: { title, description },
    openGraph: {
      title,
      description,
      image: '',
      isValidImage: false,
      siteName: 'X',
      type: 'profile',
    },
    twitter: emptyTwitter,
  }
  return withTwitterProfileAvatar(base, handle)
}

async function withTwitterProfileAvatar(
  data: DocumentMetadata,
  handle: string
): Promise<DocumentMetadata> {
  if (data.openGraph.image || !handle) return data
  const avatar = `https://unavatar.io/twitter/${encodeURIComponent(handle)}`
  if (await validateImage(avatar)) {
    return {
      ...data,
      openGraph: {
        ...data.openGraph,
        image: avatar,
        isValidImage: true,
      },
    }
  }
  return data
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

function getMetaContent($: cheerio.CheerioAPI, selectors: string[]): string {
  for (const selector of selectors) {
    const content = $(selector).attr('content')
    if (content) return content
  }
  return ''
}

async function parseOpenGraphSlice(
  $: cheerio.CheerioAPI,
  pageUrl: string
): Promise<DocumentMetadata['openGraph']> {
  const title = getMetaContent($, [
    'meta[property="og:title"]',
    'meta[name="og:title"]',
  ]).trim()

  const description = getMetaContent($, [
    'meta[property="og:description"]',
    'meta[name="og:description"]',
  ]).trim()

  const image = getMetaContent($, [
    'meta[property="og:image"]',
    'meta[name="og:image"]',
  ]).trim()

  const ogSiteName = getMetaContent($, [
    'meta[property="og:site_name"]',
    'meta[name="og:site_name"]',
  ]).trim()

  const applicationName = getMetaContent($, [
    'meta[name="application-name"]',
  ]).trim()

  const resolvedSiteName = ogSiteName || applicationName

  const type =
    getMetaContent($, ['meta[property="og:type"]', 'meta[name="og:type"]']) ||
    'website'

  const { isValidImage } = await validateImageAndFavicon(image, '')

  return {
    title,
    description,
    image,
    isValidImage,
    siteName: resolvedSiteName || undefined,
    type,
  }
}

async function parseTwitterSlice(
  $: cheerio.CheerioAPI,
  pageUrl: string
): Promise<DocumentMetadata['twitter']> {
  const title = getMetaContent($, ['meta[name="twitter:title"]']).trim()

  const description = getMetaContent($, [
    'meta[name="twitter:description"]',
  ]).trim()

  const image = getMetaContent($, [
    'meta[name="twitter:image"]',
    'meta[name="twitter:image:src"]',
  ]).trim()

  const card = getMetaContent($, ['meta[name="twitter:card"]']).trim()

  const site = getMetaContent($, ['meta[name="twitter:site"]']).trim()

  const { isValidImage } = await validateImageAndFavicon(image, '')

  return {
    title,
    description,
    image,
    isValidImage,
    card: card || undefined,
    site: site || undefined,
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

  const { isValidFavicon } = await validateImageAndFavicon('', resolvedFavicon)
  return isValidFavicon ? resolvedFavicon : undefined
}

async function parsePageMetadata(
  html: string,
  pageUrl: string
): Promise<DocumentMetadata> {
  const $ = cheerio.load(html)
  const title = $('title').first().text().trim()
  const description = getMetaContent($, ['meta[name="description"]']).trim()

  const [openGraph, twitter, favicon] = await Promise.all([
    parseOpenGraphSlice($, pageUrl),
    parseTwitterSlice($, pageUrl),
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
    let data = await parsePageMetadata(html, url)

    if (isTwitterUrl(url) && needsTwitterSyntheticFallback(data)) {
      data = await syntheticTwitterProfileMetadata(url)
    }

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
