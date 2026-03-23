'use client'

import * as React from 'react'
import {
  MessageCircle,
  Repeat2,
  Heart,
  ImageIcon,
  LinkIcon,
} from 'lucide-react'
import Avatar from 'boring-avatars'
import { LinkedInGlobeIcon, LinkedInLogoIcon } from './icons/linkedin'
import {
  TwitterReplyIcon,
  TwitterRetweetIcon,
  TwitterLikeIcon,
  TwitterViewsIcon,
  TwitterBookmarkIcon,
  TwitterLogoIcon,
} from './icons/twitter'
import { cn } from '../lib/utils'
import { Skeleton } from '@/components/ui/skeleton'
import { SlackIcon } from './icons/slack'

export interface Props {
  title: string
  description: string
  image: string
  isValidImage: boolean
  url: string
  isLoading?: boolean
  isError?: boolean
  isValidUrl?: boolean
}

const PARAGRAPH_1 =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
const PARAGRAPH_2 = 'Ut enim ad minim veniam, quis nostrud exercitation ullamco'

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

  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt="og preview" className={className} />
}

function PlatformSection(props: {
  containerClassName?: string
  name: string
  children: React.ReactNode
  // logo?: React.FC<{ className?: string }>
}) {
  return (
    <section className="group mx-auto w-full max-w-5xl">
      <div className="flex flex-col items-center">
        <div
          className={cn(
            'bg-background squircle-2xl relative flex min-h-[700px] w-full flex-col items-center justify-center border border-neutral-700/50 px-4 py-24',
            props.containerClassName
          )}
        >
          <div className="bg-foreground/10 absolute top-4 left-4 flex items-center gap-1 rounded-full px-3 py-1.5 backdrop-blur-md">
            <h2 className="text-foreground text-sm tracking-wide">
              {props.name}
            </h2>
          </div>

          {props.children}
        </div>
      </div>
    </section>
  )
}

