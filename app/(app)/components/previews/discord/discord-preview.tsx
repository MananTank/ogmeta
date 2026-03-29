'use client'

import { cn, truncate } from '@/lib/utils'
import { Skeleton } from '@/components/ui/skeleton'
import { type DocumentMetadata } from '@/lib/og-types'
import {
  OGImage,
  PARAGRAPH_1,
  PARAGRAPH_2,
  PlatformSection,
  UserAvatar,
  UserName,
} from '../common'
import type { PlatformPreviewsProps } from '../types'

const DISCORD_EMBED_TITLE_MAX = 70
const DISCORD_EMBED_DESCRIPTION_MAX = 350

export function DiscordPreview(props: PlatformPreviewsProps) {
  const url = props.data?.url ?? props.urlInput ?? ''
  const og = props.data?.openGraph
  const data = props.data ? effectiveDiscordPreview(props.data) : null

  const unfurlTitle = data?.title?.trim() ?? ''
  const unfurlDescription = data?.description?.trim() ?? ''
  const unfurlImage = data?.image ?? ''
  const unfurlImageValid = data?.isValidImage ?? false

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
            <PreviewCard
              isLoading={props.isLoading}
              ogSiteName={ogSiteName}
              unfurlTitle={unfurlTitle}
              unfurlDescription={unfurlDescription}
              unfurlImage={unfurlImage}
              unfurlImageValid={unfurlImageValid}
              showSmallUnfurl={showSmallUnfurl}
              showRichUnfurl={showRichUnfurl}
            />
          )}
        </div>
      </div>
    </PlatformSection>
  )
}

function PreviewCard(props: {
  isLoading: boolean
  ogSiteName: string
  unfurlTitle: string
  unfurlDescription: string
  unfurlImage: string
  unfurlImageValid: boolean
  showSmallUnfurl: boolean
  showRichUnfurl: boolean
}) {
  return (
    <div
      className="bg-card mt-1.5 overflow-hidden rounded border border-l-5 p-3"
      style={{ maxWidth: 432 }}
    >
      <div className="space-y-1">
        {props.isLoading ? (
          <>
            <Skeleton className="bg-border h-4 w-24" />
            <Skeleton className="bg-border h-[44px] w-[85%]" />
            <Skeleton className="bg-border h-[38.5px] w-full" />
            <Skeleton className="bg-border mt-4 aspect-1200/630 w-full max-w-[400px] rounded-md" />
          </>
        ) : props.showSmallUnfurl ? (
          <>
            {props.ogSiteName && (
              <p className="text-foreground text-xs">{props.ogSiteName}</p>
            )}
            {props.unfurlTitle && (
              <p className="text-link cursor-pointer leading-snug font-semibold hover:underline">
                {truncate(props.unfurlTitle, DISCORD_EMBED_TITLE_MAX)}
              </p>
            )}
            <p className="text-foreground text-sm leading-snug">
              {truncate(props.unfurlDescription, DISCORD_EMBED_DESCRIPTION_MAX)}
            </p>
          </>
        ) : (
          <>
            {props.ogSiteName && (
              <p className="text-foreground text-xs">{props.ogSiteName}</p>
            )}
            <p className="text-link cursor-pointer leading-snug font-semibold hover:underline">
              {truncate(props.unfurlTitle, DISCORD_EMBED_TITLE_MAX)}
            </p>
            <p className="text-foreground text-sm leading-snug">
              {truncate(props.unfurlDescription, DISCORD_EMBED_DESCRIPTION_MAX)}
            </p>
            <OGImage
              src={props.unfurlImage}
              isValidImage={props.unfurlImageValid}
              className="mt-4 block min-h-[210px] w-full max-w-[400px] rounded-b object-cover"
              isLoading={false}
              skeletonClassName="bg-border"
            />
          </>
        )}
      </div>
    </div>
  )
}

function effectiveDiscordPreview(data: DocumentMetadata): {
  title: string
  description: string
  image: string
  isValidImage: boolean
} {
  const og = data.openGraph
  const tw = data.twitter
  const docTitle = data.doc.title?.trim() ?? ''
  const docDesc = data.doc.description?.trim() ?? ''

  const title = og.title?.trim() || tw.title?.trim() || docTitle
  const description =
    og.description?.trim() || tw.description?.trim() || docDesc

  const hasOgImage = Boolean(og.image?.trim()) && og.isValidImage
  const hasTwImage = Boolean(tw.image?.trim()) && tw.isValidImage
  const image = hasOgImage ? og.image : hasTwImage ? tw.image : ''
  const isValidImage = hasOgImage || hasTwImage

  return { title, description, image, isValidImage }
}
