'use client'

import { LinkIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Skeleton } from '@/components/ui/skeleton'
import { OGImage, PlatformSection, domain } from './common'
import type { PlatformPreviewsProps } from './types'

export function WhatsAppPreview(props: PlatformPreviewsProps) {
  const url = props.data?.url ?? props.urlInput ?? ''
  const og = props.data?.openGraph
  const showPreview =
    props.isValidUrl && !props.isError && og?.image && og.isValidImage

  return (
    <PlatformSection
      name="WhatsApp"
      containerClassName="whatsapp"
      previewViewport={props.previewViewport}
    >
      {/* Message Bubble with Link Preview */}
      <div className="bg-card max-w-[230px] overflow-hidden rounded-xl p-1">
        {/* Link Preview */}
        {showPreview && (
          <div className="bg-background/50 rounded-lg">
            <OGImage
              src={og?.image ?? ''}
              isValidImage={og?.isValidImage ?? false}
              className="aspect-[1.91/1] w-full rounded-t-lg object-cover"
              isLoading={props.isLoading}
              skeletonClassName="bg-border"
            />
            <div className="space-y-1.5 p-3">
              {props.isLoading ? (
                <>
                  <Skeleton className="bg-border h-4 w-3/4" />
                  <Skeleton className="bg-border h-3 w-full" />
                  <Skeleton className="bg-border h-3 w-24" />
                </>
              ) : (
                <>
                  <p className="text-foreground text-sm leading-snug font-semibold">
                    {og?.title || '—'}
                  </p>
                  <p className="text-muted-foreground line-clamp-5 text-xs">
                    {og?.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <LinkIcon className="text-foreground size-2.5" />
                      <span className="text-foreground text-xs">
                        {domain(url)}
                      </span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Message Text */}
        <div className="space-y-1 px-2 pt-2 pb-0.5 text-sm">
          <p className="text-foreground">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua
          </p>
          <p
            className={cn(
              props.isValidUrl ? 'text-link underline' : 'text-foreground'
            )}
          >
            {url}
          </p>
          <div className="flex justify-end">
            <span className="text-muted-foreground ml-2 shrink-0 text-[11px]">
              1:27 PM
            </span>
          </div>
        </div>
      </div>
    </PlatformSection>
  )
}
