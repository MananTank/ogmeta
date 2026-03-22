"use client";

import {
  MessageCircle,
  Repeat2,
  Heart,
  BarChart2,
  Bookmark,
} from "lucide-react";
import Avatar from "boring-avatars";
import { LinkedInGlobeIcon } from "./icons/linkedin";

interface Props {
  title: string;
  description: string;
  image: string;
  url: string;
}

function domain(url: string) {
  try {
    return new URL(url).hostname.replace("www.", "");
  } catch {
    return url;
  }
}

function siteName(url: string) {
  try {
    const hostname = new URL(url).hostname.replace("www.", "");
    const name = hostname.split(".")[0];
    return name.charAt(0).toUpperCase() + name.slice(1);
  } catch {
    return url;
  }
}

function OGImage({ src, className }: { src: string; className?: string }) {
  if (!src) return null;
  return (
    <img
      src={src}
      alt="og preview"
      className={className}
      onError={(e) => {
        e.currentTarget.style.display = "none";
      }}
    />
  );
}

function PlatformSection({
  children,
  className,
  label,
}: {
  children: React.ReactNode;
  className?: string;
  label: string;
}) {
  return (
    <div className={`w-full py-16 px-5 sm:px-8 ${className || ""}`}>
      <div className="max-w-3xl mx-auto">
        <p className="text-xs font-medium text-muted-foreground tracking-widest uppercase mb-8">
          {label}
        </p>
        <div>{children}</div>
      </div>
    </div>
  );
}

