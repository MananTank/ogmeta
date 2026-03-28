export const URL_SEARCH_PARAM = 'url'

function isLocalOrLoopbackHostname(hostname: string): boolean {
  const h = hostname.toLowerCase()
  return (
    h === 'localhost' ||
    h.endsWith('.localhost') ||
    h === '127.0.0.1' ||
    h === '::1' ||
    h === '[::1]'
  )
}

export function isValidUrl(urlString: string): boolean {
  const trimmed = urlString.trim()
  if (!trimmed) return false
  try {
    let testUrl = trimmed
    if (!testUrl.startsWith('http://') && !testUrl.startsWith('https://')) {
      testUrl = 'https://' + testUrl
    }
    const u = new URL(testUrl)
    if (u.protocol !== 'http:' && u.protocol !== 'https:') return false
    if (!u.hostname) return false
    return u.hostname.includes('.') || isLocalOrLoopbackHostname(u.hostname)
  } catch {
    return false
  }
}

export function normalizeUrlForFetch(url: string): string {
  let finalUrl = url.trim()
  if (!finalUrl.startsWith('http://') && !finalUrl.startsWith('https://')) {
    finalUrl = 'https://' + finalUrl
  }
  return finalUrl
}

export function normalizeUrl(url: string) {
  return url
    .trim()
    .replace(/^https?:\/\//, '')
    .replace(/\/$/, '')
}
