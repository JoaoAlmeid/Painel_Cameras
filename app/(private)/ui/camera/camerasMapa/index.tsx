'use client'

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import { Button } from '@mui/material'
import styles from './mapa.module.scss'
import type { Camera } from '@/types/camera'
import { FaEye } from 'react-icons/fa'

type MapaCamerasProps = {
  cameras: Camera[]
}

export default function MapaCameras({ cameras }: MapaCamerasProps) {
  const camerasAtivas = cameras.filter(cam => cam.ativo)

  const center = camerasAtivas.length
    ? [camerasAtivas[0].latitude, camerasAtivas[0].longitude]
    : [-15.7797, -47.9297] // fallback: centro do Brasil

  return (
    <div>
      <MapContainer
        center={center as [number, number]}
        zoom={13}
        scrollWheelZoom
        className={styles.map}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; C-Com FM - Mapa de Câmeras'
        />

        {camerasAtivas.map((cam) => (
          <Marker
            key={cam.cameraId}
            position={[cam.latitude, cam.longitude]}
            icon={L.icon({
              iconUrl: '/icones/localizacao-ativa.png',
              iconSize: [30, 30],
              iconAnchor: [12, 41],
              popupAnchor: [1, -34],
            })}
          >
            <Popup className={styles.popup}>
              <h4>{cam.nome}</h4>
              <Button 
                variant='text'
                href={`/painel/cameras/${cam.cameraId}`}
                startIcon={<FaEye />}
              >
                Ver Câmera
              </Button>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}
