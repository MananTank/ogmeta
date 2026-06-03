'use client'

import { useQuery } from '@tanstack/react-query'
import { AlertTriangleIcon } from 'lucide-react'
import { useMemo, useState } from 'react'
import { URLInput } from '@/app/(app)/components/url-input'
import { useURL } from '@/app/(app)/hooks/use-url'
import { DEFAULT_URL } from '@/lib/constants'
import { fetchDocumentMetadata } from '@/lib/og'
import type { DocumentMetadata } from '@/lib/og-types'
import type { PreviewViewport } from '@/lib/preview-viewport'
import { isValidUrl, normalizeUrlForFetch } from '@/lib/url'
import { PreviewControls } from './preview-controls'
import { PlatformPreviews } from './previews/index'

export function App(props: { defaultURLData: DocumentMetadata | null }) {
  const { url, setUrl, isURLReady } = useURL()
  const [previewViewport, setPreviewViewport] =
    useState<PreviewViewport>('desktop')
  const urlIsValid = isValidUrl(url)
  const queryEnabled = isURLReady && urlIsValid

  const ogQuery = useQuery({
    queryKey: ['og', url],
    queryFn: async () => {
      const result = await fetchDocumentMetadata(normalizeUrlForFetch(url))
      if (result.type === 'error') {
        throw new Error(result.error)
      }
      return result.data
    },
    enabled: queryEnabled,
    retry: false,
    initialData:
      url === DEFAULT_URL && props.defaultURLData
        ? props.defaultURLData
        : undefined,
  })

  const showLoadingState = ogQuery.isFetching || !isURLReady

  const normalizedUrl = useMemo(
    () => (url ? normalizeUrlForFetch(url) : ''),
    [url]
  )

  const errorMessage = !url
    ? undefined
    : ogQuery.error
      ? 'Failed to fetch opengraph metadata'
      : !urlIsValid
        ? 'Invalid URL'
        : null

  return (
    <main>
      <div className="mx-auto max-w-2xl px-6 pt-24 pb-24 md:pt-32">
        <header className="flex flex-col items-center text-center">
          <h1 className="sr-only">og meta</h1>
          <p className="text-foreground font-sans text-xl font-medium tracking-tight text-pretty md:text-3xl">
            Preview links on social platforms
          </p>
          <p className="text-muted-foreground mt-2 text-sm font-medium md:text-base">
            Fast, Accurate, Open Source
          </p>
        </header>

        <div className="h-8" />

        <div className="flex w-full flex-col gap-5 sm:flex-row sm:items-start sm:gap-2.5">
          <div className="min-w-0 flex-1">
            <URLInput
              debouncedUrl={url}
              setDebouncedUrl={setUrl}
              isURLReady={isURLReady}
              metadata={ogQuery.data}
              isLoading={showLoadingState}
              isError={!!errorMessage}
            />
          </div>
          <PreviewControls
            className="shrink-0 justify-center"
            viewport={previewViewport}
            onViewportChange={setPreviewViewport}
          />
        </div>

        {errorMessage && (
          <div className="relative flex items-center justify-center">
            <p className="text-destructive fade-in-0 border-destructive/10 animate-in bg-destructive/10 zoom-in-95 slide-in-from-top-2 absolute top-4 flex items-center gap-2 rounded-full border px-3 py-1.5 text-center text-sm font-medium duration-300">
              <AlertTriangleIcon className="text-destructive size-3.5" />
              {errorMessage}
            </p>
          </div>
        )}
      </div>

      <PlatformPreviews
        data={ogQuery.data ?? null}
        isLoading={showLoadingState}
        isError={isURLReady && !!ogQuery.error}
        previewViewport={previewViewport}
        urlInput={normalizedUrl}
        isValidUrl={urlIsValid}
        isURLReady={isURLReady}
      />
    </main>
  )
}
