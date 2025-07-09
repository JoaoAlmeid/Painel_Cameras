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
        <div className={styles.container}>
          <div className={styles.columMapa}>
            <h3>Mapa das câmeras</h3>
            <Grid container>
                  <Grid size={12}>
                    <div className={styles.mapContainer}>
                      <MapaCameras cameras={cameras} />
                    </div>
                  </Grid>
            </Grid>
          </div>
          <div className={styles.columCams}>
            <div className={styles.headerCams}>
              <h3>Câmeras C-Com FM</h3>
              <Button variant='text' href='/cameras'>
                Todas as câmeras
              </Button>
            </div>
            <div className={styles.gridCameras}>
              {cameras
                .filter(cam => cam.ativo)
                .slice(0, 4)
                .map((cam) => (
                  <CardCamClient key={cam.cameraId}
                    camera={cam}
                  />
              ))}
            </div>
          </div>
        </div>
        ) : (
          <Alert severity='warning'>Nenhuma câmera encontrada</Alert>
        )}
    </>
  )
}
