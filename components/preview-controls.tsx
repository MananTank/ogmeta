'use client'

import * as React from 'react'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import { Moon, Sun, Monitor, Smartphone } from 'lucide-react'
import { useTheme } from 'next-themes'
import { TooltipContent, TooltipProvider } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import type { PreviewViewport } from '@/lib/preview-viewport'
import { TabButton, TabsContainer } from '@/components/tabs-pill'

function TabTooltip(props: { label: string; children: React.ReactNode }) {
  return (
    <TooltipPrimitive.Root>
      <TooltipPrimitive.Trigger asChild>
        <span className="inline-flex">{props.children}</span>
      </TooltipPrimitive.Trigger>
      <TooltipContent side="bottom" sideOffset={6}>
        {props.label}
      </TooltipContent>
    </TooltipPrimitive.Root>
  )
}

export function PreviewControls(props: {
  viewport: PreviewViewport
  onViewportChange: (v: PreviewViewport) => void
  className?: string
}) {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = resolvedTheme === 'dark'

  return (
    <TooltipProvider delayDuration={300}>
      <div
        className={cn(
          'flex flex-wrap items-center justify-center gap-2.5',
          props.className
        )}
      >
        <TabsContainer aria-label="Theme">
          <TabTooltip label="Dark">
            <TabButton
              aria-label="Dark"
              selected={mounted ? isDark : false}
              disabled={!mounted}
              onClick={() => setTheme('dark')}
            >
              <Moon />
            </TabButton>
          </TabTooltip>

          <TabTooltip label="Light">
            <TabButton
              aria-label="Light"
              selected={mounted ? !isDark : false}
              disabled={!mounted}
              onClick={() => setTheme('light')}
            >
              <Sun />
            </TabButton>
          </TabTooltip>
        </TabsContainer>

        <TabsContainer aria-label="Preview size">
          <TabTooltip label="Desktop">
            <TabButton
              aria-label="Desktop"
              selected={props.viewport === 'desktop'}
              onClick={() => props.onViewportChange('desktop')}
            >
              <Monitor />
            </TabButton>
          </TabTooltip>
          <TabTooltip label="Mobile">
            <TabButton
              aria-label="Mobile"
              selected={props.viewport === 'mobile'}
              onClick={() => props.onViewportChange('mobile')}
            >
              <Smartphone />
            </TabButton>
          </TabTooltip>
        </TabsContainer>
      </div>
    </TooltipProvider>
  )
}
