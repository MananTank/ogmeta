'use client'

import { useState, useCallback } from 'react'
import { useQuery } from '@tanstack/react-query'
import { PlatformPreviews } from '@/components/platform-previews'
import {
  HomeUrlInput,
  isValidUrl,
  normalizeUrlForFetch,
  type HomeUrlInputState,
} from '@/components/home-url-input'
import { fetchOGData, type OGMetadata } from '@/lib/og'

interface HomeClientProps {
  defaultUrl: string
  initialData: OGMetadata | null
}

export function HomeClient({ defaultUrl, initialData }: HomeClientProps) {
  const [urlInputState, setUrlInputState] = useState<HomeUrlInputState>(() => ({
    debouncedUrl: defaultUrl,
    hasReadStoredUrl: false,
    urlIsValid: isValidUrl(defaultUrl),
  }))

  const handleUrlInputStateChange = useCallback((state: HomeUrlInputState) => {
    setUrlInputState(state)
  }, [])

  const { debouncedUrl, hasReadStoredUrl, urlIsValid } = urlInputState

  const {
    data: ogData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['og', debouncedUrl],
    queryFn: async () => {
      const result = await fetchOGData(normalizeUrlForFetch(debouncedUrl))
      if (result.type === 'error') {
        throw new Error(result.error)
      }
      return result.data
    },
    enabled: hasReadStoredUrl && urlIsValid,
    retry: false,
    initialData:
      debouncedUrl === defaultUrl && initialData ? initialData : undefined,
  })

  const bootstrappingUrl = !hasReadStoredUrl
  const previewsLoading = bootstrappingUrl || isLoading

  return (
    <main className="min-h-screen px-4">
      <div className="mx-auto max-w-3xl pt-24 pb-24">
        <header className="mb-8 text-center">
          <h1 className="font-sans text-5xl font-semibold tracking-tight md:text-5xl">
            <span className="text-foreground">Preview link on</span>
            <br />
            <span className="text-muted-foreground">social platforms</span>
          </h1>
          <p className="text-muted-foreground mt-4 text-base">
            Fast, Accurate, Open Source
          </p>
        </header>

        <div className="mx-auto w-full max-w-lg space-y-3">
          <div>
            <HomeUrlInput
              defaultUrl={defaultUrl}
              fetchedOgMetadata={ogData}
              ogFetchError={!!error}
              ogFetchLoading={isLoading}
              onStateChange={handleUrlInputStateChange}
            />
            {hasReadStoredUrl && error && (
              <p className="mt-2 text-center text-sm text-red-400">
                Failed to fetch opengraph metadata
              </p>
            )}
          </div>
        </div>
      </div>
      <PlatformPreviews
        title={ogData?.title ?? ''}
        description={ogData?.description ?? ''}
        image={ogData?.image ?? ''}
        isValidImage={ogData?.isValidImage ?? false}
        url={ogData?.url ?? debouncedUrl}
        isLoading={previewsLoading}
        isError={hasReadStoredUrl && !!error}
        isValidUrl={urlIsValid}
      />
    </main>
  )
}
