'use client'

import { useEffect, useState } from 'react'
import { Grid, CircularProgress, Alert, Button } from '@mui/material'
import api from '@/utils/api'
import type { Camera, ListaCamerasResponse } from '@/types/camera'
import CardCamClient from './(componentes)/ui/card/cameraCard'
import styles from './page.module.scss'
import dynamic from 'next/dynamic'

const MapaCameras = dynamic(() => import('../(private)/ui/camera/camerasMapa'), {
  ssr: false,
  loading: () => <p>Carregando mapa...</p>,
})

export default function HomePage() {
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
    <>
      {loading ? (
        <CircularProgress />
      ) : erro ? (
        <Alert severity="error">{erro}</Alert>
      ) : Array.isArray(cameras) ? (
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} className={styles.container}>
          <Grid size={{ xs: 2, sm: 4, md: 8 }} className={styles.columMapa}>
            <h3>Mapa das câmeras</h3>
            <Grid container>
                  <Grid size={12}>
                    <div className={styles.mapContainer}>
                      <MapaCameras cameras={cameras} />
                    </div>
                  </Grid>
            </Grid>
          </Grid>
          <Grid size={{ xs: 2, sm: 4, md: 4 }} className={styles.columCams}>
            <div className={styles.headerCams}>
              <h3>Câmeras C-Com FM</h3>
              <Button variant='text' href='/cameras'>
                Todas as câmeras
              </Button>
            </div>
            <Grid container spacing={2}>
              {cameras
                .filter(cam => cam.ativo)
                .slice(0, 4)
                .map((cam) => (
                  <Grid size={6} key={cam.cameraId}>
                    <CardCamClient
                      camera={cam}
                    />
                  </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
        ) : (
          <Alert severity='warning'>Nenhuma câmera encontrada</Alert>
        )}
    </>
  )
}
