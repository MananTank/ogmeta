'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useQuery } from '@tanstack/react-query'
import {
  AlertCircleIcon,
  CircleDotDashedIcon,
  GlobeIcon,
} from 'lucide-react'
import { PlatformPreviews } from '@/components/platform-previews'
import {
  HomeUrlInput,
  isValidUrl,
  normalizeUrlForFetch,
  type HomeUrlInputHandle,
  type HomeUrlInputState,
} from '@/components/home-url-input'
import { cn } from '@/lib/utils'
import { fetchOGData, type OGMetadata } from '@/lib/og'

const SAVE_DELAY_MS = 3000

interface HomeClientProps {
  defaultUrl: string
  initialData: OGMetadata | null
}

export function HomeClient({ defaultUrl, initialData }: HomeClientProps) {
  const urlInputRef = useRef<HomeUrlInputHandle>(null)
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

  useEffect(() => {
    if (ogData && debouncedUrl !== defaultUrl) {
      const timer = setTimeout(() => {
        void urlInputRef.current?.saveToHistory(debouncedUrl, ogData.favicon)
      }, SAVE_DELAY_MS)
      return () => clearTimeout(timer)
    }
  }, [ogData, debouncedUrl, defaultUrl])

  const bootstrappingUrl = !hasReadStoredUrl
  const previewsLoading = bootstrappingUrl || isLoading

  const Icon = previewsLoading
    ? CircleDotDashedIcon
    : error
      ? AlertCircleIcon
      : GlobeIcon

  const showFavicon = !previewsLoading && !error && ogData?.favicon

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
              ref={urlInputRef}
              defaultUrl={defaultUrl}
              onStateChange={handleUrlInputStateChange}
              inputClassName={
                error
                  ? 'border-red-500/50 bg-red-950/30! focus-visible:border-red-500/70!'
                  : 'border-neutral-800 bg-neutral-900/50! focus-visible:border-neutral-700!'
              }
              prefix={
                showFavicon ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={ogData.favicon}
                    alt=""
                    className="pointer-events-none absolute top-1/2 left-4 z-10 h-4 w-4 -translate-y-1/2 rounded-sm object-contain"
                  />
                ) : (
                  <Icon
                    className={cn(
                      'pointer-events-none absolute top-1/2 left-4 z-10 h-4 w-4 -translate-y-1/2',
                      error ? 'text-red-400' : 'text-muted-foreground',
                      previewsLoading && 'animate-spin'
                    )}
                  />
                )
              }
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
