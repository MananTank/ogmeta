import { App } from '@/app/(app)/components/app-client'
import { DEFAULT_URL } from '@/lib/constants'
import { fetchDocumentMetadata } from '@/lib/og'
import { HomeFooter } from '@/components/footer'

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
