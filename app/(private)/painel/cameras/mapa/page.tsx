'use client'

import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import { Typography, CircularProgress, Alert, Button } from '@mui/material'
import api from '@/utils/api'
import { Camera } from '@/types/camera'
import styles from './page.module.scss'
import { isAxiosError } from 'axios'

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

  const center = cameras.length
    ? [cameras[0].latitude, cameras[0].longitude]
    : [-15.7797, -47.9297] // fallback: centro do Brasil

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Mapa das Câmeras</h2>

        <Button variant="contained" href='/painel/cameras'>
          Todas as câmeras
        </Button>
      </div>

      <MapContainer
        center={center as [number, number]}
        zoom={13}
        scrollWheelZoom
        className={styles.map}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap contributors'
        />

        {cameras.map((cam) => (
          <Marker
            key={cam.cameraId}
            position={[cam.latitude, cam.longitude]}
            icon={L.icon({
              iconUrl: cam.ativo
                ? '/icones/localizacao-ativa.png'
                : '/icones/localizacao-inativa.png',
              iconSize: [30, 30],
              iconAnchor: [12, 41],
              popupAnchor: [1, -34],
            })}
          >
            <Popup>
              <Typography variant="subtitle1">{cam.nome}</Typography>
              <Typography variant="body2">
                Status: {cam.ativo ? 'Ativa' : 'Inativa'}
              </Typography>
              <a href={`/painel/cameras/${cam.cameraId}`}>Ver detalhes</a>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}
