/** @type {import('@ladle/react').UserConfig} */
export default {
  stories: 'stories/**/*.stories.{js,jsx,ts,tsx}',
  viteConfig: '.ladle/vite.config.ts',
  storyOrder: [
    'twitter-preview--full-data',
    'twitter-preview--partial-data',
    'twitter-preview--loading',
    'twitter-preview--failed-to-fetch',
    'twitter-preview--invalid-url',
    'linkedin-preview--full-data',
    'linkedin-preview--partial-data',
    'linkedin-preview--loading',
    'linkedin-preview--failed-to-fetch',
    'linkedin-preview--invalid-url',
  ],
}
