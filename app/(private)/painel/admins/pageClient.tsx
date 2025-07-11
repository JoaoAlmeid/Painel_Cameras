'use client'

import { useEffect, useState } from 'react'
import {
  Grid,
  CircularProgress,
  Alert,
  Button,
} from '@mui/material'
import api from '@/utils/api'
import AdminCard from '@/app/(private)/ui/Admins/adminCard'
import styles from './page.module.scss'
import { isAxiosError } from 'axios'
import type { Admin, AdminListResponse } from '@/types/admins'
import ModalAdmin from '@/app/(private)/ui/Admins/modalAdmin'

export default function AdminsPageClient() {
  const [admins, setAdmins] = useState<Admin[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [adminEdit, setAdminedit] = useState<Admin | null>(null)
  const [criadoPorId, setCriadoPorId] = useState<string>('')

  const carregarAdmins = async () => {
    try {
      const res = await api.get<AdminListResponse>('/admin/listar')
      setAdmins(res.data.data)
    } catch (err) {
      setError(isAxiosError(err) ? 'Erro ao carregar administradores' : 'Erro desconhecido')
    } finally {
      setLoading(false)
    }
  }

  const carregarAdminLogado = async () => {
    try {
      const res = await api.get<{ admin: Admin }>('/admin/me', {
        withCredentials: true
      })
      setCriadoPorId(res.data.admin.adminId)
    } catch (error) {
      console.error('Erro ao buscar admin logado', error)
    }
  }

  useEffect(() => {
    carregarAdminLogado()
    carregarAdmins()
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Administradores</h2>

        <Button
          variant='contained'
          onClick={() => {
            setAdminedit(null)
            setTimeout(() => setModalOpen(true), 0)
          }}
        >
          Adicionar Admin
        </Button>
      </div>

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <Grid container spacing={2}>
          {admins
            .filter(admin => admin.nivel?.trim().toUpperCase() === 'SIMPLES')
            .map((admin) => (
              <Grid size={4} key={admin.adminId}>
                <AdminCard
                  admin={admin}
                  onRefresh={carregarAdmins}
                  onEdit={(a) => {
                    setAdminedit(a)
                    setModalOpen(true)
                  }}
                  superId={criadoPorId}
                />
              </Grid>
          ))}
        </Grid>
      )}

      <ModalAdmin
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={carregarAdmins}
        adminEdit={adminEdit}
        criadoPorId={criadoPorId}
      />
    </div>
  )
}
