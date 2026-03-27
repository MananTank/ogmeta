'use client'

import { LinkIcon } from 'lucide-react'
import { effectiveTwitterPreview } from '@/lib/og-types'
import {
  OGImage,
  PARAGRAPH_1,
  PARAGRAPH_2,
  PlatformSection,
  UserAvatar,
  UserHandle,
  UserName,
  domain,
} from './common'
import {
  TwitterReplyIcon,
  TwitterRetweetIcon,
  TwitterLikeIcon,
  TwitterViewsIcon,
  TwitterBookmarkIcon,
} from '../icons/twitter'
import type { PlatformPreviewsProps } from './types'

export function TwitterPreview(props: PlatformPreviewsProps) {
  const url = props.data?.url ?? props.urlInput ?? ''
  const twitter = props.data
    ? effectiveTwitterPreview(props.data)
    : {
        title: '',
        description: '',
        image: '',
        isValidImage: false,
        card: undefined as string | undefined,
      }
  const title = twitter.title
  const description = twitter.description
  const image = twitter.image
  const isValidImage = twitter.isValidImage
  const card = twitter.card

  const hasValidImage = Boolean(image && isValidImage)
  const cardIsNone = card === 'none'
  const cardIsSummary = card === 'summary'

  /** Large image on top (`summary_large_image` or unset, default when an image exists). */
  const hasLargeSummaryLargeImageCard =
    !props.isLoading && title && hasValidImage && !cardIsNone && !cardIsSummary

  /** Small thumbnail left, text right when `twitter:card` is `summary`. */
  const hasSummaryCard =
    !props.isLoading && title && hasValidImage && !cardIsNone && cardIsSummary

  const hasCompactCard =
    !props.isLoading && title && !hasValidImage && !cardIsNone

  const showPreview =
    props.isValidUrl &&
    !props.isError &&
    (props.isLoading ||
      hasLargeSummaryLargeImageCard ||
      hasSummaryCard ||
      hasCompactCard)

  return (
    <PlatformSection
      name="Twitter"
      containerClassName="twitter"
      previewViewport={props.previewViewport}
    >
      <div className="font-chirp flex max-w-[566px] gap-3">
        <div className="shrink-0">
          <UserAvatar size={40} />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-foreground text-[15px] font-bold">
              {UserName}
            </span>
            <span className="text-muted-foreground text-[15px]">
              {UserHandle}
            </span>
            <span className="text-muted-foreground text-[15px]">·</span>
            <span className="text-muted-foreground text-[15px]">2h</span>
          </div>

          <div className="text-foreground mt-1 space-y-4 text-[15px] leading-snug">
            <p>{PARAGRAPH_1}</p>

            <p>{PARAGRAPH_2}</p>

            {!showPreview && (
              <p className={props.isValidUrl ? 'text-link' : ''}>{url}</p>
            )}
          </div>

          {/* summary_large_image (default): wide image + title overlay + “From domain” */}
          {(props.isLoading || hasLargeSummaryLargeImageCard) &&
            showPreview && (
              <div className="mt-3">
                <div className="relative overflow-hidden rounded-2xl border">
                  <OGImage
                    src={image}
                    isValidImage={isValidImage}
                    className="block aspect-[1.91/1] h-auto w-full object-cover"
                    isLoading={props.isLoading}
                    skeletonClassName="bg-border"
                  />
                  {!props.isLoading && title && (
                    <div className="absolute right-3 bottom-3 left-3">
                      <span className="inline-block max-w-full truncate rounded bg-white/90 px-2 text-[13px] leading-[20px] font-semibold text-neutral-900 backdrop-blur-md dark:bg-black/75 dark:text-white">
                        {title}
                      </span>
                    </div>
                  )}
                </div>
                <p className="text-muted-foreground mt-1 text-[13px]">
                  From {domain(url)}
                </p>
              </div>
            )}

          {/* summary: square image left, domain + title + description right */}
          {hasSummaryCard && showPreview && (
            <div className="mt-3 flex overflow-hidden rounded-2xl border">
              <div className="bg-secondary relative h-[124px] w-[124px] shrink-0">
                <OGImage
                  src={image}
                  isValidImage={isValidImage}
                  className="block h-full w-full object-cover"
                  isLoading={props.isLoading}
                  skeletonClassName="bg-border"
                />
              </div>
              <div className="flex min-w-0 flex-1 flex-col justify-center gap-0.5 px-3 py-2.5">
                <p className="text-muted-foreground text-[13px]">
                  {domain(url)}
                </p>
                <p className="text-foreground truncate text-[15px] leading-snug font-semibold">
                  {title}
                </p>
                {description && (
                  <p className="text-muted-foreground line-clamp-2 text-[13px] leading-snug">
                    {description}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Compact: no valid image but has title (summary without image, etc.) */}
          {hasCompactCard && showPreview && (
            <div className="mt-3 flex overflow-hidden rounded-2xl border">
              <div className="bg-secondary flex w-[130px] shrink-0 items-center justify-center">
                <LinkIcon className="text-muted-foreground size-8" />
              </div>
              <div className="flex min-w-0 flex-1 flex-col justify-center gap-0.5 px-3 py-2.5">
                <p className="text-muted-foreground text-[13px]">
                  {domain(url)}
                </p>
                <p className="text-foreground truncate text-[15px] leading-snug">
                  {title}
                </p>
                {description && (
                  <p className="text-muted-foreground line-clamp-2 text-[13px] leading-snug">
                    {description}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* buttons */}
          <div className="text-muted-foreground mt-3 flex items-center justify-between">
            <button className="flex items-center gap-1.5 transition-colors hover:text-sky-400">
              <TwitterReplyIcon className="size-5" />
              <span className="text-xs">24</span>
            </button>
            <button className="flex items-center gap-1.5 transition-colors hover:text-green-400">
              <TwitterRetweetIcon className="size-5" />
              <span className="text-xs">8</span>
            </button>
            <button className="flex items-center gap-1.5 transition-colors hover:text-pink-400">
              <TwitterLikeIcon className="size-5" />
              <span className="text-xs">142</span>
            </button>
            <button className="flex items-center gap-1.5 transition-colors hover:text-sky-400">
              <TwitterViewsIcon className="size-5" />
              <span className="text-xs">12.4K</span>
            </button>
            <button className="flex items-center gap-1.5 transition-colors hover:text-sky-400">
              <TwitterBookmarkIcon className="size-5" />
            </button>
          </div>
        </div>
      </div>
    </PlatformSection>
  )
}
