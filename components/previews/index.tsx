'use client'

import type { PlatformPreviewsProps } from './types'
import { DiscordPreview } from './discord-preview'
import { FacebookPreview } from './facebook-preview'
import { IMessagePreview } from './imessage-preview'
import { LinkedInPreview } from './linkedin-preview'
import { SlackPreview } from './slack-preview'
import { TwitterPreview } from './twitter-preview'
import { WhatsAppPreview } from './whatsapp-preview'

export function PlatformPreviews(props: PlatformPreviewsProps) {
  return (
    <div className="flex flex-col gap-6">
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
