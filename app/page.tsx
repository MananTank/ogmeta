'use client'

import { useState, useEffect, useRef } from 'react'
import { useQuery } from '@tanstack/react-query'
import { GlobeIcon, Search } from 'lucide-react'
import { PlatformPreviews } from '@/components/platform-previews'
import { Input } from '../components/ui/input'
import { AppIcon } from '@/components/icons/app'

const DEFAULT_URL = 'https://vercel.com'

function isValidUrl(urlString: string): boolean {
  if (!urlString.includes('.')) {
    return false
  }
  try {
    let testUrl = urlString.trim()
    if (!testUrl.startsWith('http://') && !testUrl.startsWith('https://')) {
      testUrl = 'https://' + testUrl
    }
    new URL(testUrl)
    return true
  } catch {
    return false
  }
}

interface OGData {
  title: string
  description: string
  image: string
  isValidImage: boolean
  url: string
  siteName?: string
  type?: string
}

async function fetchOGData(url: string): Promise<OGData> {
  let finalUrl = url.trim()

  if (!finalUrl.startsWith('http://') && !finalUrl.startsWith('https://')) {
    finalUrl = 'https://' + finalUrl
  }

  const response = await fetch(`/api/og?url=${encodeURIComponent(finalUrl)}`)

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.error || 'Failed to fetch metadata')
  }

  return response.json()
}

export default function Home() {
  const [url, setUrl] = useState(DEFAULT_URL)
  const [debouncedUrl, setDebouncedUrl] = useState(DEFAULT_URL)
  const debounceTimerRef = useRef<NodeJS.Timeout>(null)

  const urlIsValid = isValidUrl(debouncedUrl)

  const {
    data: ogData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['og', debouncedUrl],
    queryFn: () => fetchOGData(debouncedUrl),
    enabled: urlIsValid,
    retry: false,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUrl = e.target.value
    setUrl(newUrl)

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
    }

    debounceTimerRef.current = setTimeout(() => {
      setDebouncedUrl(newUrl)
    }, 500)
  }

  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }
    }
  }, [])

  return (
    <main className="min-h-screen px-4">
      <div className="mx-auto max-w-3xl pt-32 pb-24">
        <header className="mb-8 text-center">
          {/* <AppIcon className="text-muted-foreground mx-auto mb-8 size-[160px]" /> */}
          <h1 className="font-sans text-5xl font-semibold tracking-tight md:text-5xl">
            <span className="text-foreground">Preview link on</span>
            <br />
            <span className="text-muted-foreground">social platforms</span>
          </h1>
          <p className="text-muted-foreground mt-4 text-base">
            Fast. Accurate. Open Source
          </p>
        </header>

        <div className="mx-auto w-full max-w-lg space-y-3">
          <div className="relative">
            <GlobeIcon className="text-muted-foreground pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2" />
            <Input
              type="text"
              value={url}
              aria-label="URL"
              onChange={handleInputChange}
              placeholder="Enter a URL"
              className="h-10 rounded-xl border-neutral-800 bg-neutral-900/50 pr-4 pl-10 placeholder:text-neutral-600 focus-visible:border-neutral-700 focus-visible:ring-0"
            />
          </div>
          {error && (
            <p className="text-destructive/90 flex items-center gap-2 text-[13px]">
              <span className="inline-block h-1 w-1 rounded-full bg-current" />
              {error instanceof Error
                ? error.message
                : 'Failed to fetch metadata'}
            </p>
          )}
        </div>
      </div>
      <PlatformPreviews
        title={ogData?.title ?? ''}
        description={ogData?.description ?? ''}
        image={ogData?.image ?? ''}
        isValidImage={ogData?.isValidImage ?? false}
        url={ogData?.url ?? debouncedUrl}
        isLoading={isLoading}
        isError={!!error}
        isValidUrl={urlIsValid}
      />
    </main>
  )
}
