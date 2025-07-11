'use client'

import { useEffect, useRef, useState } from 'react'
import { useParams } from 'next/navigation'
import { CircularProgress, Alert, Button } from '@mui/material'
import api from '@/utils/api'
import Hls from 'hls.js'
import { isAxiosError } from 'axios'
import styles from '../../../../styles/paginas/camera.module.scss'
import { MdHome, MdReport } from "react-icons/md";
import type { Camera } from '@/types/camera'
import { gerarSlug } from '@/utils/gerarSlug'

export default function CameraPageClient() {
  const { cameraId } = useParams<{ cameraId: string }>()
  const [camera, setCamera] = useState<Camera | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const urlReport = process.env.REPORT_URL || 'https://ccomfm.com.br/contato/'

  useEffect(() => {
    const fetchCamera = async () => {
      try {
        const res = await api.get(`/camera/buscar/id/${cameraId}`)
        setCamera(res.data)
      } catch (err: unknown) {
        if (isAxiosError(err)) {
          setError(err?.response?.data?.erro || 'Erro ao carregar câmera')
        } else {
          setError('Erro Desconhecido')
        }
      } finally {
        setLoading(false)
      }
    }

    if (cameraId) fetchCamera()
  }, [cameraId])

  useEffect(() => {
    if (camera?.url && videoRef.current && Hls.isSupported()) {
      const slug = gerarSlug(camera.nome)
      const hlsUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/stream/${slug}/video.m3u8`

      const hls = new Hls()
      hls.loadSource(hlsUrl)
      hls.attachMedia(videoRef.current)
      hls.on(Hls.Events.ERROR, (event, data) => {
        console.error('HLS error: ', data)
      })
      return () => hls.destroy()
    }
  }, [camera])

  if (loading) return <div className={styles.loader}><CircularProgress /></div>
  if (error) return <Alert severity="error" className={styles.alert}>{error}</Alert>
  if (!camera) return <h5>Câmera não encontrada.</h5>

  return (
    <section className={styles.container}>
        <div className={styles.headerContainer}>
            <h2>{camera.nome}</h2>
            <span className={styles.status}>Status: 
                <span className={camera.ativo ? styles.active : styles.inactive}>
                    {camera.ativo ? 'Ativa' : 'Inativa'}
                </span>
            </span>
        </div>
        <div className={styles.videoContainer}>
            <video
                ref={videoRef}
                controls
                autoPlay
                muted
                className={styles.video}
            />
        </div>
        <div className={styles.footerContainer}>
          <Button href='/' variant='contained' startIcon={<MdHome color='white'/>}>
            Voltar ao Inicio
          </Button>
          <Button href={urlReport} variant='contained' startIcon={<MdReport color='white'/>}>
            Reportar Erro
          </Button>
        </div>
    </section>
  )
}
