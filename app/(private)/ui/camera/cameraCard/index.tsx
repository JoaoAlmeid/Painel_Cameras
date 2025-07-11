'use client'

import { useEffect, useRef } from 'react'
import { Card, CardContent, Typography, CardActions, IconButton, Tooltip } from '@mui/material'
import Hls from 'hls.js'
import Link from 'next/link'
import styles from './card.module.scss'
import { Camera } from '@/types/camera'
import { MdDelete, MdEdit, MdPowerSettingsNew, MdVisibility } from 'react-icons/md'
import { gerarSlug } from '@/utils/gerarSlug'

interface Props {
  camera: Camera
  onEdit: (cam: Camera) => void
  onDelete: (cam: Camera) => void
  onToggleAtivo: (cam: Camera) => void
}

export default function CameraCard({ camera, onEdit, onDelete, onToggleAtivo }: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    if (camera.url && videoRef.current && Hls.isSupported()) {
      const slug = gerarSlug(camera.nome)
      const hlsUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/stream/${slug}/video.m3u8`

      const hls = new Hls()
      hls.loadSource(hlsUrl)
      hls.attachMedia(videoRef.current)
      return () => hls.destroy()
    }
  }, [camera])

  return (
    <Card className={styles.card}>
      <video
        ref={videoRef}
        muted
        autoPlay
        playsInline
        className={styles.video}
      />

      <CardContent>
        <Typography variant="h6">{camera.nome}</Typography>
        <Typography
          variant="body2"
          className={camera.ativo ? styles.statusAtiva : styles.statusInativa}
        >
          Status: {camera.ativo ? 'Ativa' : 'Inativa'}
        </Typography>
      </CardContent>

      <CardActions>
        <Link href={`/painel/cameras/${camera.cameraId}`} passHref>
          <IconButton><MdVisibility /></IconButton>
        </Link>
        <Tooltip title={camera.ativo ? 'Desativar' : 'Ativar'}>
          <IconButton onClick={() => onToggleAtivo(camera)} color={camera.ativo ? 'success' : 'error'}>
            <MdPowerSettingsNew />
          </IconButton>
        </Tooltip>
        <IconButton onClick={() => onEdit(camera)}><MdEdit /></IconButton>
        <IconButton color="error" onClick={() => onDelete(camera)}><MdDelete /></IconButton>
      </CardActions>
    </Card>
  )
}
