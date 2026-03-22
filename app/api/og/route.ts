import { NextRequest, NextResponse } from 'next/server'
import * as cheerio from 'cheerio'

interface OGMetadata {
  title: string
  description: string
  image: string
  isValidImage: boolean
  url: string
  siteName?: string
  type?: string
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const url = searchParams.get('url')

    if (!url) {
      return NextResponse.json(
        { error: 'URL parameter is required' },
        { status: 400 }
      )
    }

    try {
      new URL(url)
    } catch {
      return NextResponse.json({ error: 'Invalid URL format' }, { status: 400 })
    }

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; OG-Preview/1.0)',
      },
      redirect: 'follow',
    })

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch URL: ${response.statusText}` },
        { status: response.status }
      )
    }

    const html = await response.text()
    const metadata = await parseOGMetadata(html, url)

    return NextResponse.json(metadata)
  } catch (error) {
    console.error('[og-api] Fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch open graph metadata' },
      { status: 500 }
    )
  }
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

  // Validate image
  const isValidImage = await validateImage(resolvedImage)

  return {
    title,
    description,
    image: resolvedImage,
    isValidImage,
    url,
    siteName,
    type,
  }
}
