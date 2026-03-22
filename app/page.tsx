'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { OGPreview } from '@/components/og-preview';
import { PlatformPreviews } from '@/components/platform-previews';
import { OGPreviewSkeleton } from '@/components/og-preview-skeleton';
import { PlatformPreviewsSkeleton } from '@/components/platform-previews-skeleton';

const DEFAULT_URL = 'https://vercel.com';

interface OGData {
  title: string;
  description: string;
  image: string;
  url: string;
  type?: string;
}

export default function Home() {
  const [url, setUrl] = useState(DEFAULT_URL);
  const [ogData, setOgData] = useState<OGData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout>();

  const fetchOG = useCallback(async (urlToFetch: string) => {
    if (!urlToFetch.trim()) {
      setError('Please enter a URL');
      setOgData(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Ensure URL has protocol
      let finalUrl = urlToFetch.trim();
      if (!finalUrl.startsWith('http://') && !finalUrl.startsWith('https://')) {
        finalUrl = 'https://' + finalUrl;
      }

      const response = await fetch(
        `/api/og?url=${encodeURIComponent(finalUrl)}`
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch metadata');
      }

      const data = await response.json();
      setOgData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch metadata');
      setOgData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUrl = e.target.value;
    setUrl(newUrl);

    // Clear existing timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Set new timer for debounced fetch
    debounceTimerRef.current = setTimeout(() => {
      fetchOG(newUrl);
    }, 500); // 500ms debounce
  };

  // Fetch OG data on mount with default URL
  useEffect(() => {
    fetchOG(DEFAULT_URL);
  }, [fetchOG]);

  return (
    <main className="min-h-screen bg-background text-foreground py-12 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground mb-1 text-left font-sans">
            OG Preview
          </h1>
          <p className="text-sm text-muted-foreground text-left">
            See how your URL appears when shared across the web.
          </p>
        </div>

        {/* Input Section */}
        <div className="mb-10">
          <input
            type="text"
            value={url}
            onChange={handleInputChange}
            placeholder="https://example.com"
            className="w-full px-4 py-2.5 bg-card border border-border rounded-md text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring transition-colors font-mono"
          />
          {error && <p className="text-destructive text-xs mt-2">{error}</p>}
        </div>

        {/* Content Sections */}
        <div className="space-y-16">
          {/* OG Metadata Section */}
          {loading ? (
            <OGPreviewSkeleton />
          ) : ogData ? (
            <OGPreview
              title={ogData.title}
              description={ogData.description}
              image={ogData.image}
              url={ogData.url}
            />
          ) : null}

          {/* Platform Previews Section */}
          {loading ? (
            <PlatformPreviewsSkeleton />
          ) : ogData ? (
            <PlatformPreviews
              title={ogData.title}
              description={ogData.description}
              image={ogData.image}
              url={ogData.url}
            />
          ) : null}
        </div>
      </div>
    </main>
  );
}
