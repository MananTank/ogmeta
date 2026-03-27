import type { OgTestHtmlOptions } from '@/lib/og-test-html'

/**
 * Observed link-preview behavior per app when pasting the fixture URL.
 * Fill in as you test (Twitter, LinkedIn, etc.).
 */
export type OgTestFixtureAppResult = {
  twitter?: string
  linkedin?: string
  facebook?: string
  discord?: string
  slack?: string
  whatsapp?: string
  imessage?: string
}

export type OgTestFixture = {
  config: OgTestHtmlOptions
  results?: OgTestFixtureAppResult
}

const TWITTER_NO_PREVIEW = 'no preview, link shown'

export const OG_TEST_FIXTURES: Record<string, OgTestFixture> = {
  'no-meta': {
    config: {
      title: 'none',
      desc: 'none',
      og: 'none',
      twitter: 'none',
    },
    results: {
      twitter: TWITTER_NO_PREVIEW,
    },
  },
  'only-title': {
    config: {
      title: 'short',
      desc: 'none',
      og: 'none',
      twitter: 'none',
    },
    results: {
      twitter: TWITTER_NO_PREVIEW,
    },
  },
  'only-desc': {
    config: {
      title: 'none',
      desc: 'short',
      og: 'none',
      twitter: 'none',
    },
    results: {
      twitter: TWITTER_NO_PREVIEW,
    },
  },
  'only-meta': {
    config: {
      title: 'short',
      desc: 'short',
      og: 'none',
      twitter: 'none',
    },
    results: {
      twitter: TWITTER_NO_PREVIEW,
    },
  },
  'only-og': {
    config: {
      title: 'none',
      desc: 'none',
      og: {
        title: 'short',
        desc: 'short',
        image: '1200/630',
        type: 'website',
      },
      twitter: 'none',
    },
    results: {
      twitter: TWITTER_NO_PREVIEW,
    },
  },
  'only-twitter': {
    config: {
      title: 'none',
      desc: 'none',
      og: 'none',
      twitter: {
        title: 'short',
        card: 'summary_large_image',
        description: 'short',
        image: '1200/630',
      },
    },
    results: {
      twitter: TWITTER_NO_PREVIEW,
    },
  },
  'complete-short': {
    config: {
      title: 'short',
      desc: 'short',
      og: {
        title: 'short',
        desc: 'short',
        image: '1200/630',
        type: 'website',
      },
      twitter: {
        title: 'short',
        card: 'summary_large_image',
        description: 'short',
        image: '1200/630',
        site: '@example',
      },
    },
  },
  'complete-long': {
    config: {
      title: 'long',
      desc: 'long',
      og: {
        title: 'long',
        desc: 'long',
        image: '1200/630',
        type: 'website',
      },
      twitter: {
        title: 'long',
        card: 'summary_large_image',
        description: 'long',
        image: '1200/630',
        site: '@example',
      },
    },
  },
  'no-og-title': {
    config: {
      title: 'short',
      desc: 'short',
      og: {
        title: 'none', // missing
        desc: 'short',
        image: '1200/630',
        type: 'website',
      },
      twitter: {
        title: 'none', // missing
        card: 'summary_large_image',
        description: 'short',
        image: '1200/630',
      },
    },
  },
  'no-og-description': {
    config: {
      title: 'short',
      desc: 'short',
      og: {
        title: 'short',
        desc: 'none', // missing
        image: '1200/630',
        type: 'website',
      },
      twitter: {
        title: 'none',
        card: 'summary_large_image',
        description: 'none', // missing
        image: '1200/630',
      },
    },
  },
  'no-og-image': {
    config: {
      title: 'short',
      desc: 'short',
      og: {
        title: 'short',
        desc: 'short',
        image: 'none', // missing
        type: 'website',
      },
      twitter: {
        title: 'short',
        card: 'summary_large_image',
        description: 'none',
        image: 'none', // missing
      },
    },
  },
  'no-twitter': {
    config: {
      title: 'short',
      desc: 'short',
      og: {
        title: 'short',
        desc: 'short',
        image: '1200/630',
        type: 'website',
      },
      twitter: 'none',
    },
  },
  'no-twitter-description': {
    config: {
      title: 'short',
      desc: 'short',
      og: {
        title: 'short',
        desc: 'short',
        image: '1200/630',
        type: 'website',
      },
      twitter: {
        title: 'short',
        card: 'summary_large_image',
        description: 'none',
        image: '1200/630',
      },
    },
  },
  'og-image-broken': {
    config: {
      title: 'short',
      desc: 'short',
      og: {
        title: 'short',
        desc: 'short',
        image: 'broken',
        type: 'website',
      },
      twitter: {
        title: 'short',
        card: 'summary_large_image',
        description: 'short',
        image: 'broken',
      },
    },
  },
  'og-square': {
    config: {
      title: 'short',
      desc: 'short',
      og: {
        title: 'short',
        desc: 'short',
        image: '1/1',
        type: 'website',
      },
      twitter: {
        title: 'none',
        card: 'none',
        description: 'none',
        image: 'none',
      },
    },
  },
  'twitter-only': {
    config: {
      title: 'short',
      desc: 'none',
      og: {
        title: 'none',
        desc: 'none',
        image: 'none',
        type: 'website',
      },
      twitter: {
        title: 'short',
        card: 'summary_large_image',
        description: 'short',
        image: '1200/630',
      },
    },
  },
  'og-only-no-twitter': {
    config: {
      title: 'short',
      desc: 'short',
      og: {
        title: 'short',
        desc: 'short',
        image: '1200/630',
        type: 'website',
      },
      twitter: {
        title: 'none',
        card: 'none',
        description: 'none',
        image: 'none',
      },
    },
  },
  'twitter-card-summary': {
    config: {
      title: 'short',
      desc: 'short',
      og: {
        title: 'short',
        desc: 'short',
        image: '1200/630',
        type: 'website',
      },
      twitter: {
        title: 'short',
        card: 'summary',
        description: 'short',
        image: '1200/630',
      },
    },
  },
  'twitter-card-none': {
    config: {
      title: 'long',
      desc: 'long',
      og: {
        title: 'long',
        desc: 'long',
        image: '1200/630',
        type: 'website',
      },
      twitter: {
        title: 'long',
        card: 'none',
        description: 'long',
        image: '1200/630',
        site: '@example',
      },
    },
  },
  'twitter-card-large-image': {
    config: {
      title: 'short',
      desc: 'short',
      og: {
        title: 'short',
        desc: 'short',
        image: '1200/630',
        type: 'website',
      },
      twitter: {
        title: 'short',
        card: 'summary_large_image',
        description: 'short',
        image: '1200/630',
      },
    },
  },
  'og-title-long': {
    config: {
      title: 'short',
      desc: 'short',
      og: {
        title: 'long',
        desc: 'short',
        image: '1200/630',
        type: 'website',
      },
      twitter: {
        title: 'none',
        card: 'none',
        description: 'none',
        image: 'none',
      },
    },
  },
  'og-description-long': {
    config: {
      title: 'short',
      desc: 'short',
      og: {
        title: 'short',
        desc: 'long',
        image: '1200/630',
        type: 'website',
      },
      twitter: {
        title: 'none',
        card: 'none',
        description: 'none',
        image: 'none',
      },
    },
  },
}
