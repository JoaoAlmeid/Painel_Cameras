import type { Metadata } from 'next'
import CamerasPageClient from './pageClient'

export const metadata: Metadata = {
  title: "Câmeras | C-COM FM"
}

export default function CamerasPage() {
  return (
    <CamerasPageClient />
  )
}