export function TwitterPreview({
  title,
  description,
  image,
  isValidImage,
  url,
  isLoading,
  isError,
  isValidUrl,
}: Props) {
  const hasValidImage = image && isValidImage
  const hasLargeCard = !isLoading && title && hasValidImage
  const hasCompactCard = !isLoading && title && !hasValidImage
  const showPreview =
    isValidUrl && !isError && (isLoading || hasLargeCard || hasCompactCard)

  return (
    <PlatformSection
      name="Twitter"
      containerClassName="twitter"
      // logo={TwitterLogoIcon}
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
              <p className={isValidUrl ? 'text-link' : ''}>{url}</p>
            )}
          </div>

          {/* Large card - has valid image */}
          {(isLoading || hasLargeCard) && showPreview && (
            <div className="mt-3">
              <div className="relative overflow-hidden rounded-2xl border">
                <OGImage
                  src={image}
                  isValidImage={isValidImage}
                  className="block aspect-[1.91/1] h-auto w-full object-cover"
                  isLoading={isLoading}
                  skeletonClassName="bg-border"
                />
                {!isLoading && title && (
                  <div className="absolute right-3 bottom-3 left-3">
                    <span
                      className="text-foreground inline-block max-w-full truncate rounded px-2 text-[13px] leading-[20px] font-semibold backdrop-blur-md"
                      style={{ backgroundColor: 'rgba(0,0,0,0.75)' }}
                    >
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

          {/* Compact card - no valid image but has title */}
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

export function LinkedInPreview({
  title,
  image,
  isValidImage,
  url,
  isLoading,
  isError,
  isValidUrl,
}: Props) {
  const showPreview = isValidUrl && !isError && image && isValidImage

  return (
    <PlatformSection
      name="LinkedIn"
      containerClassName="linkedin"
      // logo={LinkedInLogoIcon}
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
                src={image}
                isValidImage={isValidImage}
                className="h-[72px] w-[128px] shrink-0 rounded-md object-cover"
                isLoading={isLoading}
                skeletonClassName="bg-secondary"
              />
              <div className="flex min-w-0 flex-1 flex-col justify-center px-3 py-2">
                {isLoading ? (
                  <>
                    <Skeleton className="bg-secondary h-4 w-3/4" />
                    <Skeleton className="bg-secondary mt-1 h-3 w-20" />
                  </>
                ) : (
                  <>
                    <p className="text-foreground line-clamp-2 text-sm leading-snug font-semibold">
                      {title || domain(url)}
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

export function FacebookPreview({
  title,
  description,
  image,
  isValidImage,
  url,
  isLoading,
  isError,
  isValidUrl,
}: Props) {
  const showPreview = isValidUrl && !isError && title && image && isValidImage

  return (
    <PlatformSection name="Facebook" containerClassName="facebook">
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
              src={image}
              isValidImage={isValidImage}
              className="aspect-[1.91/1] w-full object-cover"
              isLoading={isLoading}
              skeletonClassName="bg-secondary"
            />
            <div className="bg-secondary space-y-0.5 px-3 py-2.5">
              {isLoading ? (
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
                    {title || '—'}
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

export function DiscordPreview({
  title,
  description,
  image,
  isValidImage,
  url,
  isLoading,
  isError,
  isValidUrl,
}: Props) {
  const showPreview = isValidUrl && !isError && image && isValidImage

  return (
    <PlatformSection name="Discord" containerClassName="discord">
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
              isValidUrl
                ? 'text-link cursor-pointer hover:underline'
                : 'text-foreground'
            )}
          >
            {url}
          </p>

          {/* Link Embed */}
          {showPreview && (
            <div
              className="bg-card mt-1.5 overflow-hidden rounded border p-4"
              style={{ maxWidth: 432 }}
            >
              <div className="space-y-1">
                {isLoading ? (
                  <>
                    <Skeleton className="bg-border h-3 w-24" />
                    <Skeleton className="bg-border h-4 w-3/4" />
                    <Skeleton className="bg-border h-3 w-full" />
                  </>
                ) : (
                  <>
                    <p className="text-foreground text-xs">{siteName(url)}</p>
                    <p className="text-link cursor-pointer leading-snug font-semibold hover:underline">
                      {title || 'No title'}
                    </p>
                    <p className="text-foreground line-clamp-2 text-sm leading-relaxed">
                      {description || 'No description'}
                    </p>
                  </>
                )}
              </div>
              <OGImage
                src={image}
                isValidImage={isValidImage}
                className="block aspect-400/210 max-h-[210px] w-full max-w-[400px] rounded-b object-cover"
                isLoading={isLoading}
                skeletonClassName="bg-border"
              />
            </div>
          )}
        </div>
      </div>
    </PlatformSection>
  )
}

export function SlackPreview({
  title,
  description,
  image,
  isValidImage,
  url,
  isLoading,
  isError,
  isValidUrl,
}: Props) {
  const showPreview = isValidUrl && !isError && image && isValidImage

  return (
    <PlatformSection
      name="Slack"
      containerClassName="slack"
      // logo={SlackIcon}
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
          <div className="text-foreground space-y-2 text-[15px] leading-relaxed">
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
              isValidUrl
                ? 'text-link cursor-pointer underline'
                : 'text-foreground'
            )}
          >
            {url}
          </p>

          {/* Link Embed */}
          {showPreview && (
            <div className="border-border relative mt-2 pl-4">
              {/* left line */}
              <span className="bg-border absolute top-0 bottom-0 left-0 h-full w-1 rounded-lg"></span>
              {isLoading ? (
                <>
                  <Skeleton className="bg-border mb-1 h-4 w-20" />
                  <Skeleton className="bg-border h-4 w-3/4" />
                  <Skeleton className="bg-border mt-1 h-3 w-1/2" />
                </>
              ) : (
                <>
                  <div className="mb-1 flex items-center gap-1.5">
                    <span className="text-foreground text-[15px] font-bold">
                      {siteName(url)}
                    </span>
                  </div>
                  <p className="text-link cursor-pointer text-[15px] leading-snug font-medium underline">
                    {title || '—'}
                  </p>
                  <p className="text-foreground/80 mt-0.5 line-clamp-2 text-[15px] leading-relaxed">
                    {description}
                  </p>
                </>
              )}
              <OGImage
                src={image}
                isValidImage={isValidImage}
                className="mt-2 aspect-[1.91/1] w-full max-w-[360px] rounded object-cover"
                isLoading={isLoading}
                skeletonClassName="bg-border"
              />
            </div>
          )}
        </div>
      </div>
    </PlatformSection>
  )
}

export function IMessagePreview({
  title,
  // description,
  image,
  isValidImage,
  url,
  isLoading,
  isError,
  isValidUrl,
}: Props) {
  const showPreview = isValidUrl && !isError && image && isValidImage

  return (
    <PlatformSection name="Messages" containerClassName="imessage">
      <div className="flex flex-col items-start space-y-3">
        <MessageBubble text="tempor incididunt" />
        <MessageBubble text={PARAGRAPH_1} />

        {showPreview && (
          <div className="bg-card squircle-2xl w-full max-w-[300px] overflow-hidden">
            <OGImage
              src={image}
              isValidImage={isValidImage}
              className="aspect-[1.91/1] w-full object-cover"
              isLoading={isLoading}
              skeletonClassName="bg-border"
            />
            <div className="space-y-0.5 p-3">
              {isLoading ? (
                <>
                  <Skeleton className="bg-border h-2.5 w-16" />
                  <Skeleton className="bg-border h-4 w-3/4" />
                  <Skeleton className="bg-border h-3 w-1/2" />
                </>
              ) : (
                <>
                  <p className="text-card-foreground line-clamp-2 text-sm leading-snug font-semibold">
                    {title || '—'}
                  </p>
                  <p className="text-muted-foreground text-xs font-medium tracking-wide">
                    {domain(url)}
                  </p>
                </>
              )}
            </div>
          </div>
        )}

        {!showPreview && url && <MessageBubble text={url} isLink />}
      </div>
    </PlatformSection>
  )
}

function MessageBubble(props: { text: string; isLink?: boolean }) {
  const type = props.text.length > 20 ? 'squircle' : 'rounded-full'
  return (
    <div
      className={cn(
        'bg-primary text-primary-foreground max-w-[300px] px-3.5 py-2.5 text-base leading-[1.3] font-medium',
        type === 'squircle' && 'squircle-2xl',
        type === 'rounded-full' && 'rounded-full'
      )}
    >
      {props.isLink ? (
        <a
          href={props.text}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2"
        >
          {props.text}
        </a>
      ) : (
        <p>{props.text}</p>
      )}
    </div>
  )
}

export function WhatsAppPreview({
  title,
  description,
  image,
  isValidImage,
  url,
  isLoading,
  isError,
  isValidUrl,
}: Props) {
  const showPreview = isValidUrl && !isError && image && isValidImage

  return (
    <PlatformSection name="WhatsApp" containerClassName="whatsapp">
      {/* Message Bubble with Link Preview */}
      <div className="bg-card max-w-[230px] overflow-hidden rounded-xl p-1">
        {/* Link Preview */}
        {showPreview && (
          <div className="bg-background/50 rounded-lg">
            <OGImage
              src={image}
              isValidImage={isValidImage}
              className="aspect-[1.91/1] w-full rounded-t-lg object-cover"
              isLoading={isLoading}
              skeletonClassName="bg-border"
            />
            <div className="space-y-1.5 p-3">
              {isLoading ? (
                <>
                  <Skeleton className="bg-border h-4 w-3/4" />
                  <Skeleton className="bg-border h-3 w-full" />
                  <Skeleton className="bg-border h-3 w-24" />
                </>
              ) : (
                <>
                  <p className="text-foreground text-sm leading-snug font-semibold">
                    {title || '—'}
                  </p>
                  <p className="text-muted-foreground line-clamp-5 text-xs">
                    {description}
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
              isValidUrl ? 'text-link underline' : 'text-foreground'
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

export function PlatformPreviews(props: Props) {
  return (
    <div className="flex flex-col gap-10">
      <TwitterPreview {...props} />
      <LinkedInPreview {...props} />
      <SlackPreview {...props} />
      <DiscordPreview {...props} />
      <FacebookPreview {...props} />
      <WhatsAppPreview {...props} />
      <IMessagePreview {...props} />
    </div>
  )
}
