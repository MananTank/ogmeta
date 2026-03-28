import { App } from '@/app/(app)/components/app-client'
import { DEFAULT_URL } from '@/lib/constants'
import { fetchOGData } from '@/lib/og'
import { HomeFooter } from '@/components/footer'

export default async function Home() {
  const result = await fetchOGData(DEFAULT_URL)
  const defaultURLData = result.type === 'success' ? result.data : null

  return (
    <div>
      <App defaultURLData={defaultURLData} />
      <HomeFooter />
    </div>
  )
}
