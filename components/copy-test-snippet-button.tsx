'use client'

import { useRef, useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type Props = {
  pathname: string
  fullUrl: string
  className?: string
}

/** Copies `Testing opengraph {pathname}` + blank line + `{fullUrl}`. */
export function CopyTestSnippetButton(props: Props) {
  const [copied, setCopied] = useState(false)
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const snippet = `Testing opengraph ${props.pathname}\n\n${props.fullUrl}`

  async function handleCopy() {
    await navigator.clipboard.writeText(snippet)
    if (resetTimerRef.current != null) {
      clearTimeout(resetTimerRef.current)
    }
    setCopied(true)
    resetTimerRef.current = setTimeout(() => {
      setCopied(false)
      resetTimerRef.current = null
    }, 2000)
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-sm"
      aria-label={copied ? 'Copied' : 'Copy test snippet for this fixture'}
      className={cn(
        'text-muted-foreground group shrink-0 cursor-pointer rounded-full transition-none',
        props.className
      )}
      onClick={() => void handleCopy()}
    >
      {copied ? (
        <Check className="size-4 text-green-600" />
      ) : (
        <Copy className="text-muted-foreground/50 group-hover:text-foreground size-4" />
      )}
    </Button>
  )
}
