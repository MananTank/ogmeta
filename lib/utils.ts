import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Truncates to `max` characters, appending `...` when shorter (total length is `max`). */
export function truncateWithEllipsis(text: string, max: number): string {
  if (text.length <= max) return text
  return `${text.slice(0, max - 3)}...`
}
