import { useState, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

export type StoryLoadingToggleProps = {
  children: (isLoading: boolean) => ReactNode
  className?: string
  initialIsLoading?: boolean
}

export function StoryLoadingToggle(props: StoryLoadingToggleProps) {
  const [isLoading, setIsLoading] = useState(props.initialIsLoading ?? true)

  return (
    <div className={cn('flex flex-col items-center gap-6', props.className)}>
      <button
        type="button"
        onClick={() => setIsLoading((v) => !v)}
        className="text-foreground bg-background border-border hover:bg-secondary focus-visible:ring-ring squircle-2xl border px-4 py-2 text-sm font-medium shadow-sm transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
      >
        {isLoading ? 'Show loaded' : 'Show loading'}
      </button>
      {props.children(isLoading)}
    </div>
  )
}
