import * as React from 'react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function TabsContainer(props: {
  'aria-label': string
  className?: string
  children: React.ReactNode
}) {
  return (
    <div
      className={cn(
        'bg-muted inline-flex gap-1 rounded-full p-1',
        props.className
      )}
      role="radiogroup"
      aria-label={props['aria-label']}
    >
      {props.children}
    </div>
  )
}

export function TabButton(props: {
  selected: boolean
  onClick: () => void
  'aria-label': string
  disabled?: boolean
  children: React.ReactNode
}) {
  return (
    <Button
      type="button"
      role="radio"
      aria-label={props['aria-label']}
      aria-checked={props.selected}
      disabled={props.disabled}
      variant="ghost"
      size="icon"
      className={cn(
        'h-auto w-auto rounded-full p-2 [&_svg]:size-3',
        props.selected
          ? 'bg-secondary! text-foreground'
          : 'text-muted-foreground hover:text-foreground hover:bg-secondary/30'
      )}
      onClick={props.onClick}
    >
      {props.children}
    </Button>
  )
}
