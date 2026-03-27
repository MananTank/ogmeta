'use client'

import { GlobeIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Img } from '@/components/ui/img'
import { Skeleton } from '@/components/ui/skeleton'
import {
  OGImage,
  PlatformSection,
  UserAvatar,
  UserName,
  siteName,
} from './common'
import type { PlatformPreviewsProps } from './types'

export function SlackPreview(props: PlatformPreviewsProps) {
  const url = props.data?.url ?? props.urlInput ?? ''
  const og = props.data?.openGraph
  const showPreview =
    props.isValidUrl &&
    !props.isError &&
    og?.image &&
    og.isValidImage &&
    og.title

  return (
    <PlatformSection
      name="Slack"
      containerClassName="slack"
      previewViewport={props.previewViewport}
    >
      {/* Message */}
      <div className="flex max-w-[600px] gap-2">
        <div className="shrink-0">
          <UserAvatar size={36} />
        </div>
        <div className="min-w-0 flex-1">
          {/* Username and timestamp */}
          <div className="flex items-baseline gap-2">
            <span className="text-foreground text-[15px] font-bold">
              {UserName}
            </span>
            <span className="text-muted-foreground text-xs">8:23 PM</span>
          </div>

          {/* Message content */}
          <div className="text-foreground space-y-2 text-[15px] leading-relaxed">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco</p>
          </div>

          {/* URL */}
          <p
            className={cn(
              'mt-0.5 text-[15px]',
              props.isValidUrl
                ? 'text-link cursor-pointer underline'
                : 'text-foreground'
            )}
          >
            {url}
          </p>

          {/* Link Embed */}
          {showPreview && (
            <div className="border-border relative mt-2 pl-4">
              {/* left line */}
              <span className="bg-border absolute top-0 bottom-0 left-0 h-full w-1 rounded-lg"></span>
              {props.isLoading ? (
                <>
                  <div className="mb-1 flex items-center gap-1.5">
                    <Skeleton className="bg-border size-4 shrink-0 rounded-sm" />
                    <Skeleton className="bg-border h-4 w-20" />
                  </div>
                  <Skeleton className="bg-border h-4 w-3/4" />
                  <Skeleton className="bg-border mt-1 h-3 w-1/2" />
                </>
              ) : (
                <>
                  <div className="mb-1 flex items-center gap-1.5">
                    <Img
                      src={props.data?.favicon}
                      alt=""
                      referrerPolicy="no-referrer"
                      className="size-4 shrink-0 rounded-sm object-contain"
                      fallback={
                        <GlobeIcon
                          className="text-muted-foreground size-4 shrink-0"
                          aria-hidden
                        />
                      }
                    />
                    <span className="text-foreground text-[15px] font-bold">
                      {siteName(url)}
                    </span>
                  </div>
                  <div>
                    <p className="text-link cursor-pointer text-[15px] leading-snug font-medium underline">
                      {og?.title}
                    </p>
                  </div>
                  <p className="text-foreground/80 mt-0.5 line-clamp-2 text-[15px] leading-relaxed">
                    {og?.description}
                  </p>
                </>
              )}
              <OGImage
                src={og?.image ?? ''}
                isValidImage={og?.isValidImage ?? false}
                className="mt-2 aspect-[1.91/1] w-full max-w-[360px] rounded-lg border object-cover"
                isLoading={props.isLoading}
                skeletonClassName="bg-border"
              />
            </div>
          )}
        </div>
      </div>
    </PlatformSection>
  )
}
