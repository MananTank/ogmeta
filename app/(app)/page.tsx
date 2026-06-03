import { App } from '@/app/(app)/components/app-client'
import { HomeFooter } from '@/components/footer'
import { DEFAULT_URL } from '@/lib/constants'
import { fetchDocumentMetadata } from '@/lib/og'

export default async function Home() {
  const result = await fetchDocumentMetadata(DEFAULT_URL)
  const defaultURLData = result.type === 'success' ? result.data : null

  return (
    <div>
      <App defaultURLData={defaultURLData} />
      <HomeFooter />
    </div>
  )
}
