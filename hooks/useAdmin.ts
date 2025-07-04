'use client'

import { useEffect, useState } from 'react'
import api from '@/utils/api'
import { Admin } from '@/types/admins'

export function useAdmin() {
  const [admin, setAdmin] = useState<Admin | null>(null)
  const [loading, setLoading] = useState(true)
  const [erro, setErro] = useState<string | null>(null)

  useEffect(() => {
    const buscarAdmin = async () => {
      try {
        const res = await api.get('/admin/me')
        setAdmin(res.data.admin)
      } catch (err) {
        setErro('Não autenticado')
        setAdmin(null)
      } finally {
        setLoading(false)
      }
    }

    buscarAdmin()
  }, [])

  return { admin, loading, erro }
}
