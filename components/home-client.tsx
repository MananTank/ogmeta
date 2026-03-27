'use client'

import { useState } from 'react'
import type { PreviewViewport } from '@/lib/preview-viewport'
import { useQuery } from '@tanstack/react-query'
import { PlatformPreviews } from '@/components/previews/index'
import {
  HomeUrlInput,
  isValidUrl,
  normalizeUrlForFetch,
} from '@/components/home-url-input'
import { DEFAULT_URL, SOURCE_REPO_URL } from '@/lib/constants'
import { fetchOGData } from '@/lib/og'
import type { OGMetadata } from '@/lib/og-types'
import { PreviewControls } from './preview-controls'
import { InspectionPanelIcon } from 'lucide-react'

export function HomeClient(props: { defaultURLData: OGMetadata | null }) {
  const [debouncedUrl, setDebouncedUrl] = useState(DEFAULT_URL)
  const [hasReadStoredUrl, setHasReadStoredUrl] = useState(false)
  const [previewViewport, setPreviewViewport] =
    useState<PreviewViewport>('desktop')
  const urlIsValid = isValidUrl(debouncedUrl)

  const ogQuery = useQuery({
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
      debouncedUrl === DEFAULT_URL && props.defaultURLData
        ? props.defaultURLData
        : undefined,
  })

  const isLoading = ogQuery.isFetching || !hasReadStoredUrl

  const errorMessage = !debouncedUrl
    ? undefined
    : ogQuery.error
      ? 'Failed to fetch opengraph metadata'
      : !urlIsValid
        ? 'Invalid URL'
        : null

  return (
    <main className="min-h-screen pb-8">
      <div className="mx-auto max-w-2xl px-6 py-32">
        <header className="text-center">
          <div className="flex items-center justify-center">
            <InspectionPanelIcon className="text-muted-foreground/50 size-12" />
          </div>
          <h1 className="sr-only">og meta</h1>
          <div className="h-12" />
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
            <HomeUrlInput
              debouncedUrl={debouncedUrl}
              setDebouncedUrl={setDebouncedUrl}
              hasReadStoredUrl={hasReadStoredUrl}
              setHasReadStoredUrl={setHasReadStoredUrl}
              fetchedOgMetadata={ogQuery.data}
              isLoading={isLoading}
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
          <p className="text-destructive fade-in-0 animate-in mt-3 text-center text-sm font-medium">
            {errorMessage}
          </p>
        )}
      </div>

      <PlatformPreviews
        data={ogQuery.data ?? null}
        isLoading={isLoading}
        isError={hasReadStoredUrl && !!ogQuery.error}
        previewViewport={previewViewport}
        urlInput={debouncedUrl}
        isValidUrl={urlIsValid}
      />

      <footer className="text-muted-foreground mx-auto mt-40 max-w-2xl px-4 pb-6 text-center text-base">
        <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
          <span>
            Made by{' '}
            <a
              href="https://x.com/MananTank_"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground underline-offset-2 transition-colors hover:underline"
            >
              Manan Tank
            </a>
          </span>
          <span aria-hidden className="text-muted-foreground/40">
            ·
          </span>
          <a
            href={SOURCE_REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground underline-offset-2 transition-colors hover:underline"
          >
            GitHub
          </a>
        </p>
      </footer>
    </main>
  )
}
