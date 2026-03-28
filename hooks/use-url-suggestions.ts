'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { get, set } from 'idb-keyval'
import { DEFAULT_URL } from '@/lib/constants'
import { isValidUrl, normalizeUrl } from '@/lib/url'
import type { Metadata } from '@/lib/og-types'

export const URL_HISTORY_KEY = 'og-meta-url-history'

const MAX_HISTORY_ITEMS = 20
const SAVE_DELAY_MS = 3000

export interface UrlHistoryItem {
  url: string
  favicon?: string
}

export function useUrlSuggestions(options: {
  debouncedUrl: string
  fetchedOgMetadata?: Metadata | null
  inputValue: string
}) {
  const { debouncedUrl, fetchedOgMetadata, inputValue } = options
  const [urlHistory, setUrlHistory] = useState<UrlHistoryItem[]>([])

  const saveToHistory = useCallback(
    async (urlToSave: string, favicon?: string) => {
      if (!isValidUrl(urlToSave)) return

      const normalized = normalizeUrl(urlToSave)
      if (!normalized) return

      try {
        const history =
          (await get<UrlHistoryItem[] | string[]>(URL_HISTORY_KEY)) || []
        const normalizedHistory: UrlHistoryItem[] = history.map((item) =>
          typeof item === 'string' ? { url: item } : item
        )
        const filtered = normalizedHistory.filter(
          (item) => normalizeUrl(item.url) !== normalized
        )
        const newItem: UrlHistoryItem = { url: normalized, favicon }
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
    const meta = fetchedOgMetadata
    if (!meta || debouncedUrl === DEFAULT_URL) return
    const timer = setTimeout(() => {
      void saveToHistory(debouncedUrl, meta.favicon)
    }, SAVE_DELAY_MS)
    return () => clearTimeout(timer)
  }, [fetchedOgMetadata, debouncedUrl, saveToHistory])

  const removeFromHistory = useCallback(async (urlToRemove: string) => {
    try {
      const history =
        (await get<UrlHistoryItem[] | string[]>(URL_HISTORY_KEY)) || []
      const normalizedHistory: UrlHistoryItem[] = history.map((item) =>
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

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const history = await get<UrlHistoryItem[] | string[]>(URL_HISTORY_KEY)
        if (!history || cancelled) return
        const normalizedHistory: UrlHistoryItem[] = history.map((item) =>
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

  const filteredSuggestions = useMemo(() => {
    const normalizedInput = normalizeUrl(inputValue).toLowerCase()
    return urlHistory
      .filter(
        (item) =>
          item.url.toLowerCase().includes(inputValue.toLowerCase()) &&
          item.url.toLowerCase() !== normalizedInput
      )
      .slice(0, 6)
  }, [urlHistory, inputValue])

  return { filteredSuggestions, removeFromHistory }
}
