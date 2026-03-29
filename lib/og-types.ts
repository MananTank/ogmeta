export interface DocumentMetadata {
  url: string
  favicon: string | null
  doc: {
    title: string
    description: string
  }
  openGraph: {
    title: string
    description: string
    image: string
    isValidImage: boolean
    siteName?: string
    type?: string
  }
  twitter: {
    title: string
    description: string
    image: string
    isValidImage: boolean
    card?: string
    site?: string
  }
}
