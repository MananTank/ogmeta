import type { PlatformPreviewsProps } from '@/components/previews/types'
import type { DocumentMetadata } from '@/lib/og-types'
import type { OgTestFixture } from '@/lib/og-test-fixtures'
import type { OGTestOptions } from '@/lib/og-test-html'
import {
  getContent,
  hasAnyOg,
  isTwitterEntirelyOmitted,
  ogImagePath,
  twitterImagePath,
} from '@/lib/og-test-html'

const EXAMPLE_FAVICON = 'https://vercel.com/favicon.ico'

export function ogTestFixturePageUrl(fixtureSlug: string): string {
  return `https://ogmeta.app/tests/${fixtureSlug}`
}

export function generateAPIData(
  options: OGTestOptions,
  pageUrl: string
): DocumentMetadata {
  const metadataBase = new URL(pageUrl)

  const doc = {
    title: getContent('title', options.title, 'html') ?? '',
    description: getContent('description', options.desc, 'html') ?? '',
  }

  const openGraph: DocumentMetadata['openGraph'] = {
    title: '',
    description: '',
    image: '',
    isValidImage: false,
    type: 'website',
  }

  if (options.og !== 'none' && hasAnyOg(options.og)) {
    const og = options.og
    openGraph.title = getContent('title', og.title, 'og') ?? ''
    openGraph.description = getContent('description', og.desc, 'og') ?? ''
    const ogPath = og.image !== 'none' ? ogImagePath(og.image) : null
    openGraph.image = ogPath ? new URL(ogPath, metadataBase).href : ''
    openGraph.isValidImage = og.image !== 'none' && og.image !== 'broken'
    openGraph.siteName = 'Site Name'
    openGraph.type = og.type
  }

  const twitter: DocumentMetadata['twitter'] = {
    title: '',
    description: '',
    image: '',
    isValidImage: false,
  }

  if (
    options.twitter !== 'none' &&
    !isTwitterEntirelyOmitted(options.twitter)
  ) {
    const tw = options.twitter
    twitter.title = getContent('title', tw.title, 'twitter') ?? ''
    twitter.description =
      getContent('description', tw.description, 'twitter') ?? ''
    const twPath = twitterImagePath(tw.image)
    twitter.image = twPath ? new URL(twPath, metadataBase).href : ''
    twitter.isValidImage = tw.image !== 'none' && tw.image !== 'broken'
    twitter.card = tw.card === 'none' ? '' : tw.card
    if (tw.site?.trim()) twitter.site = tw.site.trim()
  }

  return {
    url: pageUrl,
    doc,
    openGraph,
    twitter,
    favicon: EXAMPLE_FAVICON,
  }
}

export function ogTestFixtureToPlatformPreviewsProps(
  fixtureSlug: string,
  fixture: OgTestFixture
): PlatformPreviewsProps {
  const url = ogTestFixturePageUrl(fixtureSlug)

  return {
    data: generateAPIData(fixture.config, url),
    isLoading: false,
    isError: false,
    isValidUrl: true,
    urlInput: url,
  }
}
