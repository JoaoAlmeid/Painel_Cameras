'use client'

import { useEffect, useState } from 'react'
import {
  Typography,
  Grid,
  CircularProgress,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material'
import api from '@/utils/api'
import styles from './page.module.scss'
import ModalAddCamera from '@/app/(private)/ui/painel/Modals/CameraModal'
import type { Camera, ListaCamerasResponse } from '@/types/camera'
import { isAxiosError } from 'axios'
import CameraCard from '@/app/(private)/ui/camera/cameraCard'

export default function CamerasPageClient() {
  const [cameras, setCameras] = useState<Camera[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editCamera, setEditCamera] = useState<Camera | null>(null)
  const [deleteDialog, setDeleteDialog] = useState<Camera | null>(null)
  const [error, setError] = useState<string | null>(null)

  const carregarCameras = async () => {
    try {
      const res = await api.get<ListaCamerasResponse>('/camera/listar')
      setCameras(res.data.data)
    } catch (err) {
      if (isAxiosError(err)) {
        setError('Erro ao carregar câmeras')
      } else (
        setError('Erro desconhecido')
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    carregarCameras()
  }, [])

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/camera/deletar/${id}`)
      setDeleteDialog(null)
      carregarCameras()
    } catch (err) {
      if (isAxiosError(err)) {
        const msg = err.response?.data?.erro || 'Erro desconhecido';
        console.error(msg);
      } else {
        alert('Erro inesperado ao deletar câmera')
      }
    }
  }

  const alternarStatusCamera = async (camera: Camera) => {
    try {
      await api.patch(`/camera/status/${camera.cameraId}`, { ativo: !camera.ativo })
      carregarCameras()
    } catch {
      alert('Erro ao atualizar status da câmera.')
    }
  }

  if (loading) return <CircularProgress />
  if (error) return <Typography color="error">{error}</Typography>

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>
          Lista de Câmeras
        </h2>

        <Button variant="contained" onClick={() => setModalOpen(true)}>
          Adicionar Câmera
        </Button>
      </div>

      <ModalAddCamera
        open={modalOpen || !!editCamera}
        onClose={() => {
          setModalOpen(false)
          setEditCamera(null)
        }}
        onSuccess={carregarCameras}
        cameraEdit={editCamera}
      />

      <Grid container spacing={2}>
        {cameras.map((cam) => (
          <Grid  key={cam.cameraId} size={4}>
            <CameraCard
              camera={cam}
              onEdit={setEditCamera}
              onDelete={setDeleteDialog}
              onToggleAtivo={alternarStatusCamera}
            />
          </Grid>
        ))}
      </Grid>

      {/* Diálogo de confirmação de exclusão */}
      <Dialog open={!!deleteDialog} onClose={() => setDeleteDialog(null)}>
        <DialogTitle>Confirmar exclusão</DialogTitle>
        <DialogContent>
          Tem certeza que deseja excluir a câmera &quot;{deleteDialog?.nome}&quot;?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog(null)}>Cancelar</Button>
          <Button color="error" onClick={() => handleDelete(deleteDialog!.cameraId)}>Excluir</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
