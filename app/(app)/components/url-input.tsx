'use client'

import { useState, useEffect, useLayoutEffect, useRef } from 'react'
import { CircleDotDashedIcon, GlobeIcon, X } from 'lucide-react'
import { FluidHeight } from 'fluid-height'
import { Input } from '@/components/ui/input'
import { DEFAULT_URL } from '@/lib/constants'
import { cn } from '@/lib/utils'
import {
  useUrlSuggestions,
  type UrlHistoryItem,
} from '@/app/(app)/hooks/use-url-suggestions'
import type { DocumentMetadata } from '@/lib/og-types'

export function URLInput(props: {
  debouncedUrl: string
  setDebouncedUrl: React.Dispatch<React.SetStateAction<string>>
  isURLReady: boolean
  metadata: DocumentMetadata | undefined
  isLoading: boolean
  isError: boolean
}) {
  const [url, setUrl] = useState(DEFAULT_URL)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const debounceTimerRef = useRef<NodeJS.Timeout>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const suggestionsRef = useRef<HTMLDivElement>(null)
  const syncedUrlFromParent = useRef(false)

  useLayoutEffect(() => {
    if (!props.isURLReady || syncedUrlFromParent.current) return
    syncedUrlFromParent.current = true
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUrl(props.debouncedUrl)
  }, [props.isURLReady, props.debouncedUrl])

  const { filteredSuggestions, removeFromHistory } = useUrlSuggestions({
    debouncedUrl: props.debouncedUrl,
    fetchedOgMetadata: props.metadata,
    inputValue: url,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const previewsLoading = !props.isURLReady || props.isLoading

  const Icon = previewsLoading ? CircleDotDashedIcon : GlobeIcon

  const showFavicon =
    !props.isLoading && !props.isError && !!props.metadata?.favicon

  return (
    <div className="w-full space-y-3">
      <div className="relative">
        {/* icon */}
        {showFavicon ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={props.metadata?.favicon ?? ''}
            alt=""
            className="pointer-events-none absolute top-1/2 left-4 z-10 h-4 w-4 -translate-y-1/2 rounded-sm object-contain"
          />
        ) : (
          <Icon
            className={cn(
              'text-muted-foreground pointer-events-none absolute top-1/2 left-4 z-10 h-4 w-4 -translate-y-1/2',
              previewsLoading && 'animate-spin'
            )}
          />
        )}

        <Input
          ref={inputRef}
          type="text"
          value={props.isURLReady ? url : ''}
          aria-label="URL"
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          placeholder={props.isURLReady ? 'Enter your URL' : ''}
          className={
            'placeholder:text-muted-foreground focus-visible:border-ring h-10 rounded-full border-transparent pr-4 pl-10 shadow-none focus-visible:ring-0'
          }
        />

        <UrlSuggestionsDropdown
          containerRef={suggestionsRef}
          visible={showSuggestions}
          items={filteredSuggestions}
          onSelect={handleSelectSuggestion}
          onSuggestionKeyDown={handleSuggestionKeyDown}
          onRemove={removeFromHistory}
        />
      </div>
    </div>
  )
}

function UrlSuggestionsDropdown(props: {
  containerRef: React.RefObject<HTMLDivElement | null>
  visible: boolean
  items: UrlHistoryItem[]
  onSelect: (url: string) => void
  onSuggestionKeyDown: (
    e: React.KeyboardEvent<HTMLButtonElement>,
    index: number
  ) => void
  onRemove: (url: string) => void
}) {
  const { containerRef } = props

  return (
    <div
      ref={containerRef}
      className="bg-popover text-popover-foreground absolute top-full right-0 left-0 z-50 mt-2 overflow-hidden rounded-xl shadow-lg"
      style={{
        display: props.visible && props.items.length > 0 ? 'block' : 'none',
      }}
    >
      <div className="p-1">
        <p className="text-muted-foreground px-3 py-1.5 text-xs">
          Recently Used
        </p>
        <FluidHeight transitionDurationMs={150}>
          {props.items.map((item, index) => (
            <div
              key={item.url}
              className="hover:bg-accent focus-within:bg-accent group flex items-center rounded-lg"
            >
              <button
                data-suggestion
                type="button"
                onClick={() => props.onSelect(item.url)}
                onKeyDown={(e) => props.onSuggestionKeyDown(e, index)}
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
                  props.onRemove(item.url)
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
  )
}