function TwitterPreview({ title, description, image, url }: Props) {
  return (
    <div className="w-full bg-black py-16 px-5 sm:px-8">
      <div className="max-w-3xl mx-auto">
        <p className="text-xs font-medium text-neutral-500 tracking-widest uppercase mb-8">
          Twitter
        </p>
        <div className="w-full max-w-[512px]">
          <div className="flex gap-3">
            <div className="shrink-0">
              <Avatar
                size={40}
                name="Someone"
                variant="beam"
                colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-sm font-bold text-white">Someone</span>
                <span className="text-sm text-neutral-500">@someone</span>
                <span className="text-neutral-500 text-sm">·</span>
                <span className="text-sm text-neutral-500">2h</span>
              </div>

              <div className="space-y-1.5 text-sm text-white leading-relaxed mt-1">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Vivamus faucibus ultrices risus
                </p>
              </div>

              <div className="mt-3">
                <div className="rounded-2xl border border-neutral-800 overflow-hidden relative">
                  <OGImage src={image} className="w-full h-auto block" />
                  {title && (
                    <div className="absolute bottom-3 left-3 right-3">
                      <span
                        className="block text-white text-[13px] font-semibold px-3 py-1.5 overflow-hidden whitespace-nowrap text-ellipsis backdrop-blur-md rounded"
                        style={{ backgroundColor: "rgba(0,0,0,0.75)" }}
                      >
                        {title}
                      </span>
                    </div>
                  )}
                </div>
                <p className="text-[13px] text-neutral-500 mt-1.5 ml-0.5">
                  From {domain(url)}
                </p>
              </div>

              <div className="flex items-center justify-between mt-3 max-w-[400px] text-neutral-500">
                <button className="flex items-center gap-1.5 hover:text-sky-400 transition-colors">
                  <MessageCircle className="w-4 h-4" />
                  <span className="text-xs">24</span>
                </button>
                <button className="flex items-center gap-1.5 hover:text-green-400 transition-colors">
                  <Repeat2 className="w-4 h-4" />
                  <span className="text-xs">8</span>
                </button>
                <button className="flex items-center gap-1.5 hover:text-pink-400 transition-colors">
                  <Heart className="w-4 h-4" />
                  <span className="text-xs">142</span>
                </button>
                <button className="flex items-center gap-1.5 hover:text-sky-400 transition-colors">
                  <BarChart2 className="w-4 h-4" />
                  <span className="text-xs">12.4K</span>
                </button>
                <button className="flex items-center gap-1.5 hover:text-sky-400 transition-colors">
                  <Bookmark className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LinkedInPreview({ title, description, image, url }: Props) {
  return (
    <PlatformSection label="LinkedIn" className="bg-linkedin-background">
      <div
        className="rounded-lg overflow-hidden bg-linkedin-card w-full shadow-sm"
        style={{ maxWidth: 552 }}
      >
        {/* Post Header */}
        <div className="p-4 pb-0">
          <div className="flex gap-2">
            <div className="shrink-0">
              <Avatar
                size={48}
                name="Someone"
                variant="beam"
                colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-linkedin-foreground">
                Someone
              </p>
              <p className="text-xs text-linkedin-muted line-clamp-1">
                Product Designer at Company
              </p>
              <p className="text-xs text-linkedin-muted">
                2h • <LinkedInGlobeIcon />
              </p>
            </div>
          </div>

          {/* Post Content */}
          <div className="mt-3 text-sm text-linkedin-foreground leading-relaxed">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
              faucibus ultrices risus.
            </p>
          </div>
        </div>

        {/* Link Preview Card */}
        <div className="mx-4 mt-3 mb-2 border border-linkedin-border-subtle bg-linkedin-card rounded-lg overflow-hidden flex">
          <div className="shrink-0 w-[128px] h-[72px]">
            <OGImage src={image} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 min-w-0 px-3 py-2 flex flex-col justify-center">
            <p className="text-sm font-semibold text-linkedin-foreground line-clamp-2 leading-snug">
              {title || "—"}
            </p>
            <p className="text-xs text-linkedin-muted mt-0.5">{domain(url)}</p>
          </div>
        </div>

        {/* Engagement Stats */}
        <div className="px-4 py-2 flex items-center gap-1 text-xs text-linkedin-muted border-t border-linkedin-border">
          <span className="flex -space-x-1">
            <span className="w-4 h-4 rounded-full bg-linkedin-reaction-blue flex items-center justify-center text-white text-[8px]">
              👍
            </span>
            <span className="w-4 h-4 rounded-full bg-linkedin-reaction-orange flex items-center justify-center text-white text-[8px]">
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
        <div className="px-2 py-1 flex items-center justify-around border-t border-linkedin-border">
          <button className="flex items-center gap-1.5 px-4 py-3 rounded hover:bg-linkedin-hover transition-colors text-linkedin-muted">
            <svg
              className="w-5 h-5"
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
          <button className="flex items-center gap-1.5 px-4 py-3 rounded hover:bg-linkedin-hover transition-colors text-linkedin-muted">
            <MessageCircle className="w-5 h-5" />
            <span className="text-sm font-medium">Comment</span>
          </button>
          <button className="flex items-center gap-1.5 px-4 py-3 rounded hover:bg-linkedin-hover transition-colors text-linkedin-muted">
            <Repeat2 className="w-5 h-5" />
            <span className="text-sm font-medium">Repost</span>
          </button>
          <button className="flex items-center gap-1.5 px-4 py-3 rounded hover:bg-linkedin-hover transition-colors text-linkedin-muted">
            <svg
              className="w-5 h-5"
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
  );
}

function FacebookPreview({ title, description, image, url }: Props) {
  return (
    <PlatformSection label="Facebook" className="bg-facebook-background">
      <div
        className="rounded-lg overflow-hidden bg-facebook-card w-full shadow-sm"
        style={{ maxWidth: 500 }}
      >
        {/* Post Header */}
        <div className="p-3 pb-2">
          <div className="flex gap-2">
            <div className="shrink-0">
              <Avatar
                size={40}
                name="Someone"
                variant="beam"
                colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[15px] font-semibold text-facebook-foreground">
                Someone
              </p>
              <p className="text-xs text-facebook-muted">2h · 🌐</p>
            </div>
          </div>

          {/* Post Content */}
          <div className="mt-2 text-[15px] text-facebook-foreground leading-relaxed">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
              faucibus ultrices risus.
            </p>
          </div>
        </div>

        {/* Link Preview Card */}
        <div className="border-t border-facebook-border">
          <OGImage
            src={image}
            className="w-full aspect-[1.91/1] object-cover"
          />
          <div className="px-3 py-2.5 bg-facebook-secondary space-y-0.5">
            <p className="text-[11px] text-facebook-muted uppercase tracking-wide">
              {domain(url)}
            </p>
            <p className="text-[15px] font-semibold text-facebook-foreground line-clamp-2 leading-snug">
              {title || "—"}
            </p>
            <p className="text-[13px] text-facebook-muted line-clamp-1">
              {description}
            </p>
          </div>
        </div>

        {/* Engagement Stats */}
        <div className="px-3 py-2 flex items-center text-[13px] text-facebook-muted border-t border-facebook-border">
          <span className="flex -space-x-1">
            <span className="w-[18px] h-[18px] rounded-full bg-[#1877f2] flex items-center justify-center text-white text-[10px]">
              👍
            </span>
            <span className="w-[18px] h-[18px] rounded-full bg-[#f33e58] flex items-center justify-center text-white text-[10px]">
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
        <div className="px-2 py-1 flex items-center justify-around border-t border-facebook-border">
          <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded hover:bg-facebook-secondary transition-colors text-facebook-muted">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
            </svg>
            <span className="text-[15px] font-medium">Like</span>
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded hover:bg-facebook-secondary transition-colors text-facebook-muted">
            <MessageCircle className="w-5 h-5" />
            <span className="text-[15px] font-medium">Comment</span>
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded hover:bg-facebook-secondary transition-colors text-facebook-muted">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
            </svg>
            <span className="text-[15px] font-medium">Share</span>
          </button>
        </div>
      </div>
    </PlatformSection>
  );
}

function DiscordPreview({ title, description, image, url }: Props) {
  return (
    <PlatformSection label="Discord" className="bg-[#1A1A1E]">
      <div className="w-full" style={{ maxWidth: 550 }}>
        {/* Message */}
        <div className="flex gap-4">
          <div className="shrink-0">
            <Avatar
              size={40}
              name="Someone"
              variant="marble"
              colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
            />
          </div>
          <div className="flex-1 min-w-0">
            {/* Username and timestamp */}
            <div className="flex items-baseline gap-2">
              <span className="text-[15px] font-medium text-[#EFEFF1]">
                Someone
              </span>
              <span className="text-xs text-[#818289]">7:46 PM</span>
            </div>

            {/* Message content */}
            <p className="text-[15px] text-[#EFEFF1] leading-relaxed mt-0.5">
              testing opengraph image for
            </p>
            <p className="text-[15px] text-[#4E96EE] hover:underline cursor-pointer">
              {url}
            </p>

            {/* Link Embed */}
            <div
              className="mt-2 rounded overflow-hidden bg-[#242429]"
              style={{ maxWidth: 432 }}
            >
              <div className="p-3 pb-2 space-y-1">
                <p className="text-xs text-[#818289]">{siteName(url)}</p>
                <p className="text-[#4E96EE] font-semibold leading-snug hover:underline cursor-pointer">
                  {title || "—"}
                </p>
                <p className="text-sm text-[#EFEFF1] line-clamp-2 leading-relaxed">
                  {description}
                </p>
              </div>
              <OGImage
                src={image}
                className="w-full rounded-b"
              />
            </div>
          </div>
        </div>
      </div>
    </PlatformSection>
  );
}

function SlackPreview({ title, description, image, url }: Props) {
  return (
    <PlatformSection label="Slack" className="bg-[#1A1D21]">
      <div className="w-full" style={{ maxWidth: 550 }}>
        {/* Message */}
        <div className="flex gap-2">
          <div className="shrink-0">
            <Avatar
              size={36}
              name="Someone"
              variant="bauhaus"
              square
              colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
            />
          </div>
          <div className="flex-1 min-w-0">
            {/* Username and timestamp */}
            <div className="flex items-baseline gap-2">
              <span className="text-[15px] font-bold text-white">
                Someone
              </span>
              <span className="text-xs text-[#ABABAD]">8:23 PM</span>
            </div>

            {/* Message content */}
            <p className="text-[15px] text-[#D1D2D3] leading-relaxed">Hello</p>

            {/* URL */}
            <p className="text-[15px] text-[#1D9BD1] hover:underline cursor-pointer mt-0.5">
              {url}
            </p>

            {/* Link Embed */}
            <div
              className="mt-2 border-l-4 border-l-[#36C5F0] pl-3 py-1"
              style={{ maxWidth: 480 }}
            >
              <div className="flex items-center gap-1.5 mb-1">
                <span className="text-[15px] font-bold text-white">
                  {siteName(url)}
                </span>
              </div>
              <p className="text-[15px] text-[#1D9BD1] font-medium leading-snug hover:underline cursor-pointer">
                {title || "—"}
              </p>
              <p className="text-[15px] text-[#D1D2D3] line-clamp-2 leading-relaxed mt-0.5">
                {description}
              </p>
              <OGImage
                src={image}
                className="mt-2 w-full max-w-[360px] rounded"
              />
            </div>
          </div>
        </div>
      </div>
    </PlatformSection>
  );
}

function IMessagePreview({ title, description, image, url }: Props) {
  return (
    <PlatformSection label="iMessage" className="bg-imessage-background">
      <div
        className="rounded-2xl overflow-hidden bg-imessage-card w-full"
        style={{ maxWidth: 320 }}
      >
        <OGImage src={image} className="w-full aspect-[1.91/1] object-cover" />
        <div className="px-3 py-2.5 space-y-0.5">
          <p className="text-[10px] text-imessage-muted uppercase tracking-wide">
            {domain(url)}
          </p>
          <p className="text-sm font-semibold text-imessage-foreground line-clamp-2 leading-snug">
            {title || "—"}
          </p>
          <p className="text-[11px] text-imessage-muted line-clamp-1">
            {description}
          </p>
        </div>
      </div>
    </PlatformSection>
  );
}

function WhatsAppPreview({ title, description, image, url }: Props) {
  return (
    <PlatformSection label="WhatsApp" className="bg-[#0B141A]">
      <div className="w-full" style={{ maxWidth: 420 }}>
        {/* Message Bubble with Link Preview */}
        <div className="rounded-lg overflow-hidden bg-[#202C33]">
          {/* Link Preview */}
          <OGImage
            src={image}
            className="w-full aspect-[1.91/1] object-cover rounded-t-lg"
          />
          <div className="p-3 space-y-1.5">
            <p className="text-[15px] font-semibold text-[#E9EDEF] leading-snug">
              {title || "—"}
            </p>
            <p className="text-[14px] text-[#8696A0] line-clamp-3 leading-relaxed">
              {description}
            </p>
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-1.5">
                <svg
                  className="w-3.5 h-3.5 text-[#8696A0]"
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
                <span className="text-[13px] text-[#8696A0]">{domain(url)}</span>
              </div>
            </div>
          </div>

          {/* Message Text */}
          <div className="px-3 pb-2 space-y-1">
            <p className="text-[15px] text-[#E9EDEF] leading-relaxed">
              I was at a cross roads when I was thinking about joining and this
              is something that helped think through career decisions.
            </p>
            <p className="text-[15px] text-[#53BDEB] underline">{url}</p>
            <div className="flex items-end justify-between pt-1">
              <p className="text-[15px] text-[#E9EDEF] leading-relaxed">
                Don't want to bias you but good perspective
              </p>
              <span className="text-[11px] text-[#8696A0] ml-2 shrink-0">
                1:27 PM
              </span>
            </div>
          </div>
        </div>
      </div>
    </PlatformSection>
  );
}

export function PlatformPreviews(props: Props) {
  return (
    <>
      <TwitterPreview {...props} />
      <LinkedInPreview {...props} />
      <FacebookPreview {...props} />
      <DiscordPreview {...props} />
      <SlackPreview {...props} />
      <WhatsAppPreview {...props} />
      <IMessagePreview {...props} />
    </>
  );
}
