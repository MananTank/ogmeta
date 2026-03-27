'use client'

import { MessageCircle } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import {
  OGImage,
  PlatformSection,
  UserAvatar,
  UserName,
  domain,
} from './common'
import type { PlatformPreviewsProps } from './types'

export function FacebookPreview(props: PlatformPreviewsProps) {
  const url = props.data?.url ?? props.urlInput ?? ''
  const og = props.data?.openGraph
  const showPreview =
    props.isValidUrl &&
    !props.isError &&
    !!og?.title &&
    !!og?.image &&
    og.isValidImage

  return (
    <PlatformSection
      name="Facebook"
      containerClassName="facebook"
      previewViewport={props.previewViewport}
    >
      <div className="bg-card w-full max-w-[680px] overflow-hidden rounded-xl shadow-md">
        {/* Post Header */}
        <div className="p-3 pb-2">
          <div className="flex gap-2">
            <div className="shrink-0">
              <UserAvatar size={40} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-foreground text-[15px] font-semibold">
                {UserName}
              </p>
              <p className="text-muted-foreground text-xs">2h · 🌐</p>
            </div>
          </div>

          {/* Post Content */}
          <div className="text-foreground mt-2 space-y-1.5 text-[15px] leading-relaxed">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
              faucibus ultrices risus.
            </p>

            <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco</p>

            {!showPreview && (
              <a
                className="text-link block font-medium hover:underline"
                href={url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {url}
              </a>
            )}
          </div>
        </div>

        {/* Link Preview Card */}
        {showPreview && (
          <div className="border-t">
            <OGImage
              src={og?.image ?? ''}
              isValidImage={og?.isValidImage ?? false}
              className="aspect-[1.91/1] w-full object-cover"
              isLoading={props.isLoading}
              skeletonClassName="bg-secondary"
            />
            <div className="bg-secondary space-y-0.5 px-3 py-2.5">
              {props.isLoading ? (
                <>
                  <Skeleton className="bg-border h-3 w-20" />
                  <Skeleton className="bg-border h-4 w-3/4" />
                  <Skeleton className="bg-border h-3 w-1/2" />
                </>
              ) : (
                <>
                  <p className="text-muted-foreground text-[13px] tracking-wide uppercase">
                    {domain(url)}
                  </p>
                  <p className="text-foreground line-clamp-2 text-[17px] leading-snug font-semibold">
                    {og?.title || '—'}
                  </p>
                </>
              )}
            </div>
          </div>
        )}

        {/* Engagement Stats */}
        <div className="text-muted-foreground flex items-center px-3 py-2 text-[13px]">
          <span className="flex -space-x-1">
            <span className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#1877f2] text-[10px] text-white">
              👍
            </span>
            <span className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#f33e58] text-[10px] text-white">
              ❤️
            </span>
          </span>
          <span className="ml-1.5">128</span>
          <span className="mx-auto" />
          <span>24 comments</span>
          <span className="mx-1.5">·</span>
          <span>5 shares</span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-around px-2 py-1">
          <button className="text-muted-foreground hover:bg-secondary flex flex-1 items-center justify-center gap-2 rounded py-2.5 transition-colors">
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
            <span className="text-[15px] font-medium">Like</span>
          </button>
          <button className="text-muted-foreground hover:bg-secondary flex flex-1 items-center justify-center gap-2 rounded py-2.5 transition-colors">
            <MessageCircle className="h-5 w-5" />
            <span className="text-[15px] font-medium">Comment</span>
          </button>
          <button className="text-muted-foreground hover:bg-secondary flex flex-1 items-center justify-center gap-2 rounded py-2.5 transition-colors">
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
                d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
              />
            </svg>
            <span className="text-[15px] font-medium">Share</span>
          </button>
        </div>
      </div>
    </PlatformSection>
  )
}
