'use client'

import {
  useState,
  useLayoutEffect,
  useEffect,
  type Dispatch,
  type SetStateAction,
  useMemo,
} from 'react'
import { DEFAULT_URL } from '@/lib/constants'
import { isValidUrl, URL_SEARCH_PARAM } from '@/lib/url'

const LAST_URL_STORAGE_KEY = 'og-meta-last-url'

export function useURL(): {
  url: string
  setUrl: Dispatch<SetStateAction<string>>
  isURLReady: boolean
  isURLValid: boolean
} {
  const [url, setUrl] = useState(DEFAULT_URL)
  const [isURLReady, setIsURLReady] = useState(false)
  const isURLValid = useMemo(() => isValidUrl(url), [url])

  // try getting the URL from the search params first
  // fallback to the last used URL
  // if neither are valid, keep the default URL
  useLayoutEffect(() => {
    let paramUrl: string | null = null
    try {
      const raw = new URLSearchParams(window.location.search)
        .get(URL_SEARCH_PARAM)
        ?.trim()
      if (raw && isValidUrl(raw)) {
        paramUrl = raw
      }
    } catch {
      // ignore
    }

    if (paramUrl) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUrl(paramUrl)
    } else {
      try {
        const raw = localStorage.getItem(LAST_URL_STORAGE_KEY)?.trim()
        if (raw && isValidUrl(raw)) {
          setUrl(raw)
        }
      } catch {
        // ignore
      }
    }
    setIsURLReady(true)
  }, [setUrl])

  useStoreLastUsedUrl({ url, enabled: isURLReady && isURLValid })
  useUpdateSearchParams({ url, enabled: isURLReady && isURLValid })

  return {
    url: url,
    setUrl: setUrl,
    isURLReady: isURLReady,
    isURLValid: isURLValid,
  }
}

export function useStoreLastUsedUrl(props: { url: string; enabled: boolean }) {
  const { url, enabled } = props
  useEffect(() => {
    if (!enabled) return
    try {
      localStorage.setItem(LAST_URL_STORAGE_KEY, url.trim())
    } catch {
      // ignore
    }
  }, [url, enabled])

  return null
}

export function useUpdateSearchParams(props: {
  url: string
  enabled: boolean
}) {
  const { url, enabled } = props

  useEffect(() => {
    if (!enabled) return
    const currentSearchParams = new URLSearchParams(window.location.search)
    currentSearchParams.set(URL_SEARCH_PARAM, url.trim())

    window.history.replaceState(
      window.history.state,
      '',
      `${window.location.pathname}?${currentSearchParams.toString()}`
    )
  }, [url, enabled])

  return null
}
