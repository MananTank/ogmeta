'use client'

import * as React from 'react'
import { MessageCircle, Repeat2, Heart, ImageIcon } from 'lucide-react'
import Avatar from 'boring-avatars'
import { LinkedInGlobeIcon } from './icons/linkedin'
import {
  TwitterReplyIcon,
  TwitterRetweetIcon,
  TwitterLikeIcon,
  TwitterViewsIcon,
  TwitterBookmarkIcon,
} from './icons/twitter'
import { cn } from '../lib/utils'
import { Skeleton } from '@/components/ui/skeleton'

interface Props {
  title: string
  description: string
  image: string
  isValidImage: boolean
  url: string
  isLoading?: boolean
  isError?: boolean
}

function domain(url: string) {
  try {
    return new URL(url).hostname.replace('www.', '')
  } catch {
    return url
  }
}

const UserName = 'John Doe'
const UserHandle = '@johndoe'

function siteName(url: string) {
  try {
    const hostname = new URL(url).hostname.replace('www.', '')
    const name = hostname.split('.')[0]
    return name.charAt(0).toUpperCase() + name.slice(1)
  } catch {
    return url
  }
}

function UserAvatar(props: { size: number }) {
  return (
    <Avatar
      size={props.size}
      name={UserName}
      variant="marble"
      colors={[
        'oklch(54.6% 0.245 263)',
        'oklch(97% 0.014 255)',
        'oklch(80.9% 0.105 252)',
      ]}
    />
  )
}

function OGImage({
  src,
  isValidImage,
  className,
  isLoading,
  skeletonClassName,
}: {
  src: string
  isValidImage: boolean
  className?: string
  isLoading?: boolean
  skeletonClassName?: string
}) {
  if (isLoading) {
    return <Skeleton className={cn(className, skeletonClassName)} />
  }

  if (!src || !isValidImage) {
    return (
      <div
        className={cn(
          'items-center justify-center bg-neutral-500/50',
          className,
          'flex'
        )}
      >
        <ImageIcon className="size-6 text-neutral-500" />
      </div>
    )
  }

  return <img src={src} alt="og preview" className={className} />
}

function PlatformSectionContainer(props: {
  bgClassName?: string
  nameClassName?: string
  name: string
  children: React.ReactNode
}) {
  return (
    <div className={cn('relative', props.bgClassName)}>
      <p
        className={cn(
          'absolute top-6 left-6 text-sm font-medium tracking-widest uppercase',
          props.nameClassName
        )}
      >
        {props.name}
      </p>

      <div className={cn('mx-auto max-w-2xl px-4 py-32')}>{props.children}</div>
    </div>
  )
}

