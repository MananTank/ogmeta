'use client'

import { SOURCE_REPO_URL } from '@/lib/constants'

export function HomeFooter() {
  return (
    <footer className="text-muted-foreground mx-auto mt-28 max-w-2xl px-4 py-10 text-center text-base">
      <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
        <span>
          Made by{' '}
          <a
            href="https://x.com/MananTank_"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground underline-offset-2 transition-colors hover:underline"
          >
            Manan Tank
          </a>
        </span>
        <span aria-hidden className="text-muted-foreground/40">
          ·
        </span>
        <a
          href={SOURCE_REPO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-foreground underline-offset-2 transition-colors hover:underline"
        >
          GitHub
        </a>
      </p>
    </footer>
  )
}
