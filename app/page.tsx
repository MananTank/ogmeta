import { HomeClient } from '@/components/home-client'
import { DEFAULT_URL } from '@/lib/constants'
import { fetchOGData } from '@/lib/og'

export default async function Home() {
  const result = await fetchOGData(DEFAULT_URL)
  const defaultURLData = result.type === 'success' ? result.data : null

  return <HomeClient defaultURLData={defaultURLData} />
}
