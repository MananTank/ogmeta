import { NextRequest, NextResponse } from 'next/server';

interface OGMetadata {
  title: string;
  description: string;
  image: string;
  url: string;
  type?: string;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');

    if (!url) {
      return NextResponse.json(
        { error: 'URL parameter is required' },
        { status: 400 }
      );
    }

    // Validate URL format
    try {
      new URL(url);
    } catch {
      return NextResponse.json(
        { error: 'Invalid URL format' },
        { status: 400 }
      );
    }

    // Fetch the URL content
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; OG-Preview/1.0)',
      },
      redirect: 'follow',
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch URL: ${response.statusText}` },
        { status: response.status }
      );
    }

    const html = await response.text();

    // Parse OG metadata from HTML
    const metadata = parseOGMetadata(html, url);

    return NextResponse.json(metadata);
  } catch (error) {
    console.error('[v0] OG fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch or parse URL' },
      { status: 500 }
    );
  }
}

function parseOGMetadata(html: string, url: string): OGMetadata {
  const ogRegex = /<meta\s+(?:name|property)=["']og:([^"']+)["']\s+content=["']([^"']*)["']/gi;
  const metadata: Record<string, string> = {};

  let match;
  while ((match = ogRegex.exec(html)) !== null) {
    const key = match[1].toLowerCase();
    const value = match[2];
    if (!metadata[key]) {
      metadata[key] = value;
    }
  }

  // Extract title from og:title or <title>
  let title = metadata['title'] || '';
  if (!title) {
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    title = titleMatch ? titleMatch[1] : 'No title found';
  }

  // Extract description
  let description = metadata['description'] || '';
  if (!description) {
    const metaDescMatch = html.match(
      /<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i
    );
    description = metaDescMatch ? metaDescMatch[1] : '';
  }

  // Extract image
  const image = metadata['image'] || '';

  // Extract type
  const type = metadata['type'] || 'website';

  // Resolve relative image URLs
  let resolvedImage = image;
  if (image && !image.startsWith('http')) {
    try {
      const baseUrl = new URL(url);
      resolvedImage = new URL(image, baseUrl).href;
    } catch {
      resolvedImage = image;
    }
  }

  return {
    title,
    description,
    image: resolvedImage,
    url,
    type,
  };
}
