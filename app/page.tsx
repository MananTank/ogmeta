'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useQuery } from '@tanstack/react-query'
import { GlobeIcon, X } from 'lucide-react'
import { get, set } from 'idb-keyval'
import { FluidHeight } from 'fluid-height'
import { PlatformPreviews } from '@/components/platform-previews'
import { Input } from '../components/ui/input'

const DEFAULT_URL = 'https://vercel.com'
const URL_HISTORY_KEY = 'og-meta-url-history'
const MAX_HISTORY_ITEMS = 20
const SAVE_DELAY_MS = 3000

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
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [urlHistory, setUrlHistory] = useState<string[]>([])
  const debounceTimerRef = useRef<NodeJS.Timeout>(null)
  const saveTimerRef = useRef<NodeJS.Timeout>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const suggestionsRef = useRef<HTMLDivElement>(null)

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

  const loadHistory = useCallback(async () => {
    try {
      const history = await get<string[]>(URL_HISTORY_KEY)
      if (history) {
        setUrlHistory(history)
      }
    } catch (e) {
      console.error('Failed to load URL history:', e)
    }
  }, [])

  const normalizeUrl = (url: string) => {
    return url
      .trim()
      .replace(/^https?:\/\//, '')
      .replace(/\/$/, '')
  }

  const saveToHistory = useCallback(async (urlToSave: string) => {
    if (!isValidUrl(urlToSave)) return

    const normalized = normalizeUrl(urlToSave)
    if (!normalized) return

    try {
      const history = (await get<string[]>(URL_HISTORY_KEY)) || []
      const filtered = history.filter((u) => normalizeUrl(u) !== normalized)
      const newHistory = [normalized, ...filtered].slice(0, MAX_HISTORY_ITEMS)
      await set(URL_HISTORY_KEY, newHistory)
      setUrlHistory(newHistory)
    } catch (e) {
      console.error('Failed to save URL to history:', e)
    }
  }, [])

  const removeFromHistory = useCallback(async (urlToRemove: string) => {
    try {
      const history = (await get<string[]>(URL_HISTORY_KEY)) || []
      const newHistory = history.filter((u) => u !== urlToRemove)
      await set(URL_HISTORY_KEY, newHistory)
      setUrlHistory(newHistory)
    } catch (e) {
      console.error('Failed to remove URL from history:', e)
    }
  }, [])

  const normalizedInput = normalizeUrl(url).toLowerCase()
  const filteredSuggestions = urlHistory
    .filter(
      (historyUrl) =>
        historyUrl.toLowerCase().includes(url.toLowerCase()) &&
        historyUrl.toLowerCase() !== normalizedInput
    )
    .slice(0, 6)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUrl = e.target.value
    setUrl(newUrl)
    setShowSuggestions(true)

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
    }

    if (saveTimerRef.current) {
      clearTimeout(saveTimerRef.current)
    }

    debounceTimerRef.current = setTimeout(() => {
      setDebouncedUrl(newUrl)
    }, 500)

    saveTimerRef.current = setTimeout(() => {
      if (isValidUrl(newUrl)) {
        saveToHistory(newUrl)
      }
    }, SAVE_DELAY_MS)
  }

  const handleSelectSuggestion = (selectedUrl: string) => {
    setUrl(selectedUrl)
    setDebouncedUrl(selectedUrl)
    setShowSuggestions(false)
  }

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      e.key === 'ArrowDown' &&
      showSuggestions &&
      filteredSuggestions.length > 0
    ) {
      e.preventDefault()
      const firstButton = suggestionsRef.current?.querySelector('button')
      firstButton?.focus()
    } else if (e.key === 'Escape') {
      setShowSuggestions(false)
    }
  }

  const handleSuggestionKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    index: number
  ) => {
    const buttons = suggestionsRef.current?.querySelectorAll(
      'button[data-suggestion]'
    )
    if (!buttons) return

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      const nextButton = buttons[index + 1] as HTMLButtonElement | undefined
      nextButton?.focus()
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (index === 0) {
        inputRef.current?.focus()
      } else {
        const prevButton = buttons[index - 1] as HTMLButtonElement | undefined
        prevButton?.focus()
      }
    } else if (e.key === 'Escape') {
      setShowSuggestions(false)
      inputRef.current?.focus()
    }
  }

  useEffect(() => {
    loadHistory()
  }, [loadHistory])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }
      if (saveTimerRef.current) {
        clearTimeout(saveTimerRef.current)
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
            <GlobeIcon className="text-muted-foreground pointer-events-none absolute top-1/2 left-4 z-10 h-4 w-4 -translate-y-1/2" />
            <Input
              ref={inputRef}
              type="text"
              value={url}
              aria-label="URL"
              onChange={handleInputChange}
              onKeyDown={handleInputKeyDown}
              placeholder="Enter a URL"
              className="h-10 rounded-xl border-neutral-800 bg-neutral-900/50 pr-4 pl-10 placeholder:text-neutral-600 focus-visible:border-neutral-700 focus-visible:ring-0"
            />
            <div
              ref={suggestionsRef}
              className="absolute top-full right-0 left-0 z-50 mt-2 overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900 shadow-lg"
              style={{
                display:
                  showSuggestions && filteredSuggestions.length > 0
                    ? 'block'
                    : 'none',
              }}
            >
              <div className="p-1">
                <p className="text-muted-foreground px-3 py-1.5 text-xs">
                  Recent
                </p>
                <FluidHeight transitionDurationMs={150}>
                  {filteredSuggestions.map((historyUrl, index) => (
                    <div
                      key={historyUrl}
                      className="group flex items-center rounded-lg focus-within:bg-neutral-800 hover:bg-neutral-800"
                    >
                      <button
                        data-suggestion
                        onClick={() => handleSelectSuggestion(historyUrl)}
                        onKeyDown={(e) => handleSuggestionKeyDown(e, index)}
                        className="flex flex-1 items-center gap-3 px-3 py-2 text-left text-sm outline-none"
                      >
                        <GlobeIcon className="text-muted-foreground h-4 w-4 shrink-0" />
                        <span className="text-foreground truncate">
                          {historyUrl}
                        </span>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          removeFromHistory(historyUrl)
                        }}
                        className="text-muted-foreground hover:text-foreground mr-2 p-1 opacity-0 group-hover:opacity-100"
                        aria-label="Remove from history"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </FluidHeight>
              </div>
            </div>
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
