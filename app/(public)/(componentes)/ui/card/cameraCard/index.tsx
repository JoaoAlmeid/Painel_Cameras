'use client'

import { useEffect, useRef } from 'react'
import { Card, CardContent, IconButton } from '@mui/material'
import Hls from 'hls.js'
import Link from 'next/link'
import styles from './card.module.scss'
import type { Camera } from '@/types/camera'
import { MdVisibility } from 'react-icons/md'
import { gerarSlug } from '@/utils/gerarSlug'

export default function CardCamClient({ camera } : {camera : Camera}) {
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

      <CardContent className={styles.cardInfo}>
        <div>
          <h6>{camera.nome}</h6>
          <span className={camera.ativo 
            ? styles.statusAtiva 
            : styles.statusInativa
          }>
            Status: {camera.ativo ? 'Ativa' : 'Inativa'}
          </span>
        </div>
        <div>
          <Link href={`/camera/${camera.cameraId}`} passHref>
            <IconButton><MdVisibility /></IconButton>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
