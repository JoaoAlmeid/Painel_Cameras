'use client'

import { useEffect, useState } from 'react'
import { CircularProgress, Alert, Button } from '@mui/material'
import api from '@/utils/api'
import { Camera } from '@/types/camera'
import styles from './page.module.scss'
import { isAxiosError } from 'axios'
import dynamic from 'next/dynamic'
import Head from 'next/head'

const MapContainer = dynamic(() => import('../../../ui/camera/camerasMapa'), {
  ssr: false,
  loading: () => <CircularProgress />,
})

export default function MapaCamerasPage() {
  const [cameras, setCameras] = useState<Camera[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCameras = async () => {
      try {
        const res = await api.get('/camera/listar')
        setCameras(res.data.data)
      } catch (err) {
        if (isAxiosError(err)) {
          setError('Erro ao carregar câmeras')
        } else {
          setError('Erro desconhecido')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchCameras()
  }, [])

  if (loading) return <div className={styles.loader}><CircularProgress /></div>
  if (error) return <Alert severity="error">{error}</Alert>

  return (
    <div className={styles.container}>
      <Head>
          <title>Mapa Câmeras | Painel C-Com</title>
      </Head>
      <div className={styles.header}>
        <h2>Mapa das Câmeras</h2>

        <Button variant="contained" href='/painel/cameras'>
          Todas as câmeras
        </Button>
      </div>

      <MapContainer cameras={cameras} />
    </div>
  )
}
