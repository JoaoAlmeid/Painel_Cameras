'use client'

import React, { useEffect, useState } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  CircularProgress,
  Alert
} from '@mui/material'
import api from '@/utils/api'
import { isAxiosError } from 'axios'
import type { CameraFormData, ModalAddCameraProps } from '@/types/camera'

export default function ModalAddCamera({ open, onClose, onSuccess, cameraEdit }: ModalAddCameraProps) {
  const [formData, setFormData] = useState<CameraFormData>({
    nome: '',
    url: '',
    localizacao: '',
    latitude: '',
    longitude: ''
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Preencher os dados se for edit
  useEffect(() => {
    if (cameraEdit) {
      setFormData({
        nome: cameraEdit.nome,
        url: cameraEdit.url,
        localizacao: cameraEdit.localizacao,
        latitude: cameraEdit.latitude.toString(),
        longitude: cameraEdit.longitude.toString()
      })
    } else {
      setFormData({
        nome: '',
        url: '',
        localizacao: '',
        latitude: '',
        longitude: ''
      })
    }
  }, [cameraEdit, open])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

    // Detectar latitude e longitude da URL do Google Maps
    if (name === 'localizacao') {
      const match = value.match(/(-?\d+\.\d+),\s*(-?\d+\.\d+)/)
      if (match) {
        const [, lat, lon] = match
        setFormData(prev => ({
          ...prev,
          latitude: lat,
          longitude: lon
        }))
      }
    }
  }

  const handleSubmit = async () => {
    setError(null)

    if (!formData.nome || !formData.url) {
      setError('Nome e URL são obrigatórios.')
      return
    }

    if (!formData.url.startsWith('rtsp://')) {
      setError('A URL deve começar com "rtsp://".')
      return
    }

    setLoading(true)

    const payload = {
      nome: formData.nome,
      url: formData.url,
      localizacao: formData.localizacao,
      latitude: parseFloat(formData.latitude),
      longitude: parseFloat(formData.longitude)
    }

    try {
      if (cameraEdit) {
        await api.put(`/camera/atualizar/${cameraEdit.cameraId}`, payload)
      } else {
        await api.post('/camera/criar', payload)
      }

      onSuccess()
      onClose()
    } catch (err: unknown) {
      if (isAxiosError(err)) {
        setError(err?.response?.data?.erro || 'Erro ao criar câmera')
      } else {
        setError('Erro desconhecido')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{cameraEdit ? 'Editar Câmera' : 'Adicionar Nova Câmera'}</DialogTitle>
      <DialogContent>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <TextField
          label="Nome"
          name="nome"
          fullWidth
          margin="normal"
          value={formData.nome}
          onChange={handleChange}
          required
        />
        <TextField
          label="URL (RTSP)"
          name="url"
          fullWidth
          margin="normal"
          value={formData.url}
          onChange={handleChange}
          required
          helperText="A URL deve começar com rtsp://"
        />
        <TextField
          label="URL do Google Maps"
          name="localizacao"
          fullWidth
          margin="normal"
          value={formData.localizacao}
          onChange={handleChange}
          required
          helperText="Cole uma URL que contenha a latitude e longitude (ex: maps.google.com/maps?q=-23.55,-46.63)"
        />
        <TextField
          label="Latitude"
          name="latitude"
          fullWidth
          margin="normal"
          value={formData.latitude}
          onChange={handleChange}
          type="number"
          inputProps={{ step: 'any' }}
          required
        />
        <TextField
          label="Longitude"
          name="longitude"
          fullWidth
          margin="normal"
          value={formData.longitude}
          onChange={handleChange}
          type="number"
          inputProps={{ step: 'any' }}
          required
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>Cancelar</Button>
        <Button onClick={handleSubmit} disabled={loading} variant="contained">
          {loading ? <CircularProgress size={24} /> : 'Salvar'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
