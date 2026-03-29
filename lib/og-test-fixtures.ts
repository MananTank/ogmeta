import type { OGTestOptions } from '@/lib/og-test-html'

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
  config: OGTestOptions
  results?: OgTestFixtureAppResult
}

const RESULT_NO_PREVIEW = 'no preview, link shown'
export const NOT_A_RELEVANT_TEST = 'not a relevant test'

/** Deliberately invalid input for URL validation in previews / UI tests. */
export const OG_TEST_INVALID_URL_INPUT = 'not-a-valid-url'

export const OG_TEST_FIXTURES: Record<string, OgTestFixture> = {
  // Length variations
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
    results: {
      discord:
        'big preview - 3 rows + image: site name, og:title, og:description',
      slack:
        'big preview - 3 rows + image: favicon + site name, og:title, og:description',
      facebook: 'big preview - image + 2 rows: domain, title',
      twitter: 'big preview - image, twitter:title',
      linkedin: 'perview - og:title, domain',
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
    results: {
      linkedin: 'perview - og:title, domain. title is max 2 lines',
      twitter: 'big preview - image, twitter:title',
      facebook:
        'big preview - image + 2 rows: domain, title. title max limit 2 lines',
      discord:
        'big preview - 3 rows + image: site name, og:title, og:description. title max limit: 70, description max limit: 350 and then ...',
      slack:
        'big preview - 3 rows + image: favicon + site name, og:title, og:description. no limit on title, description limited to 700 characters and a show more and show less buttons shown to toggle',
    },
  },
  // Image variations
  'image-square': {
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
        title: 'short',
        card: 'summary_large_image',
        description: 'short',
        image: '1/1',
      },
    },
    results: {
      linkedin: 'resized to 1200/630 aspect ratio',
      twitter: 'resized to 1200/630 aspect ratio',
      discord:
        'image shown in original aspect ratio, max-width 300 instead of 400 for square',
      slack: 'image shown in original aspect ratio',
      facebook: 'resized to 1200/630 aspect ratio',
    },
  },
  'image-broken': {
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
    results: {
      linkedin: 'text preview - 3 rows: og:title, domain, og:description',
      twitter:
        'small preview - 3 rows: domain, twitter:title, twitter:description',
      discord: 'small preview - 3 rows: site name, og:title, og:description',
      slack:
        'small preview - 3 rows: favicon + site name, og:title, og:description',
      facebook: 'invisible area shown instead of image',
    },
  },
  'image-none': {
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
    results: {
      linkedin: 'text preview - 3 rows: og:title, domain, og:description',
      twitter:
        'small preview - 3 rows: domain, twitter:title, twitter:description',
      discord: 'small preview - 3 rows: site name, og:title, og:description',
      slack:
        'small preview - 3 rows: favicon + site name, og:title, og:description',
      facebook: 'small preview - 2 rows: domain, og:title',
    },
  },
  // Partial Data
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
      linkedin: 'text preview - 2 rows: hard coded title "Web Link", domain',
      twitter: NOT_A_RELEVANT_TEST,
      discord:
        'big preview - 2 rows + image: twitter:title, twitter:description',
      slack:
        'big preview - 3 rows + image: favicon + domain, twitter:title, twitter:description',
      facebook: 'small preview - 2 rows: domain, domain (as title)',
    },
  },
  'no-meta': {
    config: {
      title: 'none',
      desc: 'none',
      og: 'none',
      twitter: 'none',
    },
    results: {
      linkedin: 'text preview - 2 rows: hard coded title "Web Link", domain',
      twitter: RESULT_NO_PREVIEW,
      slack: RESULT_NO_PREVIEW,
      discord: RESULT_NO_PREVIEW,
      facebook: 'small preview - 2 rows: domain, domain (as title)',
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
      linkedin: 'text preview - 2 rows: title, domain',
      twitter: RESULT_NO_PREVIEW,
      slack: RESULT_NO_PREVIEW,
      discord: RESULT_NO_PREVIEW,
      facebook: 'small preview - 2 rows: domain, title',
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
      linkedin:
        'text preview - 3 rows: hard coded title "Web Link", domain, description',
      twitter: RESULT_NO_PREVIEW,
      discord: RESULT_NO_PREVIEW,
      slack: 'small preview - 2 rows: domain, domain (as title)',
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
      linkedin: 'text preview - 3 rows: title, domain, description',
      twitter: RESULT_NO_PREVIEW,
      discord: 'small preview - 2 rows: title, description',
      slack: 'small preview - 3 rows: favicon + domain, title, description',
      facebook: 'small preview - 2 rows: domain, title',
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
      linkedin: 'preview - image + 2 rows: og:title, domain',
      twitter: 'big preview - image, og:title',
      discord:
        'big preview - 3 rows + image: site name, og:title, og:description',
      slack:
        'big preview - 3 rows + image: favicon + site name, og:title, og:description',
      facebook: 'preview - image + 2 rows: domain, og:title',
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
    results: {
      linkedin: 'preview - image + 2 rows: title, domain',
      twitter: 'big preview - image, title',
      facebook: 'preview - image + 2 rows: domain, title',
      discord: 'big preview - 3 rows + image: site name, title, og:description',
      slack:
        'big preview - 3 rows + image: favicon + site name, title, og:description. no limit on title, description limited to 700 characters and a show more and show less buttons shown to toggle',
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
    results: {
      linkedin: 'preview - image + 2 rows: og:title, domain',
      twitter: 'big preview - image, title',
      facebook: 'preview - image + 2 rows: domain, title',
      discord: 'big preview - 3 rows + image: site name, title, og:description',
      slack:
        'big preview - 3 rows + image: favicon + site name, og:title, description',
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
    results: {
      slack: NOT_A_RELEVANT_TEST,
      discord: NOT_A_RELEVANT_TEST,
      linkedin: NOT_A_RELEVANT_TEST,
      facebook: NOT_A_RELEVANT_TEST,
      whatsapp: NOT_A_RELEVANT_TEST,
      imessage: NOT_A_RELEVANT_TEST,
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
    results: {
      slack: NOT_A_RELEVANT_TEST,
      discord: NOT_A_RELEVANT_TEST,
      linkedin: NOT_A_RELEVANT_TEST,
      facebook: NOT_A_RELEVANT_TEST,
      whatsapp: NOT_A_RELEVANT_TEST,
      imessage: NOT_A_RELEVANT_TEST,
    },
  },
  // Twitter Card variations
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
    results: {
      slack: NOT_A_RELEVANT_TEST,
      discord: NOT_A_RELEVANT_TEST,
      linkedin: NOT_A_RELEVANT_TEST,
      facebook: NOT_A_RELEVANT_TEST,
      whatsapp: NOT_A_RELEVANT_TEST,
      imessage: NOT_A_RELEVANT_TEST,
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
    results: {
      slack: NOT_A_RELEVANT_TEST,
      discord: NOT_A_RELEVANT_TEST,
      linkedin: NOT_A_RELEVANT_TEST,
      facebook: NOT_A_RELEVANT_TEST,
      whatsapp: NOT_A_RELEVANT_TEST,
      imessage: NOT_A_RELEVANT_TEST,
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
    results: {
      slack: NOT_A_RELEVANT_TEST,
      discord: NOT_A_RELEVANT_TEST,
      linkedin: NOT_A_RELEVANT_TEST,
      facebook: NOT_A_RELEVANT_TEST,
      whatsapp: NOT_A_RELEVANT_TEST,
      imessage: NOT_A_RELEVANT_TEST,
    },
  },
}
