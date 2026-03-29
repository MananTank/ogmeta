'use client'

import { Skeleton } from '@/components/ui/skeleton'
import {
  MessageBubble,
  OGImage,
  PARAGRAPH_1,
  PlatformSection,
  domain,
} from './common'
import type { PlatformPreviewsProps } from './types'

export function IMessagePreview(props: PlatformPreviewsProps) {
  const url = props.data?.url ?? props.urlInput ?? ''
  const og = props.data?.openGraph
  const showPreview =
    props.isValidUrl && !props.isError && og?.image && og.isValidImage

  return (
    <PlatformSection
      name="Messages"
      containerClassName="imessage"
      previewViewport={props.previewViewport}
    >
      <div className="flex flex-col items-start space-y-3">
        <MessageBubble text="tempor incididunt" />
        <MessageBubble text={PARAGRAPH_1} />

        {showPreview && (
          <div className="bg-card squircle-2xl w-full max-w-[300px] overflow-hidden">
            <OGImage
              src={og?.image ?? ''}
              isValidImage={og?.isValidImage ?? false}
              className="aspect-[1.91/1] w-full object-cover"
              isLoading={props.isLoading}
              skeletonClassName="bg-border"
            />
            <div className="space-y-0.5 p-3">
              {props.isLoading ? (
                <>
                  <Skeleton className="bg-border h-2.5 w-16" />
                  <Skeleton className="bg-border h-4 w-3/4" />
                  <Skeleton className="bg-border h-3 w-1/2" />
                </>
              ) : (
                <>
                  <p className="text-card-foreground line-clamp-2 text-sm leading-snug font-semibold">
                    {og?.title || '—'}
                  </p>
                  <p className="text-muted-foreground text-xs font-medium tracking-wide">
                    {domain(url)}
                  </p>
                </>
              )}
            </div>
          </div>
        )}

        {!showPreview && url && <MessageBubble text={url} isLink />}
      </div>
    </PlatformSection>
  )
}
