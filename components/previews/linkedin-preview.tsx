'use client'

import { MessageCircle, Repeat2 } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { LinkedInGlobeIcon } from '../icons/linkedin'
import {
  OGImage,
  PARAGRAPH_1,
  PARAGRAPH_2,
  PlatformSection,
  UserAvatar,
  UserName,
  domain,
} from './common'
import type { PlatformPreviewsProps } from './types'

export function LinkedInPreview(props: PlatformPreviewsProps) {
  const url = props.data?.url ?? props.urlInput ?? ''
  const og = props.data?.openGraph
  const showPreview =
    props.isValidUrl && !props.isError && og?.image && og.isValidImage

  return (
    <PlatformSection
      name="LinkedIn"
      containerClassName="linkedin"
      previewViewport={props.previewViewport}
    >
      <div className="bg-card w-full max-w-[550px] overflow-hidden rounded-lg shadow-sm">
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
          <div className="text-foreground mt-3 space-y-2 text-sm leading-relaxed">
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

          {/* Link Preview Card */}
          {showPreview && (
            <div className="bg-card mt-3 flex overflow-hidden rounded-lg border p-3">
              <OGImage
                src={og?.image ?? ''}
                isValidImage={og?.isValidImage ?? false}
                className="h-[72px] w-[128px] shrink-0 rounded-md object-cover"
                isLoading={props.isLoading}
                skeletonClassName="bg-secondary"
              />
              <div className="flex min-w-0 flex-1 flex-col justify-center px-3 py-2">
                {props.isLoading ? (
                  <>
                    <Skeleton className="bg-secondary h-4 w-3/4" />
                    <Skeleton className="bg-secondary mt-1 h-3 w-20" />
                  </>
                ) : (
                  <>
                    <p className="text-foreground line-clamp-2 text-sm leading-snug font-semibold">
                      {og?.title || domain(url)}
                    </p>
                    <p className="text-muted-foreground mt-0.5 text-xs">
                      {domain(url)}
                    </p>
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Engagement Stats */}
        <div className="text-muted-foreground flex items-center gap-1 border-t px-4 py-2 text-xs">
          <span className="flex -space-x-1">
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#378fe9] text-[8px] text-white">
              👍
            </span>
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#df704d] text-[8px] text-white">
              ❤️
            </span>
          </span>
          <span className="ml-1">128</span>
          <span className="mx-auto" />
          <span>14 comments</span>
          <span className="mx-1">•</span>
          <span>3 reposts</span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-around border-t px-2 py-1">
          <button className="text-muted-foreground hover:bg-secondary flex items-center gap-1.5 rounded px-4 py-3 transition-colors">
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
              />
            </svg>
            <span className="text-sm font-medium">Like</span>
          </button>
          <button className="text-muted-foreground hover:bg-secondary flex items-center gap-1.5 rounded px-4 py-3 transition-colors">
            <MessageCircle className="h-5 w-5" />
            <span className="text-sm font-medium">Comment</span>
          </button>
          <button className="text-muted-foreground hover:bg-secondary flex items-center gap-1.5 rounded px-4 py-3 transition-colors">
            <Repeat2 className="h-5 w-5" />
            <span className="text-sm font-medium">Repost</span>
          </button>
          <button className="text-muted-foreground hover:bg-secondary flex items-center gap-1.5 rounded px-4 py-3 transition-colors">
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
              />
            </svg>
            <span className="text-sm font-medium">Send</span>
          </button>
        </div>
      </div>
    </PlatformSection>
  )
}
