'use client'

import { MessageCircle, ThumbsUpIcon } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { type DocumentMetadata } from '@/lib/og-types'
import {
  OGImage,
  PlatformSection,
  UserAvatar,
  UserName,
  domain,
} from '../common'
import type { PlatformPreviewsProps } from '../types'
import { cn } from '@/lib/utils'
import { FbLikeIcon, FbSmileIcon, ShareArrowIcon } from './icons'

export function FacebookPreview(props: PlatformPreviewsProps) {
  const url = props.data?.url ?? props.urlInput ?? ''
  const showLinkCard = Boolean(
    props.isValidUrl && !props.isError && (props.isLoading || props.data)
  )
  const fb = props.data ? effectiveFacebookPreview(props.data) : null

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

            {!showLinkCard && (
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

        {/* Link Preview Card — big image, broken-image placeholder, or small (text-only) */}
        {showLinkCard && (fb || props.isLoading) && (
          <div className="border-t dark:border-transparent">
            {props.isLoading
              ? (!fb ||
                  fb.imageMode === 'large' ||
                  fb.imageMode === 'broken') && (
                  <OGImage
                    src={fb?.imageSrc ?? ''}
                    isValidImage={fb?.imageMode !== 'broken'}
                    className="aspect-[1.91/1] w-full rounded-none"
                    isLoading
                    skeletonClassName="bg-secondary"
                  />
                )
              : fb && (
                  <>
                    {fb.imageMode === 'large' && (
                      <OGImage
                        src={fb.imageSrc}
                        isValidImage
                        className="aspect-[1.91/1] w-full object-cover"
                        isLoading={false}
                        skeletonClassName="bg-secondary"
                      />
                    )}
                    {fb.imageMode === 'broken' && (
                      <div
                        className="dark:bg-muted/40 aspect-[1.91/1] w-full bg-[#f2f3f5]"
                        aria-hidden
                      />
                    )}
                  </>
                )}
            <div className="bg-secondary space-y-0.5 border-t px-3 py-2.5 dark:border-transparent">
              {props.isLoading ? (
                <>
                  <Skeleton className="bg-border h-5 w-20" />
                  <Skeleton className="bg-border h-6 w-3/4" />
                </>
              ) : (
                fb && (
                  <>
                    <p className="text-muted-foreground text-[12px] tracking-wide uppercase @sm/preview:text-[13px]">
                      {domain(url)}
                    </p>
                    <p className="text-foreground line-clamp-2 text-base leading-snug font-semibold @sm/preview:text-[17px]">
                      {fb.title || domain(url)}
                    </p>
                    {fb.description ? (
                      <p className="text-muted-foreground line-clamp-1 text-base leading-snug @sm/preview:hidden">
                        {fb.description}
                      </p>
                    ) : null}
                  </>
                )
              )}
            </div>
          </div>
        )}

        <EngagementStats />
        <ActionButtons />
      </div>
    </PlatformSection>
  )
}

function EngagementStats() {
  return (
    <div className="text-muted-foreground flex items-center px-3 py-2 text-[13px]">
      <span className="flex -space-x-1">
        <FbLikeIcon className="size-[18px]" />
        <FbSmileIcon className="size-[18px]" />
      </span>
      <span className="ml-1.5">128</span>
      <span className="mx-auto" />
      <span>24 comments</span>
      <span className="mx-1.5">·</span>
      <span>5 shares</span>
    </div>
  )
}

function ActionButtons() {
  return (
    <div className="flex items-center justify-around px-2 py-1">
      <ActionButton icon={ThumbsUpIcon} label="Like" />
      <ActionButton
        icon={MessageCircle}
        label="Comment"
        iconClassName="-scale-x-100"
      />
      <ActionButton icon={ShareArrowIcon} label="Share" />
    </div>
  )
}

function ActionButton(props: {
  label: string
  icon: React.FC<{ className?: string }>
  iconClassName?: string
}) {
  return (
    <button className="text-muted-foreground hover:bg-secondary flex flex-1 items-center justify-center gap-2 rounded py-2.5 transition-colors">
      <props.icon className={cn('h-5 w-5', props.iconClassName)} />
      <span className="text-[15px] font-medium">Like</span>
    </button>
  )
}

/**
 * Facebook link preview: Open Graph only (not Twitter Card). Title falls back to
 * document title, then hostname — matches observed behavior in OG test fixtures.
 */
type FacebookPreviewImageMode = 'large' | 'broken' | 'none'

export function effectiveFacebookPreview(data: DocumentMetadata): {
  title: string
  description: string
  imageMode: FacebookPreviewImageMode
  /** Absolute og:image URL when mode is `large` or `broken` */
  imageSrc: string
} {
  const og = data.openGraph
  const doc = data.doc
  const url = data.url

  function hostnameLabel(): string {
    try {
      return new URL(url).hostname.replace(/^www\./, '')
    } catch {
      return ''
    }
  }

  const title = og.title?.trim() || doc.title?.trim() || hostnameLabel()
  const description = og.description?.trim() || doc.description?.trim() || ''

  const imageSrc = og.image?.trim() ?? ''
  if (!imageSrc) {
    return { title, description, imageMode: 'none', imageSrc: '' }
  }
  if (!og.isValidImage) {
    return { title, description, imageMode: 'broken', imageSrc }
  }
  return { title, description, imageMode: 'large', imageSrc }
}
