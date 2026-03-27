/** @type {import('@ladle/react').UserConfig} */
export default {
  stories: 'stories/**/*.stories.{js,jsx,ts,tsx}',
  viteConfig: '.ladle/vite.config.ts',
  addons: {
    theme: {
      enabled: true,
      defaultState: 'dark',
    },
  },
}
