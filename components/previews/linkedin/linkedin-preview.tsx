'use client'

import { Skeleton } from '@/components/ui/skeleton'
import { effectiveLinkedInPreview } from '@/lib/og-types'
import {
  OGImage,
  PARAGRAPH_1,
  PARAGRAPH_2,
  PlatformSection,
  UserAvatar,
  UserName,
  domain,
} from '../common'
import type { PlatformPreviewsProps } from '../types'
import {
  LinkedInGlobeIcon,
  LinkedinLikeIcon,
  LinkedinHeartIcon,
  LinkedInLikeButtonIcon,
  LinkedInCommentButtonIcon,
  LinkedinReportIcon,
  LinkedinSendIcon,
} from './icons'

export function LinkedInPreview(props: PlatformPreviewsProps) {
  const url = props.data?.url ?? props.urlInput ?? ''
  const effective = props.data ? effectiveLinkedInPreview(props.data) : null

  const showLinkCard =
    props.isValidUrl && !props.isError && (props.isLoading || props.data)

  return (
    <PlatformSection
      name="LinkedIn"
      containerClassName="linkedin"
      previewViewport={props.previewViewport}
    >
      <div className="bg-card w-full max-w-[550px] overflow-hidden rounded-lg border">
        {/* Post Header */}
        <div className="p-4">
          <div className="flex gap-2">
            <div className="shrink-0">
              <UserAvatar size={48} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-foreground text-base leading-tight font-semibold">
                {UserName}
              </p>
              <p className="text-muted-foreground text-xs">
                Design Engineer at Company
              </p>
              <div className="flex items-center gap-1">
                <p className="text-muted-foreground text-xs">2h •</p>
                <LinkedInGlobeIcon className="text-muted-foreground size-3.5" />
              </div>
            </div>
          </div>

          {/* Post Content */}
          <div className="text-foreground mt-3 space-y-2 text-sm leading-snug">
            <p>{PARAGRAPH_1}</p>
            <p>{PARAGRAPH_2}</p>

            <a
              className="text-link block font-medium hover:underline"
              href={url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {url}
            </a>
          </div>

          {showLinkCard && (
            <div className="bg-card mt-3 overflow-hidden rounded-lg border">
              {props.isLoading ? (
                <div className="fade-in-0 animate-in flex p-3 duration-300">
                  <Skeleton className="bg-border h-[72px] w-[128px] shrink-0 rounded-md" />
                  <div className="flex min-w-0 flex-1 flex-col justify-center gap-1.5 px-3 py-2">
                    <Skeleton className="bg-border h-4 w-3/4" />
                    <Skeleton className="bg-border h-3 w-20" />
                  </div>
                </div>
              ) : effective ? (
                effective.showImage ? (
                  <div className="fade-in-0 animate-in flex p-3 duration-300">
                    <OGImage
                      src={effective.imageSrc}
                      isValidImage
                      className="h-[72px] w-[128px] shrink-0 rounded-md object-cover"
                      isLoading={false}
                      skeletonClassName="bg-secondary"
                    />
                    <div className="flex min-w-0 flex-1 flex-col justify-center px-3 py-2">
                      <p className="text-foreground line-clamp-2 text-sm leading-snug font-semibold">
                        {effective.title}
                      </p>
                      <p className="text-muted-foreground mt-0.5 text-xs">
                        {domain(url)}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="fade-in-0 animate-in flex flex-col gap-0.5 px-3 py-2.5 duration-300">
                    <p className="text-foreground line-clamp-2 text-sm leading-snug font-semibold">
                      {effective.title}
                    </p>
                    <p className="text-muted-foreground text-xs leading-snug">
                      {domain(url)}
                    </p>
                    {effective.description ? (
                      <p className="text-muted-foreground line-clamp-3 text-xs leading-snug">
                        {effective.description}
                      </p>
                    ) : null}
                  </div>
                )
              ) : null}
            </div>
          )}
        </div>

        {/* Engagement Stats */}
        <div className="px-4">
          <div className="text-muted-foreground flex items-center gap-1 border-b py-2 text-xs">
            <span className="flex -space-x-1">
              <LinkedinLikeIcon className="text-card size-4" />
              <LinkedinHeartIcon className="text-card size-4" />
            </span>
            <span>128</span>
            <span className="mx-auto" />
            <span>14 comments</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-around px-4 py-1.5">
          <PostButton icon={LinkedInLikeButtonIcon} label="Like" />
          <PostButton icon={LinkedInCommentButtonIcon} label="Comment" />
          <PostButton icon={LinkedinReportIcon} label="Repost" />
          <PostButton icon={LinkedinSendIcon} label="Send" />
        </div>
      </div>
    </PlatformSection>
  )
}

function PostButton(props: {
  icon: React.FC<{ className?: string }>
  label: string
}) {
  return (
    <button className="text-muted-foreground hover:bg-foreground/10 flex grow flex-col items-center gap-[2px] rounded px-2 py-1.5 transition-colors">
      <props.icon className="size-4" />
      <span className="text-sm font-semibold">{props.label}</span>
    </button>
  )
}
