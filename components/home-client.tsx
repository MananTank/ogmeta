'use client'

import { useState } from 'react'
import type { PreviewViewport } from '@/lib/preview-viewport'
import { useQuery } from '@tanstack/react-query'
import { PlatformPreviews } from '@/components/platform-previews'
import {
  HomeUrlInput,
  isValidUrl,
  normalizeUrlForFetch,
} from '@/components/home-url-input'
import { DEFAULT_URL } from '@/lib/constants'
import { fetchOGData, type OGMetadata } from '@/lib/og'
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

  return (
    <main className="min-h-screen px-4 pb-32">
      <div className="mx-auto max-w-2xl py-32">
        <header className="text-center">
          <div className="flex items-center justify-center">
            <InspectionPanelIcon className="text-muted-foreground size-12" />
          </div>
          <h1 className="sr-only">og meta</h1>
          <div className="h-12" />
          <p className="font-sans text-5xl font-semibold tracking-tight md:text-5xl">
            <span className="text-foreground">Preview links on</span>
            <br />
            <span className="text-muted-foreground">social platforms</span>
          </p>
          <p className="text-muted-foreground mt-5 text-base font-medium">
            Fast, Accurate, Open Source
          </p>
        </header>

        <div className="h-10" />

        <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-start sm:gap-3">
          <div className="min-w-0 flex-1">
            <HomeUrlInput
              debouncedUrl={debouncedUrl}
              setDebouncedUrl={setDebouncedUrl}
              hasReadStoredUrl={hasReadStoredUrl}
              setHasReadStoredUrl={setHasReadStoredUrl}
              fetchedOgMetadata={ogQuery.data}
              ogFetchError={!!ogQuery.error}
              ogFetchLoading={isLoading}
            />
          </div>
          <PreviewControls
            className="shrink-0 justify-center sm:pt-0.5"
            viewport={previewViewport}
            onViewportChange={setPreviewViewport}
          />
        </div>
      </div>

      <PlatformPreviews
        title={ogQuery.data?.title ?? ''}
        description={ogQuery.data?.description ?? ''}
        image={ogQuery.data?.image ?? ''}
        isValidImage={ogQuery.data?.isValidImage ?? false}
        favicon={ogQuery.data?.favicon}
        url={ogQuery.data?.url ?? debouncedUrl}
        isLoading={isLoading}
        isError={hasReadStoredUrl && !!ogQuery.error}
        isValidUrl={urlIsValid}
        previewViewport={previewViewport}
      />
    </main>
  )
}
