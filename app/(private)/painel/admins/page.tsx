import type { Metadata } from 'next'
import AdminsPageClient from './pageClient'

export const metadata: Metadata = {
  title: "Administradores | C-COM FM"
}

export default function AdminsPage() {
  return (
    <AdminsPageClient />
  )
}
