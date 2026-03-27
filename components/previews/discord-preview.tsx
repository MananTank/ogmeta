'use client'

import { cn } from '@/lib/utils'
import { Skeleton } from '@/components/ui/skeleton'
import {
  OGImage,
  PARAGRAPH_1,
  PARAGRAPH_2,
  PlatformSection,
  UserAvatar,
  UserName,
  siteName,
} from './common'
import type { PlatformPreviewsProps } from './types'

export function DiscordPreview(props: PlatformPreviewsProps) {
  const url = props.data?.url ?? props.urlInput ?? ''
  const og = props.data?.openGraph
  const showPreview =
    props.isValidUrl && !props.isError && og?.image && og.isValidImage

  return (
    <PlatformSection
      name="Discord"
      containerClassName="discord"
      previewViewport={props.previewViewport}
    >
      {/* Message */}
      <div className="flex max-w-2xl gap-4">
        <div className="shrink-0">
          <UserAvatar size={40} />
        </div>
        <div className="min-w-0 flex-1">
          {/* Username and timestamp */}
          <div className="flex items-baseline gap-2">
            <span className="text-foreground text-[15px] font-medium">
              {UserName}
            </span>
            <span className="text-muted-foreground text-xs">7:46 PM</span>
          </div>

          {/* Message content */}
          <div className="text-foreground mt-0.5 space-y-1.5 text-[15px] leading-relaxed">
            <p>{PARAGRAPH_1}</p>
            <p>{PARAGRAPH_2}</p>
          </div>

          <p
            className={cn(
              'text-[15px]',
              props.isValidUrl
                ? 'text-link cursor-pointer hover:underline'
                : 'text-foreground'
            )}
          >
            {url}
          </p>

          {/* Link Embed */}
          {showPreview && (
            <div
              className="bg-card mt-1.5 overflow-hidden rounded border border-l-5 p-3"
              style={{ maxWidth: 432 }}
            >
              <div className="space-y-1">
                {props.isLoading ? (
                  <>
                    <Skeleton className="bg-border h-3 w-24" />
                    <Skeleton className="bg-border h-4 w-3/4" />
                    <Skeleton className="bg-border h-3 w-full" />
                  </>
                ) : (
                  <>
                    <p className="text-foreground text-xs">{siteName(url)}</p>
                    <p className="text-link cursor-pointer leading-snug font-semibold hover:underline">
                      {og?.title || 'No title'}
                    </p>
                    <p className="text-foreground line-clamp-2 text-sm leading-relaxed">
                      {og?.description || 'No description'}
                    </p>
                  </>
                )}
              </div>
              <OGImage
                src={og?.image ?? ''}
                isValidImage={og?.isValidImage ?? false}
                className="block aspect-400/210 max-h-[210px] w-full max-w-[400px] rounded-b object-cover"
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
