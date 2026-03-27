import type { MetadataRoute } from 'next'

/** Keep OG fixture pages out of search indexes; still allow manual / preview fetches. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      disallow: ['/tests'],
    },
  }
}
