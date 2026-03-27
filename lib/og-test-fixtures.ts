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

const RESULT_NO_PREVIEW = 'no preview, link shown'
export const NOT_A_RELEVANT_TEST = 'not a relevant test'

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
      slack:
        'big preview - 3 rows + image: favicon + site name, og:title, og:description',
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
      slack: 'image shown in original aspect ratio',
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
      slack:
        'small preview - 3 rows: favicon + site name, og:title, og:description',
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
      slack:
        'small preview - 3 rows: favicon + site name, og:title, og:description',
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
      slack:
        'big preview - 3 rows + image: favicon + domain, twitter:title, twitter:description',
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
      twitter: RESULT_NO_PREVIEW,
      slack: RESULT_NO_PREVIEW,
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
      twitter: RESULT_NO_PREVIEW,
      slack: RESULT_NO_PREVIEW,
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
      twitter: RESULT_NO_PREVIEW,
      slack: 'small preview - 2 rows: domain, description',
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
      slack: 'small preview - 3 rows: favicon + domain, title, description',
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
      slack:
        'big preview - 3 rows + image: favicon + site name, og:title, og:description',
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
