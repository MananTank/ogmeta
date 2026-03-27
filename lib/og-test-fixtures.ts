import type { OgTestHtmlOptions } from '@/lib/og-test-html'

export const OG_TEST_FIXTURES: Record<string, OgTestHtmlOptions> = {
  'no-meta': {
    title: 'none',
    desc: 'none',
    og: 'none',
    twitter: 'none',
  },
  'only-title': {
    title: 'short',
    desc: 'none',
    og: 'none',
    twitter: 'none',
  },
  'only-desc': {
    title: 'none',
    desc: 'short',
    og: 'none',
    twitter: 'none',
  },
  'only-meta': {
    title: 'short',
    desc: 'short',
    og: 'none',
    twitter: 'none',
  },
  'only-og': {
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
  'only-twitter': {
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
  'complete/short': {
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
  'complete/long': {
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
  'no-og-title': {
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
  'no-og-description': {
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
  'no-og-image': {
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
  'no-twitter': {
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
  'no-twitter-description': {
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
  'og-image-relative': {
    title: 'short',
    desc: 'short',
    og: {
      title: 'short',
      desc: 'short',
      image: 'relative',
      type: 'website',
    },
    twitter: {
      title: 'short',
      card: 'summary_large_image',
      description: 'short',
      image: 'relative',
    },
  },
  'og-image-broken': {
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
  'og-square': {
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
  'twitter-only': {
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
  'og-only-no-twitter': {
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
  'twitter-card-summary': {
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
  'twitter-card-none': {
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
  'twitter-card-large-image': {
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
  'og-title-long': {
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
  'og-description-long': {
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
}
