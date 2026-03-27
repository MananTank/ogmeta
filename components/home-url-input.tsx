'use client'

import {
  useState,
  useEffect,
  useLayoutEffect,
  useRef,
  useCallback,
  type Dispatch,
  type SetStateAction,
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
import { DEFAULT_URL } from '@/lib/constants'
import { cn } from '@/lib/utils'
import type { OGMetadata } from '@/lib/og-types'

const SAVE_DELAY_MS = 3000

export const URL_HISTORY_KEY = 'og-meta-url-history'
const LAST_URL_STORAGE_KEY = 'og-meta-last-url'
export const URL_SEARCH_PARAM = 'url'
const MAX_HISTORY_ITEMS = 20

interface HistoryItem {
  url: string
  favicon?: string
}

/** Hosts that are valid without a dot (e.g. localhost, loopback) so we can test fixture URLs locally. */
function isLocalOrLoopbackHostname(hostname: string): boolean {
  const h = hostname.toLowerCase()
  return (
    h === 'localhost' ||
    h.endsWith('.localhost') ||
    h === '127.0.0.1' ||
    h === '::1' ||
    h === '[::1]'
  )
}

export function isValidUrl(urlString: string): boolean {
  const trimmed = urlString.trim()
  if (!trimmed) return false
  try {
    let testUrl = trimmed
    if (!testUrl.startsWith('http://') && !testUrl.startsWith('https://')) {
      testUrl = 'https://' + testUrl
    }
    const u = new URL(testUrl)
    if (u.protocol !== 'http:' && u.protocol !== 'https:') return false
    if (!u.hostname) return false
    return u.hostname.includes('.') || isLocalOrLoopbackHostname(u.hostname)
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

export function HomeUrlInput(props: {
  debouncedUrl: string
  setDebouncedUrl: Dispatch<SetStateAction<string>>
  hasReadStoredUrl: boolean
  setHasReadStoredUrl: Dispatch<SetStateAction<boolean>>
  fetchedOgMetadata?: OGMetadata | null
  isLoading: boolean
  isError: boolean
}) {
  const [url, setUrl] = useState(DEFAULT_URL)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [urlHistory, setUrlHistory] = useState<HistoryItem[]>([])
  const debounceTimerRef = useRef<NodeJS.Timeout>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const suggestionsRef = useRef<HTMLDivElement>(null)
  const syncUrlSearchParamRef = useRef(false)
  const [locationRevision, setLocationRevision] = useState(0)

  const urlIsValid = isValidUrl(props.debouncedUrl)
  const { setDebouncedUrl, setHasReadStoredUrl, hasReadStoredUrl } = props

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
      // eslint-disable-next-line react-hooks/set-state-in-effect
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
  }, [setDebouncedUrl, setHasReadStoredUrl])

  useEffect(() => {
    if (!urlIsValid) return
    try {
      localStorage.setItem(LAST_URL_STORAGE_KEY, props.debouncedUrl.trim())
    } catch {
      // ignore
    }
  }, [props.debouncedUrl, urlIsValid])

  useEffect(() => {
    const onPopState = () => setLocationRevision((n) => n + 1)
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  useLayoutEffect(() => {
    if (!hasReadStoredUrl) return
    const urlFromSearch = readUrlParamFromWindow()
    if (!urlFromSearch || !isValidUrl(urlFromSearch)) return
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUrl((prev) => (prev.trim() === urlFromSearch ? prev : urlFromSearch))
    setDebouncedUrl((prev) =>
      prev.trim() === urlFromSearch ? prev : urlFromSearch
    )
  }, [hasReadStoredUrl, locationRevision, setDebouncedUrl])

  useEffect(() => {
    if (!props.hasReadStoredUrl) return

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

    const v = props.debouncedUrl.trim()
    if (v === DEFAULT_URL) {
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
  }, [props.hasReadStoredUrl, props.debouncedUrl, urlIsValid])

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
    const meta = props.fetchedOgMetadata
    if (!meta || props.debouncedUrl === DEFAULT_URL) return
    const timer = setTimeout(() => {
      void saveToHistory(props.debouncedUrl, meta.favicon)
    }, SAVE_DELAY_MS)
    return () => clearTimeout(timer)
  }, [props.fetchedOgMetadata, props.debouncedUrl, saveToHistory])

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
      props.setDebouncedUrl(newUrl)
    }, 500)
  }

  const handleSelectSuggestion = (selectedUrl: string) => {
    syncUrlSearchParamRef.current = true
    setUrl(selectedUrl)
    props.setDebouncedUrl(selectedUrl)
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

  const previewsLoading = !props.hasReadStoredUrl || props.isLoading
  const Icon = previewsLoading
    ? CircleDotDashedIcon
    : props.isError
      ? AlertCircleIcon
      : GlobeIcon
  const showFavicon =
    !previewsLoading && !props.isError && !!props.fetchedOgMetadata?.favicon

  return (
    <div className="w-full space-y-3">
      <div className="relative">
        {showFavicon ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={props.fetchedOgMetadata?.favicon ?? ''}
            alt=""
            className="pointer-events-none absolute top-1/2 left-4 z-10 h-4 w-4 -translate-y-1/2 rounded-sm object-contain"
          />
        ) : (
          <Icon
            className={cn(
              'pointer-events-none absolute top-1/2 left-4 z-10 h-4 w-4 -translate-y-1/2',
              props.isError ? 'text-destructive' : 'text-muted-foreground',
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
            'placeholder:text-muted-foreground focus-visible:border-border h-10 rounded-full border-transparent pr-4 pl-10 shadow-none focus-visible:ring-0',
            props.isError
              ? 'border-destructive/50 bg-destructive/10! focus-visible:border-destructive/70! text-destructive'
              : 'focus-visible:border-ring'
          )}
        />
        <div
          ref={suggestionsRef}
          className="border-border bg-popover text-popover-foreground absolute top-full right-0 left-0 z-50 mt-2 overflow-hidden rounded-xl border shadow-lg"
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
                  className="hover:bg-accent focus-within:bg-accent group flex items-center rounded-lg"
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
    </div>
  )
}
