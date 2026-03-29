'use client'

import * as React from 'react'
import { ImageIcon } from 'lucide-react'
import Avatar from 'boring-avatars'
import { cn } from '@/lib/utils'
import type { PreviewViewport } from '@/lib/preview-viewport'
import { Skeleton } from '@/components/ui/skeleton'

export const PARAGRAPH_1 =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
export const PARAGRAPH_2 =
  'Ut enim ad minim veniam, quis nostrud exercitation ullamco'

export function domain(url: string) {
  try {
    return new URL(url).hostname.replace('www.', '')
  } catch {
    return url
  }
}

export const UserName = 'John Doe'
export const UserHandle = '@johndoe'

export function UserAvatar(props: { size: number }) {
  return (
    <Avatar
      size={props.size}
      name={UserName}
      variant="marble"
      colors={[
        'oklch(54.6% 0.245 263)',
        'oklch(97% 0.014 255)',
        'oklch(80.9% 0.105 252)',
      ]}
    />
  )
}

export function OGImage(props: {
  src: string
  isValidImage: boolean
  className?: string
  isLoading?: boolean
  skeletonClassName?: string
}) {
  if (props.isLoading) {
    return <Skeleton className={cn(props.className, props.skeletonClassName)} />
  }

  if (!props.src || !props.isValidImage) {
    return (
      <div
        className={cn(
          'bg-muted items-center justify-center',
          props.className,
          'flex'
        )}
      >
        <ImageIcon className="text-muted-foreground size-6" />
      </div>
    )
  }

  // eslint-disable-next-line @next/next/no-img-element
  return <img src={props.src} alt="og preview" className={props.className} />
}

export function PlatformSection(props: {
  containerClassName?: string
  name: string
  children: React.ReactNode
  previewViewport?: PreviewViewport
}) {
  const viewport = props.previewViewport ?? 'desktop'

  return (
    <section
      className={cn(
        'group bg-section-card squircle-2xl mx-auto w-full max-w-5xl'
      )}
    >
      <div className="flex justify-center pt-8">
        <h2 className="text-muted-foreground bg-background flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-base font-semibold tracking-tight">
          {props.name}
        </h2>
      </div>

      <div
        data-preview-viewport={viewport}
        className="relative flex w-full flex-col overflow-hidden px-4 py-20 md:py-32"
      >
        <div
          className={cn(
            '@container/preview',
            'mx-auto flex min-h-0 w-full flex-1 flex-col items-center justify-center',
            props.containerClassName,
            // Below theme `container-sm` (24rem) so `@sm/preview:` stays off in mobile preview mode.
            props.previewViewport === 'mobile' && 'max-w-[380px]'
          )}
        >
          {props.children}
        </div>
      </div>
    </section>
  )
}

export function MessageBubble(props: { text: string; isLink?: boolean }) {
  const type = props.text.length > 20 ? 'squircle' : 'rounded-full'
  return (
    <div
      className={cn(
        'bg-primary text-primary-foreground max-w-[300px] px-3.5 py-2.5 text-base leading-[1.3] font-medium',
        type === 'squircle' && 'squircle-2xl',
        type === 'rounded-full' && 'rounded-full'
      )}
    >
      {props.isLink ? (
        <a
          href={props.text}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2"
        >
          {props.text}
        </a>
      ) : (
        <p>{props.text}</p>
      )}
    </div>
  )
}
