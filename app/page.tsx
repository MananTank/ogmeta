import { fetchOGData } from '@/lib/og'
import { HomeClient } from '@/components/home-client'

const DEFAULT_URL = 'https://vercel.com'

export default async function Home() {
  const result = await fetchOGData(DEFAULT_URL)
  const initialData = result.type === 'success' ? result.data : null

  return <HomeClient defaultUrl={DEFAULT_URL} initialData={initialData} />
}
