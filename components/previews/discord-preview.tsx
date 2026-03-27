'use client'

import { cn, truncateWithEllipsis } from '@/lib/utils'
import { Skeleton } from '@/components/ui/skeleton'
import { effectiveSlackPreview } from '@/lib/og-types'
import {
  OGImage,
  PARAGRAPH_1,
  PARAGRAPH_2,
  PlatformSection,
  UserAvatar,
  UserName,
} from './common'
import type { PlatformPreviewsProps } from './types'

const DISCORD_EMBED_TITLE_MAX = 70
const DISCORD_EMBED_DESCRIPTION_MAX = 350

export function DiscordPreview(props: PlatformPreviewsProps) {
  const url = props.data?.url ?? props.urlInput ?? ''
  const og = props.data?.openGraph
  const slack = props.data ? effectiveSlackPreview(props.data) : null

  const unfurlTitle = slack?.title?.trim() ?? ''
  const unfurlDescription = slack?.description?.trim() ?? ''
  const unfurlImage = slack?.image ?? ''
  const unfurlImageValid = slack?.isValidImage ?? false

  const ogSiteName = og?.siteName?.trim() ?? ''

  const hasTitle = Boolean(unfurlTitle)
  const hasDescription = Boolean(unfurlDescription)
  const hasValidImage = Boolean(unfurlImage && unfurlImageValid)

  /** Text-only embed when there is description but no hero image. */
  const showSmallUnfurl = hasTitle && hasDescription && !hasValidImage
  /** Site + title + description + image (Discord requires a title for large embed). */
  const showRichUnfurl = hasTitle && hasValidImage

  const showEmbed =
    props.isValidUrl &&
    !props.isError &&
    (props.isLoading || showSmallUnfurl || showRichUnfurl)

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

          {/* Link embed: rich (title + image) or small (no hero image) */}
          {showEmbed && (
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
                    <Skeleton className="bg-border mt-4 aspect-[400/210] w-full max-w-[400px] rounded-md" />
                  </>
                ) : showSmallUnfurl ? (
                  <>
                    {ogSiteName && (
                      <p className="text-foreground text-xs">{ogSiteName}</p>
                    )}
                    {hasTitle && (
                      <p className="text-link cursor-pointer leading-snug font-semibold hover:underline">
                        {truncateWithEllipsis(
                          unfurlTitle,
                          DISCORD_EMBED_TITLE_MAX
                        )}
                      </p>
                    )}
                    <p className="text-foreground text-sm leading-snug">
                      {truncateWithEllipsis(
                        unfurlDescription,
                        DISCORD_EMBED_DESCRIPTION_MAX
                      )}
                    </p>
                  </>
                ) : (
                  <>
                    {ogSiteName && (
                      <p className="text-foreground text-xs">{ogSiteName}</p>
                    )}
                    <p className="text-link cursor-pointer leading-snug font-semibold hover:underline">
                      {truncateWithEllipsis(
                        unfurlTitle || 'No title',
                        DISCORD_EMBED_TITLE_MAX
                      )}
                    </p>
                    <p className="text-foreground text-sm leading-snug">
                      {truncateWithEllipsis(
                        unfurlDescription || 'No description',
                        DISCORD_EMBED_DESCRIPTION_MAX
                      )}
                    </p>
                    <OGImage
                      src={unfurlImage}
                      isValidImage={unfurlImageValid}
                      className="mt-4 block w-full max-w-[400px] rounded-b object-cover"
                      isLoading={false}
                      skeletonClassName="bg-border"
                    />
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </PlatformSection>
  )
}
