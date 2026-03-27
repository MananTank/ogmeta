import type { PlatformPreviewsProps } from '@/components/previews/types'
import type { OgTestFixture } from '@/lib/og-test-fixtures'
import { ogTestOptionsToOgMetadata } from '@/lib/og-test-html'

/** Browser-safe default (Ladle/Vite has no `process`); matches production canonical origin. */
const DEFAULT_FIXTURE_METADATA_BASE = new URL('https://ogmeta.app/')

/**
 * Maps a fixture to {@link PlatformPreviewsProps} for Slack (and other) previews,
 * using the same strings and image rules as `/tests/[slug]`.
 */
export function ogTestFixtureToPlatformPreviewsProps(
  fixtureSlug: string,
  fixture: OgTestFixture,
  metadataBase?: URL
): PlatformPreviewsProps {
  const base = metadataBase ?? DEFAULT_FIXTURE_METADATA_BASE
  const pathname = `/tests/${fixtureSlug}`
  return {
    data: ogTestOptionsToOgMetadata(fixture.config, pathname, base),
    isLoading: false,
    isError: false,
    isValidUrl: true,
  }
}
