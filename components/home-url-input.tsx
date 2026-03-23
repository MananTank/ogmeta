'use client'

import {
  useState,
  useEffect,
  useLayoutEffect,
  useRef,
  useCallback,
} from 'react'
import { get, set } from 'idb-keyval'
import {
  AlertCircleIcon,
  CircleDotDashedIcon,
  GlobeIcon,
  X,
} from 'lucide-react'
import { FluidHeight } from 'fluid-height'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import type { OGMetadata } from '@/lib/og'

const SAVE_DELAY_MS = 3000

export const URL_HISTORY_KEY = 'og-meta-url-history'
const LAST_URL_STORAGE_KEY = 'og-meta-last-url'
export const URL_SEARCH_PARAM = 'url'
const MAX_HISTORY_ITEMS = 20

interface HistoryItem {
  url: string
  favicon?: string
}

export function isValidUrl(urlString: string): boolean {
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

export function normalizeUrlForFetch(url: string): string {
  let finalUrl = url.trim()
  if (!finalUrl.startsWith('http://') && !finalUrl.startsWith('https://')) {
    finalUrl = 'https://' + finalUrl
  }
  return finalUrl
}

function readUrlParamFromWindow(): string {
  if (typeof window === 'undefined') return ''
  return (
    new URLSearchParams(window.location.search).get(URL_SEARCH_PARAM)?.trim() ??
    ''
  )
}

function normalizeUrl(url: string) {
  return url
    .trim()
    .replace(/^https?:\/\//, '')
    .replace(/\/$/, '')
}

export interface HomeUrlInputState {
  debouncedUrl: string
  hasReadStoredUrl: boolean
  urlIsValid: boolean
}

export interface HomeUrlInputProps {
  defaultUrl: string
  onStateChange: (state: HomeUrlInputState) => void
  /** When set after a successful OG fetch, URL is saved to history after a short delay. */
  fetchedOgMetadata?: OGMetadata | null
  /** OG query loading (excluding local URL bootstrap; that is handled inside the input). */
  ogFetchLoading?: boolean
  ogFetchError?: boolean
}

export function HomeUrlInput({
  defaultUrl,
  onStateChange,
  fetchedOgMetadata,
  ogFetchLoading = false,
  ogFetchError = false,
}: HomeUrlInputProps) {
  const [url, setUrl] = useState(defaultUrl)
  const [debouncedUrl, setDebouncedUrl] = useState(defaultUrl)
  const [hasReadStoredUrl, setHasReadStoredUrl] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [urlHistory, setUrlHistory] = useState<HistoryItem[]>([])
  const debounceTimerRef = useRef<NodeJS.Timeout>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const suggestionsRef = useRef<HTMLDivElement>(null)
  const syncUrlSearchParamRef = useRef(false)
  const [locationRevision, setLocationRevision] = useState(0)

  const urlIsValid = isValidUrl(debouncedUrl)

  useEffect(() => {
    onStateChange({ debouncedUrl, hasReadStoredUrl, urlIsValid })
  }, [debouncedUrl, hasReadStoredUrl, urlIsValid, onStateChange])

  useLayoutEffect(() => {
    let paramUrl: string | null = null
    try {
      const raw = new URLSearchParams(window.location.search)
        .get(URL_SEARCH_PARAM)
        ?.trim()
      if (raw && isValidUrl(raw)) {
        paramUrl = raw
        syncUrlSearchParamRef.current = true
      }
    } catch {
      // ignore
    }

    if (paramUrl) {
      setUrl(paramUrl)
      setDebouncedUrl(paramUrl)
    } else {
      try {
        const raw = localStorage.getItem(LAST_URL_STORAGE_KEY)?.trim()
        if (raw && isValidUrl(raw)) {
          setUrl(raw)
          setDebouncedUrl(raw)
        }
      } catch {
        // ignore
      }
    }
    setHasReadStoredUrl(true)
  }, [])

  useEffect(() => {
    if (!urlIsValid) return
    try {
      localStorage.setItem(LAST_URL_STORAGE_KEY, debouncedUrl.trim())
    } catch {
      // ignore
    }
  }, [debouncedUrl, urlIsValid])

  useEffect(() => {
    const onPopState = () => setLocationRevision((n) => n + 1)
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  useLayoutEffect(() => {
    if (!hasReadStoredUrl) return
    const urlFromSearch = readUrlParamFromWindow()
    if (!urlFromSearch || !isValidUrl(urlFromSearch)) return
    setUrl((prev) => (prev.trim() === urlFromSearch ? prev : urlFromSearch))
    setDebouncedUrl((prev) =>
      prev.trim() === urlFromSearch ? prev : urlFromSearch
    )
  }, [hasReadStoredUrl, locationRevision])

  useEffect(() => {
    if (!hasReadStoredUrl) return

    const applyQuery = (
      params: URLSearchParams,
      mode: 'replace' | 'push' = 'replace'
    ) => {
      const qs = params.toString()
      const path = window.location.pathname
      const href = qs ? `${path}?${qs}` : path
      const state = window.history.state
      if (mode === 'push') {
        window.history.pushState(state, '', href)
      } else {
        window.history.replaceState(state, '', href)
      }
    }

    const searchParams = new URLSearchParams(window.location.search)
    const rawParam = searchParams.get(URL_SEARCH_PARAM)?.trim()
    if (rawParam && !isValidUrl(rawParam)) {
      const params = new URLSearchParams(window.location.search)
      params.delete(URL_SEARCH_PARAM)
      applyQuery(params, 'replace')
      return
    }

    if (!syncUrlSearchParamRef.current) return

    if (!urlIsValid) {
      if (searchParams.has(URL_SEARCH_PARAM)) {
        const params = new URLSearchParams(window.location.search)
        params.delete(URL_SEARCH_PARAM)
        applyQuery(params, 'replace')
      }
      return
    }

    const v = debouncedUrl.trim()
    if (v === defaultUrl) {
      if (searchParams.has(URL_SEARCH_PARAM)) {
        const params = new URLSearchParams(window.location.search)
        params.delete(URL_SEARCH_PARAM)
        applyQuery(params, 'replace')
      }
      return
    }

    const inBar = searchParams.get(URL_SEARCH_PARAM)?.trim() ?? null
    if (inBar === v) return

    const params = new URLSearchParams(window.location.search)
    params.set(URL_SEARCH_PARAM, v)
    applyQuery(params, 'push')
  }, [hasReadStoredUrl, debouncedUrl, urlIsValid, defaultUrl])

  const saveToHistory = useCallback(
    async (urlToSave: string, favicon?: string) => {
      if (!isValidUrl(urlToSave)) return

      const normalized = normalizeUrl(urlToSave)
      if (!normalized) return

      try {
        const history =
          (await get<HistoryItem[] | string[]>(URL_HISTORY_KEY)) || []
        const normalizedHistory: HistoryItem[] = history.map((item) =>
          typeof item === 'string' ? { url: item } : item
        )
        const filtered = normalizedHistory.filter(
          (item) => normalizeUrl(item.url) !== normalized
        )
        const newItem: HistoryItem = { url: normalized, favicon }
        const newHistory = [newItem, ...filtered].slice(0, MAX_HISTORY_ITEMS)
        await set(URL_HISTORY_KEY, newHistory)
        setUrlHistory(newHistory)
      } catch (e) {
        console.error('Failed to save URL to history:', e)
      }
    },
    []
  )

  useEffect(() => {
    if (!fetchedOgMetadata || debouncedUrl === defaultUrl) return
    const timer = setTimeout(() => {
      void saveToHistory(debouncedUrl, fetchedOgMetadata.favicon)
    }, SAVE_DELAY_MS)
    return () => clearTimeout(timer)
  }, [fetchedOgMetadata, debouncedUrl, defaultUrl, saveToHistory])

  const removeFromHistory = useCallback(async (urlToRemove: string) => {
    try {
      const history =
        (await get<HistoryItem[] | string[]>(URL_HISTORY_KEY)) || []
      const normalizedHistory: HistoryItem[] = history.map((item) =>
        typeof item === 'string' ? { url: item } : item
      )
      const newHistory = normalizedHistory.filter(
        (item) => item.url !== urlToRemove
      )
      await set(URL_HISTORY_KEY, newHistory)
      setUrlHistory(newHistory)
    } catch (e) {
      console.error('Failed to remove URL from history:', e)
    }
  }, [])

  const normalizedInput = normalizeUrl(url).toLowerCase()
  const filteredSuggestions = urlHistory
    .filter(
      (item) =>
        item.url.toLowerCase().includes(url.toLowerCase()) &&
        item.url.toLowerCase() !== normalizedInput
    )
    .slice(0, 6)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    syncUrlSearchParamRef.current = true
    const newUrl = e.target.value
    setUrl(newUrl)
    setShowSuggestions(true)

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
    }

    debounceTimerRef.current = setTimeout(() => {
      setDebouncedUrl(newUrl)
    }, 500)
  }

  const handleSelectSuggestion = (selectedUrl: string) => {
    syncUrlSearchParamRef.current = true
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
    let cancelled = false
    ;(async () => {
      try {
        const history = await get<HistoryItem[] | string[]>(URL_HISTORY_KEY)
        if (!history || cancelled) return
        const normalizedHistory: HistoryItem[] = history.map((item) =>
          typeof item === 'string' ? { url: item } : item
        )
        setUrlHistory(normalizedHistory)
      } catch (e) {
        if (!cancelled) {
          console.error('Failed to load URL history:', e)
        }
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

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
    }
  }, [])

  const previewsLoading = !hasReadStoredUrl || ogFetchLoading
  const Icon = previewsLoading
    ? CircleDotDashedIcon
    : ogFetchError
      ? AlertCircleIcon
      : GlobeIcon
  const showFavicon =
    !previewsLoading && !ogFetchError && !!fetchedOgMetadata?.favicon

  return (
    <div className="relative">
      {showFavicon ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={fetchedOgMetadata.favicon}
          alt=""
          className="pointer-events-none absolute top-1/2 left-4 z-10 h-4 w-4 -translate-y-1/2 rounded-sm object-contain"
        />
      ) : (
        <Icon
          className={cn(
            'pointer-events-none absolute top-1/2 left-4 z-10 h-4 w-4 -translate-y-1/2',
            ogFetchError ? 'text-red-400' : 'text-muted-foreground',
            previewsLoading && 'animate-spin'
          )}
        />
      )}
      <Input
        ref={inputRef}
        type="text"
        value={url}
        aria-label="URL"
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        placeholder="Enter a URL"
        className={cn(
          'h-10 rounded-xl pr-4 pl-10 placeholder:text-neutral-600 focus-visible:ring-0',
          ogFetchError
            ? 'border-red-500/50 bg-red-950/30! focus-visible:border-red-500/70!'
            : 'border-neutral-800 bg-neutral-900/50! focus-visible:border-neutral-700!'
        )}
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
          <p className="text-muted-foreground px-3 py-1.5 text-xs">Recent</p>
          <FluidHeight transitionDurationMs={150}>
            {filteredSuggestions.map((item, index) => (
              <div
                key={item.url}
                className="group flex items-center rounded-lg focus-within:bg-neutral-800 hover:bg-neutral-800"
              >
                <button
                  data-suggestion
                  type="button"
                  onClick={() => handleSelectSuggestion(item.url)}
                  onKeyDown={(e) => handleSuggestionKeyDown(e, index)}
                  className="flex flex-1 items-center gap-3 px-3 py-2 text-left text-sm outline-none"
                >
                  {item.favicon ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.favicon}
                      alt=""
                      className="h-4 w-4 shrink-0 rounded-sm object-contain"
                    />
                  ) : (
                    <GlobeIcon className="text-muted-foreground h-4 w-4 shrink-0" />
                  )}
                  <span className="text-foreground truncate">{item.url}</span>
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    removeFromHistory(item.url)
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
  )
}