function TwitterPreview({
  title,
  image,
  isValidImage,
  url,
  isLoading,
  isError,
}: Props) {
  const hasImage = !isLoading && image && isValidImage

  return (
    <PlatformSectionContainer
      bgClassName="bg-black"
      nameClassName="text-neutral-500"
      name="Twitter"
    >
      <div className="font-chirp flex max-w-[566px] gap-3">
        <div className="shrink-0">
          <UserAvatar size={40} />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-sm font-bold text-white">{UserName}</span>
            <span className="text-sm text-neutral-500">{UserHandle}</span>
            <span className="text-sm text-neutral-500">·</span>
            <span className="text-sm text-neutral-500">2h</span>
          </div>

          <div className="mt-1 space-y-4 text-[15px] leading-snug text-white">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>

            <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco</p>

            {!isLoading && (!image || !isValidImage) && (
              <p className="text-twitter-link">{url}</p>
            )}
          </div>

          {!isError && (
            <div className="mt-3">
              {(isLoading || hasImage) && (
                <div className="relative overflow-hidden rounded-2xl border border-neutral-800">
                  <OGImage
                    src={image}
                    isValidImage={isValidImage}
                    className="block aspect-[1.91/1] h-auto w-full object-cover"
                    isLoading={isLoading}
                    skeletonClassName="bg-neutral-800"
                  />
                  {!isLoading && title && (
                    <div className="absolute right-3 bottom-3 left-3">
                      <span
                        className="inline-flex h-[20px] overflow-hidden rounded px-2 text-[13px] font-semibold text-ellipsis whitespace-nowrap text-white backdrop-blur-md"
                        style={{ backgroundColor: 'rgba(0,0,0,0.75)' }}
                      >
                        {title}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {isLoading ? (
                <Skeleton className="mt-1.5 ml-0.5 h-3 w-24 bg-neutral-800" />
              ) : hasImage ? (
                <p className="mt-1.5 ml-0.5 text-[13px] text-neutral-500">
                  From {domain(url)}
                </p>
              ) : null}
            </div>
          )}

          {/* buttons */}
          <div className="mt-3 flex items-center justify-between text-neutral-500">
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
    </PlatformSectionContainer>
  )
}

function LinkedInPreview({
  title,
  image,
  isValidImage,
  url,
  isLoading,
  isError,
}: Props) {
  return (
    <PlatformSectionContainer
      bgClassName="bg-linkedin-background"
      nameClassName="text-linkedin-muted"
      name="LinkedIn"
    >
      <div className="bg-linkedin-card w-full overflow-hidden rounded-lg shadow-sm">
        {/* Post Header */}
        <div className="p-4 pb-0">
          <div className="flex gap-2">
            <div className="shrink-0">
              <UserAvatar size={48} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-linkedin-foreground text-sm font-semibold">
                {UserName}
              </p>
              <p className="text-linkedin-muted line-clamp-1 text-xs">
                Product Designer at Company
              </p>
              <p className="text-linkedin-muted text-xs">
                2h • <LinkedInGlobeIcon />
              </p>
            </div>
          </div>

          {/* Post Content */}
          <div className="text-linkedin-foreground mt-3 text-sm leading-relaxed">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
              faucibus ultrices risus.
            </p>
          </div>
        </div>

        {/* Link Preview Card */}
        {!isError && (
          <div className="border-linkedin-border-subtle bg-linkedin-card mx-4 mt-3 mb-2 flex overflow-hidden rounded-lg border">
            <div className="h-[72px] w-[128px] shrink-0">
              <OGImage
                src={image}
                isValidImage={isValidImage}
                className="h-full w-full object-cover"
                isLoading={isLoading}
                skeletonClassName="bg-[#d0cec9]"
              />
            </div>
            <div className="flex min-w-0 flex-1 flex-col justify-center px-3 py-2">
              {isLoading ? (
                <>
                  <Skeleton className="h-4 w-3/4 bg-[#e0dfdc]" />
                  <Skeleton className="mt-1 h-3 w-20 bg-[#e0dfdc]" />
                </>
              ) : (
                <>
                  <p className="text-linkedin-foreground line-clamp-2 text-sm leading-snug font-semibold">
                    {title || '—'}
                  </p>
                  <p className="text-linkedin-muted mt-0.5 text-xs">
                    {domain(url)}
                  </p>
                </>
              )}
            </div>
          </div>
        )}

        {/* Engagement Stats */}
        <div className="text-linkedin-muted border-linkedin-border flex items-center gap-1 border-t px-4 py-2 text-xs">
          <span className="flex -space-x-1">
            <span className="bg-linkedin-reaction-blue flex h-4 w-4 items-center justify-center rounded-full text-[8px] text-white">
              👍
            </span>
            <span className="bg-linkedin-reaction-orange flex h-4 w-4 items-center justify-center rounded-full text-[8px] text-white">
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
        <div className="border-linkedin-border flex items-center justify-around border-t px-2 py-1">
          <button className="hover:bg-linkedin-hover text-linkedin-muted flex items-center gap-1.5 rounded px-4 py-3 transition-colors">
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
          <button className="hover:bg-linkedin-hover text-linkedin-muted flex items-center gap-1.5 rounded px-4 py-3 transition-colors">
            <MessageCircle className="h-5 w-5" />
            <span className="text-sm font-medium">Comment</span>
          </button>
          <button className="hover:bg-linkedin-hover text-linkedin-muted flex items-center gap-1.5 rounded px-4 py-3 transition-colors">
            <Repeat2 className="h-5 w-5" />
            <span className="text-sm font-medium">Repost</span>
          </button>
          <button className="hover:bg-linkedin-hover text-linkedin-muted flex items-center gap-1.5 rounded px-4 py-3 transition-colors">
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
    </PlatformSectionContainer>
  )
}

function FacebookPreview({
  title,
  description,
  image,
  isValidImage,
  url,
  isLoading,
  isError,
}: Props) {
  return (
    <PlatformSectionContainer
      bgClassName="bg-facebook-background"
      nameClassName="text-facebook-muted"
      name="Facebook"
    >
      <div className="bg-facebook-card w-full overflow-hidden rounded-lg shadow-sm">
        {/* Post Header */}
        <div className="p-3 pb-2">
          <div className="flex gap-2">
            <div className="shrink-0">
              <UserAvatar size={40} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-facebook-foreground text-[15px] font-semibold">
                {UserName}
              </p>
              <p className="text-facebook-muted text-xs">2h · 🌐</p>
            </div>
          </div>

          {/* Post Content */}
          <div className="text-facebook-foreground mt-2 text-[15px] leading-relaxed">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
              faucibus ultrices risus.
            </p>
          </div>
        </div>

        {/* Link Preview Card */}
        {!isError && (
          <div className="border-facebook-border border-t">
            <OGImage
              src={image}
              isValidImage={isValidImage}
              className="aspect-[1.91/1] w-full object-cover"
              isLoading={isLoading}
              skeletonClassName="bg-[#d0d2d6]"
            />
            <div className="bg-facebook-secondary space-y-0.5 px-3 py-2.5">
              {isLoading ? (
                <>
                  <Skeleton className="h-3 w-20 bg-[#e0e2e6]" />
                  <Skeleton className="h-4 w-3/4 bg-[#e0e2e6]" />
                  <Skeleton className="h-3 w-1/2 bg-[#e0e2e6]" />
                </>
              ) : (
                <>
                  <p className="text-facebook-muted text-[11px] tracking-wide uppercase">
                    {domain(url)}
                  </p>
                  <p className="text-facebook-foreground line-clamp-2 text-[15px] leading-snug font-semibold">
                    {title || '—'}
                  </p>
                  <p className="text-facebook-muted line-clamp-1 text-[13px]">
                    {description}
                  </p>
                </>
              )}
            </div>
          </div>
        )}

        {/* Engagement Stats */}
        <div className="text-facebook-muted border-facebook-border flex items-center border-t px-3 py-2 text-[13px]">
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
        <div className="border-facebook-border flex items-center justify-around border-t px-2 py-1">
          <button className="hover:bg-facebook-secondary text-facebook-muted flex flex-1 items-center justify-center gap-2 rounded py-2.5 transition-colors">
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
          <button className="hover:bg-facebook-secondary text-facebook-muted flex flex-1 items-center justify-center gap-2 rounded py-2.5 transition-colors">
            <MessageCircle className="h-5 w-5" />
            <span className="text-[15px] font-medium">Comment</span>
          </button>
          <button className="hover:bg-facebook-secondary text-facebook-muted flex flex-1 items-center justify-center gap-2 rounded py-2.5 transition-colors">
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
    </PlatformSectionContainer>
  )
}

function DiscordPreview({
  title,
  description,
  image,
  isValidImage,
  url,
  isLoading,
  isError,
}: Props) {
  return (
    <PlatformSectionContainer
      bgClassName="bg-[#1A1A1E]"
      nameClassName="text-[#818289]"
      name="Discord"
    >
      {/* Message */}
      <div className="flex gap-4">
        <div className="shrink-0">
          <UserAvatar size={40} />
        </div>
        <div className="min-w-0 flex-1">
          {/* Username and timestamp */}
          <div className="flex items-baseline gap-2">
            <span className="text-[15px] font-medium text-[#EFEFF1]">
              {UserName}
            </span>
            <span className="text-xs text-[#818289]">7:46 PM</span>
          </div>

          {/* Message content */}
          <p className="mt-0.5 text-[15px] leading-relaxed text-[#EFEFF1]">
            testing opengraph image for
          </p>
          <p className="cursor-pointer text-[15px] text-[#4E96EE] hover:underline">
            {url}
          </p>

          {/* Link Embed */}
          {!isError && (
            <div
              className="mt-2 overflow-hidden rounded bg-[#242429]"
              style={{ maxWidth: 432 }}
            >
              <div className="space-y-1 p-3 pb-2">
                {isLoading ? (
                  <>
                    <Skeleton className="h-3 w-24 bg-[#4a4d52]" />
                    <Skeleton className="h-4 w-3/4 bg-[#4a4d52]" />
                    <Skeleton className="h-3 w-full bg-[#4a4d52]" />
                  </>
                ) : (
                  <>
                    <p className="text-xs text-[#818289]">{siteName(url)}</p>
                    <p className="cursor-pointer leading-snug font-semibold text-[#4E96EE] hover:underline">
                      {title || '—'}
                    </p>
                    <p className="line-clamp-2 text-sm leading-relaxed text-[#EFEFF1]">
                      {description}
                    </p>
                  </>
                )}
              </div>
              <OGImage
                src={image}
                isValidImage={isValidImage}
                className="aspect-[1.78/1] w-full rounded-b object-cover"
                isLoading={isLoading}
                skeletonClassName="bg-[#4a4d52]"
              />
            </div>
          )}
        </div>
      </div>
    </PlatformSectionContainer>
  )
}

function SlackPreview({
  title,
  description,
  image,
  isValidImage,
  url,
  isLoading,
  isError,
}: Props) {
  return (
    <PlatformSectionContainer
      bgClassName="bg-[#1A1D21]"
      nameClassName="text-[#ABABAD]"
      name="Slack"
    >
      {/* Message */}
      <div className="flex gap-2">
        <div className="shrink-0">
          <UserAvatar size={36} />
        </div>
        <div className="min-w-0 flex-1">
          {/* Username and timestamp */}
          <div className="flex items-baseline gap-2">
            <span className="text-[15px] font-bold text-white">{UserName}</span>
            <span className="text-xs text-[#ABABAD]">8:23 PM</span>
          </div>

          {/* Message content */}
          <p className="text-[15px] leading-relaxed text-[#D1D2D3]">Hello</p>

          {/* URL */}
          <p className="mt-0.5 cursor-pointer text-[15px] text-[#1D9BD1] hover:underline">
            {url}
          </p>

          {/* Link Embed */}
          {!isError && (
            <div
              className="mt-2 border-l-4 border-l-[#36C5F0] py-1 pl-3"
              style={{ maxWidth: 480 }}
            >
              {isLoading ? (
                <>
                  <Skeleton className="mb-1 h-4 w-20 bg-[#3a3d42]" />
                  <Skeleton className="h-4 w-3/4 bg-[#3a3d42]" />
                  <Skeleton className="mt-1 h-3 w-1/2 bg-[#3a3d42]" />
                </>
              ) : (
                <>
                  <div className="mb-1 flex items-center gap-1.5">
                    <span className="text-[15px] font-bold text-white">
                      {siteName(url)}
                    </span>
                  </div>
                  <p className="cursor-pointer text-[15px] leading-snug font-medium text-[#1D9BD1] hover:underline">
                    {title || '—'}
                  </p>
                  <p className="mt-0.5 line-clamp-2 text-[15px] leading-relaxed text-[#D1D2D3]">
                    {description}
                  </p>
                </>
              )}
              <OGImage
                src={image}
                isValidImage={isValidImage}
                className="mt-2 aspect-[1.91/1] w-full max-w-[360px] rounded object-cover"
                isLoading={isLoading}
                skeletonClassName="bg-[#3a3d42]"
              />
            </div>
          )}
        </div>
      </div>
    </PlatformSectionContainer>
  )
}

function IMessagePreview({
  title,
  description,
  image,
  isValidImage,
  url,
  isLoading,
  isError,
}: Props) {
  if (isError) return null

  return (
    <PlatformSectionContainer
      bgClassName="bg-imessage-background"
      nameClassName="text-imessage-muted"
      name="iMessage"
    >
      <div className="bg-imessage-card w-full overflow-hidden rounded-2xl">
        <OGImage
          src={image}
          isValidImage={isValidImage}
          className="aspect-[1.91/1] w-full object-cover"
          isLoading={isLoading}
          skeletonClassName="bg-[#d1d1d6]"
        />
        <div className="space-y-0.5 px-3 py-2.5">
          {isLoading ? (
            <>
              <Skeleton className="h-2.5 w-16 bg-[#d1d1d6]" />
              <Skeleton className="h-4 w-3/4 bg-[#d1d1d6]" />
              <Skeleton className="h-3 w-1/2 bg-[#d1d1d6]" />
            </>
          ) : (
            <>
              <p className="text-imessage-muted text-[10px] tracking-wide uppercase">
                {domain(url)}
              </p>
              <p className="text-imessage-foreground line-clamp-2 text-sm leading-snug font-semibold">
                {title || '—'}
              </p>
              <p className="text-imessage-muted line-clamp-1 text-[11px]">
                {description}
              </p>
            </>
          )}
        </div>
      </div>
    </PlatformSectionContainer>
  )
}

function WhatsAppPreview({
  title,
  description,
  image,
  isValidImage,
  url,
  isLoading,
  isError,
}: Props) {
  return (
    <PlatformSectionContainer
      bgClassName="bg-[#0B141A]"
      nameClassName="text-[#8696A0]"
      name="WhatsApp"
    >
      {/* Message Bubble with Link Preview */}
      <div className="overflow-hidden rounded-lg bg-[#202C33]">
        {/* Link Preview */}
        {!isError && (
          <>
            <OGImage
              src={image}
              isValidImage={isValidImage}
              className="aspect-[1.91/1] w-full rounded-t-lg object-cover"
              isLoading={isLoading}
              skeletonClassName="bg-[#374248]"
            />
            <div className="space-y-1.5 p-3">
              {isLoading ? (
                <>
                  <Skeleton className="h-4 w-3/4 bg-[#374248]" />
                  <Skeleton className="h-3 w-full bg-[#374248]" />
                  <Skeleton className="h-3 w-24 bg-[#374248]" />
                </>
              ) : (
                <>
                  <p className="text-[15px] leading-snug font-semibold text-[#E9EDEF]">
                    {title || '—'}
                  </p>
                  <p className="line-clamp-3 text-[14px] leading-relaxed text-[#8696A0]">
                    {description}
                  </p>
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-1.5">
                      <svg
                        className="h-3.5 w-3.5 text-[#8696A0]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
                        />
                      </svg>
                      <span className="text-[13px] text-[#8696A0]">
                        {domain(url)}
                      </span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </>
        )}

        {/* Message Text */}
        <div className="space-y-1 px-3 py-2">
          <p className="text-[15px] leading-relaxed text-[#E9EDEF]">
            I was at a cross roads when I was thinking about joining and this is
            something that helped think through career decisions.
          </p>
          <p className="text-[15px] text-[#53BDEB] underline">{url}</p>
          <div className="flex items-end justify-between pt-1">
            <p className="text-[15px] leading-relaxed text-[#E9EDEF]">
              Don't want to bias you but good perspective
            </p>
            <span className="ml-2 shrink-0 text-[11px] text-[#8696A0]">
              1:27 PM
            </span>
          </div>
        </div>
      </div>
    </PlatformSectionContainer>
  )
}

export function PlatformPreviews(props: Props) {
  return (
    <>
      <TwitterPreview {...props} />
      <SlackPreview {...props} />
      <LinkedInPreview {...props} />
      <DiscordPreview {...props} />
      <FacebookPreview {...props} />
      <WhatsAppPreview {...props} />
      <IMessagePreview {...props} />
    </>
  )
}
