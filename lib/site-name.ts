/**
 * Capitalized first label of hostname (e.g. `example.com` → `Example`).
 * Matches Slack-style unfurl labels when no explicit site name is set.
 */
export function siteNameLabelFromUrl(pageUrl: string): string {
  try {
    const hostname = new URL(pageUrl).hostname.replace(/^www\./, '')
    const name = hostname.split('.')[0]
    if (!name) return ''
    return name.charAt(0).toUpperCase() + name.slice(1)
  } catch {
    return ''
  }
}
