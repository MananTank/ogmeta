'use client'

import * as React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'
import { BrightnessIcon } from './icons/theme'

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = resolvedTheme === 'dark'

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className="text-muted-foreground hover:text-foreground h-auto shrink-0 cursor-pointer rounded-full p-1"
      aria-label={
        !mounted
          ? 'Toggle theme'
          : isDark
            ? 'Switch to light mode'
            : 'Switch to dark mode'
      }
      disabled={!mounted}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
    >
      <BrightnessIcon className="size-7" />
    </Button>
  )
}
