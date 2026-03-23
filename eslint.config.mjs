import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'

const __dirname = dirname(fileURLToPath(import.meta.url))

/** @type {import('eslint').Linter.Config[]} */
const eslintConfig = [
  {
    ignores: ['.ladle/**'],
  },
  ...nextCoreWebVitals,
  {
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: __dirname,
      },
    },
  },
]

export default eslintConfig
