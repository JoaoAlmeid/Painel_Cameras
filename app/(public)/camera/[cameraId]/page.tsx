'use client'

import { useEffect, useRef, useState } from 'react'
import { useParams } from 'next/navigation'
import { CircularProgress, Alert, Button } from '@mui/material'
import api from '@/utils/api'
import Hls from 'hls.js'
import { isAxiosError } from 'axios'
import styles from '../../../../styles/paginas/camera.module.scss'
import Link from 'next/link'
import { MdReport } from "react-icons/md";
import Head from 'next/head'

interface Camera {
  cameraId: string
  nome: string
  url: string
  ativo: boolean
  localizacao: string
  latitude: number
  longitude: number
}

function gerarSlug(nome: string): string {
  return nome
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export default function CameraPagina() {
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
    <div className={styles.container}>
        <Head>
          <title>`Câmera ${camera.nome}`</title>
        </Head>
        <div className={styles.columInfo}>
            <h2>{camera.nome}</h2>
            <span className={styles.status}>Status: 
                <span className={camera.ativo ? styles.active : styles.inactive}>
                    {camera.ativo ? 'Ativa' : 'Inativa'}
                </span>
            </span>
            <Link href={urlReport}>
                <Button variant='contained' startIcon={<MdReport color='white'/>}>
                    Reportar Erro
                </Button>
            </Link>
        </div>
        <div className={styles.columVideo}>
            <video
                ref={videoRef}
                controls
                autoPlay
                muted
                className={styles.video}
            />
        </div>
    </div>
  )
}
