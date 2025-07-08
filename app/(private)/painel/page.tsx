'use client'

import { useEffect, useState } from 'react'
import styles from './page.module.scss'
import {
  CircularProgress,
  Alert,
  Button,
  Card,
  CardContent,
} from '@mui/material'
import Grid from '@mui/material/Grid';
import api from '@/utils/api'
import type { Camera, ListaCamerasResponse } from '@/types/camera'
import dynamic from 'next/dynamic'
import CameraLista from '../ui/camera/cameraLista'
import { LuCamera, LuCameraOff, LuGalleryHorizontalEnd } from "react-icons/lu";

const MapaCameras = dynamic(() => import('../ui/camera/camerasMapa'), {
  ssr: false,
  loading: () => <p>Carregando mapa...</p>,
})

export default function PainelPage() {
  const [cameras, setCameras] = useState<Camera[]>([])
  const [loading, setLoading] = useState(true)
  const [erro, setErro] = useState<string | null>(null)

  const carregarCameras = async () => {
    try {
      const res = await api.get<ListaCamerasResponse>('/camera/listar')
      setCameras(res.data.data)
    } catch (error) {
      setErro('Erro ao carregar câmeras')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    carregarCameras()
  }, [])

  return (
    <div className={styles.container}>
      <h2>Painel de Monitoramento</h2>

      {loading ? (
        <CircularProgress />
      ) : erro ? (
        <Alert severity="error">{erro}</Alert>
      ) : (
        <div>
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} className={styles.resumo}>
            <Grid size={{ xs: 12, sm: 4, md: 4 }}>
              <Card sx={{ backgroundColor: '#e3f2fd' }}>
                <CardContent>
                  <LuGalleryHorizontalEnd color="primary" fontSize="large" />
                  <h4>Total de Câmeras</h4>
                  <p><strong>{cameras.length}</strong></p>
                </CardContent>
              </Card>
            </Grid>

            <Grid size={{ xs: 12, sm: 4, md: 4 }}>
              <Card sx={{ backgroundColor: '#e8f5e9' }}>
                <CardContent>
                  <LuCamera color="success" fontSize="large" />
                  <h4>Ativas</h4>
                  <p><strong>{cameras.filter(cam => cam.ativo).length}</strong></p>
                </CardContent>
              </Card>
            </Grid>

            <Grid size={{ xs: 12, sm: 4, md: 4 }}>
              <Card sx={{ backgroundColor: '#ffebee' }}>
                <CardContent>
                  <LuCameraOff color="error" fontSize="large" />
                  <h4>Inativas</h4>
                  <p><strong>{cameras.filter(cam => !cam.ativo).length}</strong></p>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {/* MAPA */}
            <Grid size={{ xs: 2, sm: 4, md: 8 }}>
              <div>
                <h6>Mapa das Câmeras</h6>
                <div className={styles.mapContainer}>
                  <MapaCameras cameras={cameras} />
                </div>
              </div>
            </Grid>

            {/* LISTA */}
            <Grid size={{ xs: 2, sm: 4, md: 4 }}>
              <h6>Lista de Câmeras</h6>
              <div className={styles.lista}>
                {Array.isArray(cameras) &&
                  cameras.map((cam) => <CameraLista key={cam.cameraId} camera={cam} />)}
                <Button variant='outlined' href='/painel/cameras'>Ver Todas Cameras</Button>
              </div>
            </Grid>
          </Grid>
        </div>
      )}
    </div>
  )
}
