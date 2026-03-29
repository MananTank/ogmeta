'use client'

import { Skeleton } from '@/components/ui/skeleton'
import {
  OGImage,
  PARAGRAPH_1,
  PARAGRAPH_2,
  PlatformSection,
  UserAvatar,
  UserHandle,
  UserName,
  domain,
} from '../common'
import {
  TwitterReplyIcon,
  TwitterRetweetIcon,
  TwitterLikeIcon,
  TwitterViewsIcon,
  TwitterBookmarkIcon,
} from './icons'
import type { PlatformPreviewsProps } from '../types'
import { effectiveTwitterPreview } from './utils'

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
  const cardIsNone = !card || card === 'none'
  const cardIsSummary = card === 'summary'

  const hasLargeSummaryLargeImageCard =
    !props.isLoading && title && hasValidImage && !cardIsNone && !cardIsSummary

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

  const showLargePreview =
    (props.isLoading || hasLargeSummaryLargeImageCard) && showPreview

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
          <div className="flex flex-wrap items-center gap-1.5 text-[15px]">
            <span className="text-foreground font-bold">{UserName}</span>
            <span className="text-muted-foreground">{UserHandle}</span>
            <span className="text-muted-foreground">·</span>
            <span className="text-muted-foreground">2h</span>
          </div>

          <div className="text-foreground mt-1 space-y-3 text-[13px] leading-snug @sm/preview:space-y-4 @sm/preview:text-[15px]">
            <p>{PARAGRAPH_1}</p>
            <p>{PARAGRAPH_2}</p>

            {!showPreview && (
              <p className={props.isValidUrl ? 'text-link' : ''}>{url}</p>
            )}
          </div>

          {showLargePreview && (
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
                  <div className="absolute right-3 bottom-3 left-3 flex">
                    <span className="inline-block max-w-full truncate rounded bg-[#3a3a3a] px-2 text-[13px] leading-[16px] text-white backdrop-blur-md @sm/preview:leading-[20px] dark:bg-black/75 dark:text-white">
                      {title}
                    </span>
                  </div>
                )}
              </div>
              <div className="mt-0.5">
                {!props.isURLReady ? (
                  <Skeleton className="bg-border h-5 w-28" />
                ) : (
                  <p className="text-muted-foreground text-[13px]">
                    From {domain(url)}
                  </p>
                )}
              </div>
            </div>
          )}

          {(hasCompactCard || hasSummaryCard) && showPreview && (
            <TwitterSmallPreview
              image={image}
              isValidImage={isValidImage}
              isLoading={props.isLoading}
              url={url}
              title={title}
              description={description}
            />
          )}

          <div className="text-muted-foreground mt-3 flex items-center justify-between">
            <ActionButton icon={TwitterReplyIcon} label="24" />
            <ActionButton icon={TwitterRetweetIcon} label="8" />
            <ActionButton icon={TwitterLikeIcon} label="142" />
            <ActionButton icon={TwitterViewsIcon} label="12.4K" />
            <ActionButton icon={TwitterBookmarkIcon} label={undefined} />
          </div>
        </div>
      </div>
    </PlatformSection>
  )
}

function ActionButton(props: {
  icon: React.FC<{ className?: string }>
  label: string | undefined
}) {
  return (
    <button className="flex items-center gap-1.5 transition-colors hover:text-sky-400">
      <TwitterBookmarkIcon className="size-[19px]" />
      {props.label && <span className="text-[13px]">{props.label}</span>}
    </button>
  )
}

function TwitterSmallPreview(props: {
  image: string
  isValidImage: boolean
  isLoading: boolean
  url: string
  title: string
  description: string
}) {
  const showImage = props.image && props.isValidImage && !props.isLoading

  return (
    <div className="mt-3 flex overflow-hidden rounded-2xl border">
      {showImage ? (
        <div className="bg-secondary relative size-[130px] shrink-0">
          <OGImage
            src={props.image}
            isValidImage={props.isValidImage}
            className="block h-full w-full object-cover"
            isLoading={props.isLoading}
            skeletonClassName="bg-border"
          />
        </div>
      ) : (
        <div className="bg-secondary flex size-[130px] shrink-0 items-center justify-center border-r">
          <TwitterBrokenImageIcon className="text-muted-foreground size-[30px]" />
        </div>
      )}

      <div className="bg-card flex min-w-0 flex-1 grow flex-col justify-center gap-0.5 p-3">
        <p className="text-muted-foreground text-[15px]">{domain(props.url)}</p>
        <p className="text-foreground truncate text-[15px] leading-snug">
          {props.title}
        </p>
        {props.description && (
          <p className="text-muted-foreground line-clamp-2 text-[15px] leading-snug">
            {props.description}
          </p>
        )}
      </div>
    </div>
  )
}

function TwitterBrokenImageIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props} fill="currentColor">
      <g>
        <path d="M1.998 5.5c0-1.38 1.119-2.5 2.5-2.5h15c1.381 0 2.5 1.12 2.5 2.5v13c0 1.38-1.119 2.5-2.5 2.5h-15c-1.381 0-2.5-1.12-2.5-2.5v-13zm2.5-.5c-.276 0-.5.22-.5.5v13c0 .28.224.5.5.5h15c.276 0 .5-.22.5-.5v-13c0-.28-.224-.5-.5-.5h-15zM6 7h6v6H6V7zm2 2v2h2V9H8zm10 0h-4V7h4v2zm0 4h-4v-2h4v2zm-.002 4h-12v-2h12v2z"></path>
      </g>
    </svg>
  )
}
