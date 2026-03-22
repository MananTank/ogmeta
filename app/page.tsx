"use client";

import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { OGPreview } from "@/components/og-preview";
import { PlatformPreviews } from "@/components/platform-previews";
import { OGPreviewSkeleton } from "@/components/og-preview-skeleton";
import { PlatformPreviewsSkeleton } from "@/components/platform-previews-skeleton";
import { Input } from "../components/ui/input";

const DEFAULT_URL = "https://vercel.com";

interface OGData {
  title: string;
  description: string;
  image: string;
  url: string;
  siteName?: string;
  type?: string;
}

async function fetchOGData(url: string): Promise<OGData> {
  let finalUrl = url.trim();
  if (!finalUrl.startsWith("http://") && !finalUrl.startsWith("https://")) {
    finalUrl = "https://" + finalUrl;
  }

  const response = await fetch(`/api/og?url=${encodeURIComponent(finalUrl)}`);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to fetch metadata");
  }

  return response.json();
}

export default function Home() {
  const [url, setUrl] = useState(DEFAULT_URL);
  const [debouncedUrl, setDebouncedUrl] = useState(DEFAULT_URL);
  const debounceTimerRef = useRef<NodeJS.Timeout>(null);

  const {
    data: ogData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["og", debouncedUrl],
    queryFn: () => fetchOGData(debouncedUrl),
    enabled: !!debouncedUrl.trim(),
  });

  console.log({ ogData });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUrl = e.target.value;
    setUrl(newUrl);

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      setDebouncedUrl(newUrl);
    }, 500);
  };

  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  return (
    <main className="min-h-screen">
      {/* Header & Input - Constrained */}
      <div className="max-w-3xl mx-auto px-5 sm:px-8 py-16 md:py-24">
        <header className="mb-12">
          <h1 className="text-3xl font-medium tracking-tight">OG Meta</h1>
          <p className="text-muted-foreground text-3xl tracking-tight font-medium">
            Visualize your link on various platforms
          </p>
        </header>

        <div className="mb-16">
          <Input
            type="text"
            value={url}
            aria-label="URL"
            onChange={handleInputChange}
            placeholder="https://example.com"
          />
          {error && (
            <p className="text-destructive text-sm mt-3 flex items-center gap-2">
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {error instanceof Error
                ? error.message
                : "Failed to fetch metadata"}
            </p>
          )}
        </div>

        {/* OG Metadata Section - Constrained */}
        <section>
          {isLoading ? (
            <OGPreviewSkeleton />
          ) : ogData ? (
            <OGPreview
              title={ogData.title}
              description={ogData.description}
              image={ogData.image}
              url={ogData.url}
            />
          ) : null}
        </section>
      </div>

      {/* Platform Previews - Full Width */}
      <section>
        {isLoading ? (
          <PlatformPreviewsSkeleton />
        ) : ogData ? (
          <PlatformPreviews
            title={ogData.title}
            description={ogData.description}
            image={ogData.image}
            url={ogData.url}
          />
        ) : null}
      </section>
    </main>
  );
}
