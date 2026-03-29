'use client'

import { useMemo, useState } from 'react'
import type { PreviewViewport } from '@/lib/preview-viewport'
import { useQuery } from '@tanstack/react-query'
import { PlatformPreviews } from './previews/index'
import { URLInput } from '@/app/(app)/components/url-input'
import { isValidUrl, normalizeUrlForFetch } from '@/lib/url'
import { useURL } from '@/app/(app)/hooks/use-url'
import { DEFAULT_URL } from '@/lib/constants'
import { fetchDocumentMetadata } from '@/lib/og'
import type { DocumentMetadata } from '@/lib/og-types'
import { PreviewControls } from './preview-controls'
import { AlertTriangleIcon, InspectionPanelIcon } from 'lucide-react'

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
      <div className="mx-auto max-w-2xl px-6 pt-32 pb-24 md:pt-36">
        <header className="text-center">
          {/* <div className="flex items-center justify-center">
            <InspectionPanelIcon className="text-muted-foreground/50 size-12" />
          </div> */}
          <h1 className="sr-only">og meta</h1>
          {/* <div className="h-12" /> */}
          <p className="font-sans text-4xl font-semibold tracking-tight md:text-5xl">
            <span className="text-foreground">Preview links on</span>
            <br />
            <span className="text-muted-foreground">social platforms</span>
          </p>
          <p className="text-muted-foreground mt-5 text-base font-medium">
            Fast, Accurate, Open Source
          </p>
        </header>

        <div className="h-10" />

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
