'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { PlatformPreviews } from '@/components/platform-previews'
import {
  HomeUrlInput,
  isValidUrl,
  normalizeUrlForFetch,
} from '@/components/home-url-input'
import { DEFAULT_URL } from '@/lib/constants'
import { fetchOGData, type OGMetadata } from '@/lib/og'
import { ThemeToggle } from './theme-toggle'
import { InspectionPanelIcon } from 'lucide-react'

export function HomeClient(props: { defaultURLData: OGMetadata | null }) {
  const [debouncedUrl, setDebouncedUrl] = useState(DEFAULT_URL)
  const [hasReadStoredUrl, setHasReadStoredUrl] = useState(false)
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
      <div className="fixed top-6 right-6">
        <ThemeToggle />
      </div>

      <div className="mx-auto max-w-3xl py-32">
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
      />
    </main>
  )
}
