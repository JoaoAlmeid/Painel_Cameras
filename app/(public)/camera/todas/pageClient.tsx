'use client'

import { useEffect, useState } from 'react'
import {
  Typography,
  CircularProgress,
} from '@mui/material'
import api from '@/utils/api'
import styles from '../../../(private)/painel/cameras/page.module.scss'

import type { Camera, ListaCamerasResponse } from '@/types/camera'
import { isAxiosError } from 'axios'
import CardCamClient from '../../(componentes)/ui/card/cameraCard'

export default function TodasCamerasClient() {
  const [cameras, setCameras] = useState<Camera[]>([])
  const [loading, setLoading] = useState(true)
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


  if (loading) return <CircularProgress />
  if (error) return (
    <Typography color="error">
        {error}
    </Typography>
  )

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Lista de Câmeras</h2>
      </div>

      <div className={styles.gridCameras}>
        {cameras
            .filter(cam => cam.ativo)
            .map((cam) => (
                <CardCamClient
                key={cam.cameraId}
                camera={cam}
                />
        ))}
      </div>
    </div>
  )
}
