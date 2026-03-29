'use client'

import { useState } from 'react'
import { GlobeIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Img } from '@/components/ui/img'
import { Skeleton } from '@/components/ui/skeleton'
import {
  domain,
  OGImage,
  PlatformSection,
  UserAvatar,
  UserName,
} from './common'
import { effectiveSlackPreview } from '@/lib/og-types'
import type { PlatformPreviewsProps } from './types'

/** Slack shows up to this many characters before "… Show more". */
const SLACK_UNFURL_DESCRIPTION_MAX = 700

function SlackUnfurlDescription({
  text,
  className,
}: {
  text: string
  className?: string
}) {
  const [expanded, setExpanded] = useState(false)
  const needsTruncate = text.length > SLACK_UNFURL_DESCRIPTION_MAX

  if (!needsTruncate) {
    return <p className={className}>{text}</p>
  }

  if (expanded) {
    return (
      <p className={className}>
        {text}{' '}
        <button
          type="button"
          className="text-link cursor-pointer hover:underline"
          onClick={() => setExpanded(false)}
        >
          Show less
        </button>
      </p>
    )
  }

  return (
    <p className={className}>
      {text.slice(0, SLACK_UNFURL_DESCRIPTION_MAX)}...{' '}
      <button
        type="button"
        className="text-link cursor-pointer hover:underline"
        onClick={() => setExpanded(true)}
      >
        Show more
      </button>
    </p>
  )
}

function SmallUnfurlSiteRow(props: { faviconUrl?: string; siteLabel: string }) {
  return (
    <div className="mb-0.5 flex min-w-0 items-center gap-1.5">
      {props.faviconUrl && (
        <Img
          src={props.faviconUrl}
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
      )}
      <span className="text-foreground min-w-0 truncate text-[15px] font-bold">
        {props.siteLabel}
      </span>
    </div>
  )
}

export function SlackPreview(props: PlatformPreviewsProps) {
  const url = props.data?.url ?? props.urlInput ?? ''
  const og = props.data?.openGraph
  const slack = props.data ? effectiveSlackPreview(props.data) : null

  const unfurlTitle = slack?.title?.trim() ?? ''
  const unfurlDescription = slack?.description?.trim() ?? ''
  const unfurlImage = slack?.image ?? ''
  const unfurlImageValid = slack?.isValidImage ?? false

  const displaySiteName = og?.siteName?.trim() || domain(url)

  const hasTitle = Boolean(unfurlTitle)
  const hasDescription = Boolean(unfurlDescription)
  const hasValidImage = Boolean(unfurlImage && unfurlImageValid)

  /** Description-only: Slack shows a compact unfurl (domain as headline, no image). */
  const showSmallUnfurl = hasDescription && !hasValidImage
  /** Title + image: full unfurl with hero image. */
  const showRichUnfurl = hasTitle && hasValidImage

  const showEmbed =
    props.isValidUrl &&
    !props.isError &&
    (props.isLoading || showSmallUnfurl || showRichUnfurl)

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
          <div className="text-foreground space-y-2 text-[15px] leading-[1.45]">
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

          {/* Link embed: rich (title + image) or small (no hero image; title+desc → 3 rows) */}
          {showEmbed && (
            <div className="border-border relative mt-2 pl-4">
              <span className="bg-border absolute top-0 bottom-0 left-0 h-full w-1 rounded-lg" />
              {props.isLoading ? (
                <div className="fade-in-0 animate-in duration-300">
                  <div className="mb-1 flex items-center gap-1.5">
                    <Skeleton className="size-4 shrink-0 rounded-sm" />
                    <Skeleton className="h-5 w-20" />
                  </div>
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="mt-1 h-5 w-1/2" />
                  <Skeleton className="mt-2 aspect-[1.91/1] w-full max-w-[360px] rounded-lg border" />
                </div>
              ) : showSmallUnfurl ? (
                hasTitle ? (
                  <div className="fade-in-0 animate-in duration-300">
                    <SmallUnfurlSiteRow
                      faviconUrl={props.data?.favicon}
                      siteLabel={displaySiteName}
                    />
                    <div>
                      <p className="text-link cursor-pointer text-[15px] leading-snug font-medium underline">
                        {unfurlTitle}
                      </p>
                    </div>
                    <SlackUnfurlDescription
                      text={unfurlDescription}
                      className="text-foreground text-[15px] leading-[1.45]"
                    />
                  </div>
                ) : (
                  <div className="fade-in-0 animate-in duration-300">
                    <SmallUnfurlSiteRow
                      faviconUrl={props.data?.favicon}
                      siteLabel={displaySiteName}
                    />
                    <SlackUnfurlDescription
                      text={unfurlDescription}
                      className="text-foreground text-[15px] leading-[1.45]"
                    />
                  </div>
                )
              ) : (
                <div className="fade-in-0 animate-in duration-300">
                  <div className="mb-1 flex items-center gap-1.5">
                    {props.data?.favicon && (
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
                    )}

                    <span className="text-foreground text-[15px] font-bold">
                      {displaySiteName}
                    </span>
                  </div>
                  <div>
                    <p className="text-link cursor-pointer text-[15px] leading-snug font-medium underline">
                      {unfurlTitle}
                    </p>
                  </div>
                  <SlackUnfurlDescription
                    text={unfurlDescription}
                    className="text-foreground/80 mt-0.5 text-[15px] leading-[1.45]"
                  />
                  <OGImage
                    src={unfurlImage}
                    isValidImage={unfurlImageValid}
                    className="mt-2 min-h-[180px] w-full max-w-[360px] rounded-lg border object-cover"
                    isLoading={false}
                    skeletonClassName="bg-border"
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </PlatformSection>
  )
}
